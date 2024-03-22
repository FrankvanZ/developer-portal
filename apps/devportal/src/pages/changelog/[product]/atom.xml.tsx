import { getEndpointAndToken } from '@/src/lib/changelog/changelog';
import { CreateFeed } from '@lib/changelog/changelog-feeds';
import { ChangelogClient } from 'sc-changelog/src/changelogClient';
import { Product } from 'sc-changelog/src/types/product';
import { slugify } from 'sc-changelog/src/utils/stringUtils';

// Default export to prevent next.js errors
const FeedPage = () => null;

export async function getServerSideProps(context: any) {
  const product = context.params.product;
  const preview = context.preview ? context.preview : null;
  const client = new ChangelogClient(getEndpointAndToken(preview));

  const products = await client.getProducts().then((response: Product[]) => {
    return response;
  });

  const currentProduct: Product | undefined = products.find((p) => slugify(p.name) == product);

  if (currentProduct != null) {
    // Fetch data
    const changelogEntryList = await client.changelogEntriesByProduct(currentProduct?.id);
    const feed = await CreateFeed(changelogEntryList);
    //Set page headers
    context.res.setHeader('Content-Type', 'text/xml');
    // cache for 600s
    context.res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
    context.res.write(feed.atom1());
  } else {
    context.res.write('Not found');
  }
  context.res.end();

  return { props: {} };
}
export default FeedPage;
