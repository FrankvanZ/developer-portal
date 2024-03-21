import { ALL_SITECORE_PRODUCT_QUERY } from '../graphQl/sitecore-product-query';
import { fetchAPI } from './common/api';

export async function GetAllProducts(endpoint: string, token: string, preview: boolean) {
  const response = await fetchAPI(endpoint, token, ALL_SITECORE_PRODUCT_QUERY, preview);
  return response.data;
}

export async function GetEntryCountByProductId(endpoint: string, token: string, productId: string, preview: boolean) {
  const response = await fetchAPI(
    endpoint,
    token,
    `{
      data: allChangelog(where: { sitecoreProduct: { changelog_ids: "${productId}" } }) 
      {
        total
      }
    }
  `,
    preview
  );
  return response.data.data.total;
}
