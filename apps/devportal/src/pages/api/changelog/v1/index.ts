import { getEndpointAndToken } from '@/src/lib/changelog/changelog';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ChangelogClient } from 'sc-changelog/src/changelogClient';
import { ChangelogEntry, ChangelogEntryList } from 'sc-changelog/src/types/changeLogEntry';
import { getQueryArray, getQueryValue } from 'sc-changelog/src/utils/requests';

const handler = async (req: NextApiRequest, res: NextApiResponse<ChangelogEntryList<ChangelogEntry[]>>) => {
  const products: string[] = getQueryArray(req.query.product);
  const changeTypes: string[] = getQueryArray(req.query.changeType);
  const isPreview = req.preview ? true : false;
  const client = new ChangelogClient(getEndpointAndToken(isPreview));

  const limit: string = getQueryValue(req.query.limit);
  const end = getQueryValue(req.query.end);

  await client.changelogEntriesPaginated(limit, products.join('|'), changeTypes.join('|'), end).then((response) => {
    res.status(200).json(response);
  });
};

export default handler;
