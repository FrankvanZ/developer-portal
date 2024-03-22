import { GetAllChangeTypes } from './lib/changeType';
import { GetAllProducts, GetEntryCountByProductId } from './lib/products';
import { PaginatedSearch, Search } from './lib/search';
import { ChangeType, ParseChangeType, ParseProduct, Product } from './types';
import { ChangelogEntry, ChangelogEntryList, ChangelogEntrySummary, ParseRawData, ParseRawSummaryData, parseChangeLogItem } from './types/changeLogEntry';

export type ChangelogClientAuthentication = {
  endpoint: string;
  token: string;
  isPreview: boolean;
};

export class ChangelogClient {
  private isPreview: boolean;
  private endpoint: string;
  private token: string;

  constructor(changelogClientAuthentication: ChangelogClientAuthentication) {
    this.isPreview = changelogClientAuthentication.isPreview;
    this.endpoint = changelogClientAuthentication.endpoint;
    this.token = changelogClientAuthentication.token;

    if (!this.endpoint) {
      throw new Error('Endpoint is required');
    }
    if (!this.token) {
      throw new Error('Token is required');
    }
    if (this.isPreview === undefined) {
      throw new Error('isPreview is required');
    }
  }

  async allChangelogEntries(): Promise<ChangelogEntryList<ChangelogEntry[]>> {
    const response = await Search(this.endpoint, this.token, this.isPreview);
    return ParseRawData(response.data);
  }

  async changelogEntriesByProduct(productId: string): Promise<ChangelogEntryList<ChangelogEntry[]>> {
    const response = await Search(this.endpoint, this.token, this.isPreview, productId);
    return ParseRawData(response.data);
  }

  async changelogEntriesPaginated(pageSize: string, productId: string, changeTypeId: string, endCursor?: string): Promise<ChangelogEntryList<ChangelogEntry[]>> {
    const _pageSize: number = Number(pageSize) ?? undefined;
    const _endCursor: string = endCursor ?? '';

    const response = await PaginatedSearch(this.endpoint, this.token, this.isPreview, _pageSize, _endCursor, productId, changeTypeId);
    return ParseRawData(response.data);
  }

  async changelogEntryByTitle(entryTitle: string, productId?: string, changeTypeId?: string): Promise<ChangelogEntry> {
    const response = await Search(this.endpoint, this.token, this.isPreview, productId, changeTypeId, false, entryTitle, 1);

    return parseChangeLogItem(response.data.results[0]);
  }

  async getSummaryLatestItemsByProductAndChangeType(productId?: string, changeTypeId?: string): Promise<ChangelogEntryList<ChangelogEntrySummary[]>> {
    const response = await Search(this.endpoint, this.token, this.isPreview, productId, changeTypeId, true, undefined, 50);
    return ParseRawSummaryData(response.data);
  }

  async getChangeTypes(): Promise<ChangeType[]> {
    const response = await GetAllChangeTypes(this.endpoint, this.token, this.isPreview);
    return ParseChangeType(response.data);
  }

  async getProducts(): Promise<Product[]> {
    // Get all products
    const response = await GetAllProducts(this.endpoint, this.token, this.isPreview);
    const products = ParseProduct(response.data);

    // Iterate products
    const asyncFunc = async () => {
      const p = products.map((n) => calc(n));
      const results = await Promise.all(p);
      return results;
    };

    // Check whether there are entries that have it selected
    const calc = async (n: Product) => {
      // No need to check in preview mode
      if (this.isPreview) {
        n.hasEntries = true;
        return n;
      }

      const count = await GetEntryCountByProductId(this.endpoint, this.token, n.id, this.isPreview);
      n.hasEntries = count > 0;
      return n;
    };

    return asyncFunc();
  }
}
