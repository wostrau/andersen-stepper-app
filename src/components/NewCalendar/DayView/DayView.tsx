import { Box, Typography } from '@mui/material';
import { format } from 'date-fns';
import {
  useCurrentMonth,
  useCurrentWeek,
  useNonWorkingDate,
  useSelectedDay,
} from './DayView.utils';
import type { DayViewProps } from './DayView.model';
import { styles } from './DayView.styles';

export const DayView: React.FC<DayViewProps> = ({
  day,
  month,
  selectedDate,
  nonWorkingDates,
  onDateSelect,
}) => {
  const {
    isCurrentDay,
    isCurrentWeek,
    isStartOfCurrentWeek,
    isEndOfCurrentWeek,
  } = useCurrentWeek(day);
  const isCurrentMonth = useCurrentMonth(day, month);
  const isSelectedDay = useSelectedDay(day, selectedDate);
  const isNonWorkingDate = useNonWorkingDate(day, nonWorkingDates);

  const handleSelectDate = (day: Date) => {
    if (isCurrentMonth) {
      onDateSelect(day);
    }
  };
  return (
    <Box
      sx={{
        ...styles.day,
        ...(!isCurrentMonth && styles.prevNextMonthDay),
        ...(isCurrentWeek && styles.currentWeek),
        ...(isStartOfCurrentWeek && styles.startCurrentWeek),
        ...(isEndOfCurrentWeek && styles.endCurrentWeek),
      }}
    >
      <Box
        sx={{
         
          ...(isCurrentMonth &&
            isNonWorkingDate &&
            !isSelectedDay &&
            styles.nonWorking),
          ...(isCurrentDay && !isSelectedDay && styles.currentDate),
          ...(isCurrentMonth && isSelectedDay && styles.selectedDate),
        }}
        onClick={() => handleSelectDate(day)}
      >
        <Typography
          component='span'
          sx={styles.dayTitle}
        >
          {format(day, 'd')}
        </Typography>
      </Box>
    </Box>
  );
};
