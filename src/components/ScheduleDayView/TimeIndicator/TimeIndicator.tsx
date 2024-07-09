import { Box } from '@mui/material';
import { TimeIndicatorProps } from './TimeIndicator.model';
import { useTimeIndicatorPosition } from './TimeIndicator.utils';
import { styles } from './TimeIndicator.styles';

const CurrentTimeIndicator: React.FC<TimeIndicatorProps> = ({
  startHour = 8,
  endHour = 20,
}) => {
  const getTimeIndicatorPosition = useTimeIndicatorPosition(startHour, endHour);

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

export default CurrentTimeIndicator;
