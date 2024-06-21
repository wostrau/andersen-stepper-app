import { format } from 'date-fns';
import { Box, Typography, Grid } from '@mui/material';
import type { MonthViewProps } from './MonthView.model';
import { useMonthDays } from './MonthView.utils';
import { styles } from './MonthView.styles';
import { DayView } from '../DayView';

export const MonthView: React.FC<MonthViewProps> = ({ month, ...rest }) => {
  const { days } = useMonthDays(month);
  console.log('month >>>', month);

  return (
    <Grid
      item
      sx={styles.month}
    >
      <Typography
        variant='h6'
        align='center'
        sx={styles.monthTitle}
      >
        {format(month, 'MMMM yyyy')}
      </Typography>
      <Grid
        container
        justifyContent='space-between'
        sx={{ mb: 0.5 }}
      >
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, index) => (
          <Box
            key={index}
            sx={styles.weekday}
          >
            {day}
          </Box>
        ))}
      </Grid>
      <Grid container>
        {days.map((day) => (
          <DayView
            key={day.toISOString()}
            day={day}
            month={month}
            {...rest}
          />
        ))}
      </Grid>
    </Grid>
  );
};
