// Interfaces
import { getEndpointAndToken } from '@/src/lib/changelog/changelog';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ChangelogClient } from 'sc-changelog/changelogClient';
import { Product } from 'sc-changelog/types';
import { getQueryValue } from 'sc-changelog/utils/requests';

const handler = async (req: NextApiRequest, res: NextApiResponse<Product[]>) => {
  const showAll: boolean = getQueryValue(req.query.all) == 'false' ? false : true;
  const isPreview = req.preview ? true : false;
  const client = new ChangelogClient(getEndpointAndToken(isPreview));

  res.setHeader('Cache-Control', 'stale-while-revalidate');

  await client.getProducts().then((response: Product[]) => {
    if (showAll) {
      res.status(200).json(response);
    } else {
      res.status(200).json(response.filter((e) => e.hasEntries));
    }
  });
};

export default handler;
