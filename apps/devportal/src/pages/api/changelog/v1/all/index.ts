// Interfaces
import { getEndpointAndToken } from '@/src/lib/changelog/changelog';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ChangelogClient } from 'sc-changelog/src/changelogClient';
import { ChangeType, Product } from 'sc-changelog/src/types';
import { ChangelogEntrySummary } from 'sc-changelog/src/types/changeLogEntry';
import { getQueryArray } from 'sc-changelog/src/utils/requests';

const handler = async (req: NextApiRequest, res: NextApiResponse<Record<string, ChangelogEntrySummary[]>>) => {
  const products: string[] = getQueryArray(req.query.product);
  const changeTypes: string[] = getQueryArray(req.query.changeType);
  const isPreview = req.preview ? true : false;

  const sorted = await getOverviewPerMonth(isPreview, products, changeTypes);
  res.status(200).json(sorted);
};

export default handler;

const getOverviewPerMonth: any = async (isPreview: boolean, products?: Product[], changes?: ChangeType[]) => {
  const client = new ChangelogClient(getEndpointAndToken(isPreview));

  const items = await client.getSummaryLatestItemsByProductAndChangeType(products?.join('|'), changes?.join('|'));
  const entries: ChangelogEntrySummary[] = items.entries;

  // Group the entries by month
  const groupedObjects = entries.reduce((collection, obj) => {
    const monthYear = new Date(obj.releaseDate).toLocaleString('en-US', { month: 'short', year: 'numeric' });
    if (!collection[monthYear]) {
      collection[monthYear] = [];
    }
    collection[monthYear].push(obj);

    // Sort updates within a month (latest first)
    collection[monthYear].sort((a, b) => {
      const earliestDateA = new Date(a.releaseDate);
      const earliestDateB = new Date(b.releaseDate);
      return earliestDateB.getTime() - earliestDateA.getTime();
    });
    return collection;
  }, {} as Record<string, ChangelogEntrySummary[]>);

  // Sort the keys (year-month)
  const sorted = Object.entries(groupedObjects)
    .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
    .reduce((acc, [date, value]) => ({ ...acc, [date]: value }), {});

  return sorted;
};
