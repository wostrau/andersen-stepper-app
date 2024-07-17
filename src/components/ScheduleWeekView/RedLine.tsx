import { Box } from '@mui/material';
import { styles } from './ScheduleWeekView.styles';

export const RedLine = ({ topPosition }: { topPosition: string }) => {
  return <Box sx={{ ...styles.redLine, top: topPosition }}></Box>;
};