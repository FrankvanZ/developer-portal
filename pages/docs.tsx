// Scipts
import { getPageInfo, getPartialsAsArray } from '@/scripts/page-info';
// Interfaces
import { PageInfo, PagePartial } from '@/interfaces/page-info';
// Components
import GenericContentPage from '@/components/layout/GenericContentPage';

export async function getStaticProps() {
  const pageInfo = await getPageInfo('docs');
  const partials = await getPartialsAsArray([
    'docs/cms',
    'docs/dam',
    'docs/customerdatamanagement',
    'docs/personalization',
    'docs/marketingautomation',
    'docs/commerce',
  ]);

  return {
    props: {
      pageInfo,
      partials,
    },
  };
}

export default function Docs({
  pageInfo,
  partials,
}: {
  pageInfo: PageInfo;
  partials: PagePartial[];
}) {
  return <GenericContentPage pageInfo={pageInfo} partials={partials} />;
}
