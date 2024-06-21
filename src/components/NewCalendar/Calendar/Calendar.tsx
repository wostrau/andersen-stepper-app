import { Grid } from '@mui/material';
import { addMonths, startOfYear } from 'date-fns';
import type { CalendarProps } from './Calendar.model';
import { MonthView } from '../MonthView';
import { styles } from './Calendar.styles';

export const Calendar: React.FC<CalendarProps> = ({ year = 2024, ...rest }) => {
  const months = Array.from({ length: 12 }, (_, i) =>
    addMonths(startOfYear(new Date(year, 0, 1)), i)
  );

  return (
    <Grid
      container
      sx={styles.calendarContainer}
    >
      {months.map((month, index) => (
        <MonthView
          key={index}
          month={month}
          {...rest}
        />
      ))}
    </Grid>
  );
};
