import { ALL_CHANGE_TYPE_QUERY } from '../graphQl/change-type-query';
import { fetchAPI } from './common/api';

/**
 * Retrieves all change types from the specified endpoint.
 * @param {string} endpoint - The endpoint to fetch the change types from.
 * @param {string} token - The authentication token to use for the API request.
 * @param {boolean} preview - Indicates whether to use the preview mode.
 * @returns {Promise<any>} - A promise that resolves to the retrieved change types.
 */
export async function GetAllChangeTypes(endpoint: string, token: string, preview: boolean) {
  const response = await fetchAPI(endpoint, token, ALL_CHANGE_TYPE_QUERY, preview);
  return response.data;
}
