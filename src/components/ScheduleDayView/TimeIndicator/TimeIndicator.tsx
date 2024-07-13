import { Box } from '@mui/material';
import { TimeIndicatorProps } from './TimeIndicator.model';
import { useTimeIndicatorPosition } from './TimeIndicator.utils';
import { styles } from './TimeIndicator.styles';

export const TimeIndicator: React.FC<TimeIndicatorProps> = ({
  startHour = 10,
  endHour = 20,
}) => {
  const getTimeIndicatorPosition = useTimeIndicatorPosition(startHour, endHour);
  console.log('indicator renders');
  return (
    <Box
      sx={{
        ...styles.timeIndicatorStyles,
        top: getTimeIndicatorPosition(),
        '&::before': styles.timeIndicatorBeforeStyles,
      }}
    />
  );
};
