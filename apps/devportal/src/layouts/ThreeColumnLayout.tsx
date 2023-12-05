import { Box, Flex } from '@chakra-ui/react';
import { CenteredContent } from 'ui/components/helpers';
import { Sidebar } from './Sidebar';

type ThreeColumnLayoutProps = {
  sidebar: React.ReactNode;
  inPageNav: React.ReactNode;
  children: React.ReactNode;
};

export const ThreeColumnLayout = ({ sidebar, inPageNav, children }: ThreeColumnLayoutProps) => {
  return (
    <Flex flexGrow={0} justify={'space-between'} width={'full'} gap={0} direction={{ base: 'column', md: 'row' }}>
      <Sidebar showBackground>{sidebar}</Sidebar>

      <Box maxW={'7xl'} as="main" paddingX={{ base: 4, md: 'inherit' }}>
        <CenteredContent>{children}</CenteredContent>
      </Box>

      <Sidebar>{inPageNav}</Sidebar>
    </Flex>
  );
};
