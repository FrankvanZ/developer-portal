import { Heading, Text, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import { VerticalGroup } from 'ui/components/helpers';
import { CenteredContent } from 'ui/components/helpers/CenteredContent';
import { GetProductLogo } from 'ui/lib/assets';

export type HeroProps = {
  title: string;
  description?: string;
  image?: string;
  productLogo?: string;
  children?: React.ReactNode | React.ReactNode[];
};

const Hero = ({ description, title, children, productLogo }: HeroProps): JSX.Element => {
  return (
    <VerticalGroup
      maxWidth={'full'}
      backgroundImage={`${useColorModeValue('/images/heros/hero-wide-light.webp', '/images/heros/hero-wide-dark.webp')}`}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
      borderBottom={'1px'}
      borderColor={'chakra-border-color'}
    >
      <CenteredContent gap={2} py={{ base: 6, md: 12, xl: 24 }} direction={{ base: 'column-reverse', md: 'column' }}>
        {productLogo && <Image src={useColorModeValue(GetProductLogo(productLogo, 'Light'), GetProductLogo(productLogo, 'Dark'))} alt={`${title} logo`} width={'280'} height={'60'} />}
        {!productLogo && (
          <Heading as="h1" fontSize={{ base: '2xl', md: '4xl', xl: '6xl' }}>
            {title}
          </Heading>
        )}
        <Text as="h2" variant="subtle" fontSize={{ base: 'sm', md: 'md' }}>
          {description}
        </Text>
        {children}
      </CenteredContent>
    </VerticalGroup>
  );
};
export default Hero;
