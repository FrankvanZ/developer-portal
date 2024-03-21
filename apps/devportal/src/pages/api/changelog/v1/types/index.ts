// Interfaces
import { getEndpointAndToken } from '@/src/lib/changelog/changelog';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ChangelogClient } from 'sc-changelog/changelogClient';
import { ChangeType } from 'sc-changelog/types/changeType';

const handler = async (req: NextApiRequest, res: NextApiResponse<ChangeType[]>) => {
  const isPreview = req.preview ? true : false;
  const client = new ChangelogClient(getEndpointAndToken(isPreview));

  await client.getChangeTypes().then((response: ChangeType[]) => {
    res.setHeader('Cache-Control', 'stale-while-revalidate');
    res.status(200).json(response);
  });
};

export default handler;
