import { GenericListData, GenericListItem } from 'ui/components/lists';

const content: GenericListItem[] = [
  {
    title: 'Migration Advisor',
    description: 'Tell the Sitecore Migration Advisor about your solution and then find videos, tutorials, walkthroughs, code examples, and more to help you migrate from Sitecore Platform DXP to Sitecore XM Cloud and the rest of the Sitecore Composable DXP.',
    href: 'https://migration.sitecore.com/',
    linkText: 'Get Started',
    img: {
      src: 'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/knowledge-center/digital-marketing-resources/migrating-to-xm-cloud/gettyimages-898545250.jpg?mw=310&md=20230901T160358Z&hash=CA7AE4A53096E607A51CA4C172B0E5D8&t=300x310',
      alt: 'Migration Advisor',
    },
  },
  {
    title: 'Sitecore Changelog',
    description: 'Learn more about new versions, changes and improvements in the public preview of the Sitecore Changelog',
    href: '/changelog',
    linkText: 'View',
    img: {
      src: '/images/changelog-home.png',
      alt: 'Sitecore Changelog',
    },
  },
  {
    title: 'Sitecore Search',
    description: 'Use our search functionality to search across all the official Sitecore resources, now powered by Sitecore Search',
    href: '/search',
    linkText: 'Search',
    img: {
      src: '/images/search-page.png',
      alt: 'Sitecore Search',
    },
  },
  {
    title: 'XM Cloud Recommended Practices',
    description: 'Are you getting started with building on XM Cloud? Check out the new recommended tips for teams working on XM Cloud projects!',
    href: '/learn/faq/xm-cloud-recommended-practices',
    linkText: 'Read',
    img: {
      src: 'https://sitecorecontenthub.stylelabs.cloud/api/public/content/c612f3d1efbe4e0cb946ab96d0b4aea1?v=0cca3868',
      alt: 'XM Cloud Recommended practices',
    },
  },
];

const communityListData: GenericListData = {
  title: 'Latest resources',
  subtitle: '',
  data: content,
};

export default communityListData;
