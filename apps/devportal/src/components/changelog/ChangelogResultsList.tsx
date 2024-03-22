import { Box } from '@chakra-ui/react';
import { ChangelogEntry } from 'sc-changelog/src/types/changeLogEntry';
import ChangeLogItem from './ChangeLogItem';

type ChangelogResultsListProps = {
  entries?: ChangelogEntry[];
  isLoading: boolean;
  hasNext?: boolean;
  onEndTriggered: () => void;
};

const ChangelogResultsList = ({ entries, isLoading, hasNext, onEndTriggered }: ChangelogResultsListProps): JSX.Element => {
  return <Box>{entries && entries.map((item, i) => <ChangeLogItem item={item} key={i} loading={isLoading} isLast={i === entries.length - 1} isMore={hasNext} loadEntries={() => onEndTriggered()} />)}</Box>;
};
export default ChangelogResultsList;
