import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import { startOfYear, addMonths, format } from 'date-fns';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  calendarContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  month: {
    border: '1px solid #ccc',
    margin: '10px',
    padding: '10px',
    width: '30%',
    boxSizing: 'border-box',
  },
  monthTitle: {
    textAlign: 'center', // Center the text
    margin: '0 auto', // Center the title horizontally
  },
}));

export const DateCalendarMonth = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(null));

  const currentYear = new Date().getFullYear();

  const months = Array.from({ length: 12 }, (_, i) =>
    addMonths(startOfYear(new Date(currentYear, 0, 1)), i)
  );

  console.log(months);

  const CustomCalendarHeader = (props: any) => {
    const { labelId, label, components, ...other } = props;
    return (
      <div className={classes.monthTitle} {...other}>
        <Typography variant="h6">{label}</Typography>
      </div>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {months.map((month, idx) => {
        const monthValue = format(month, 'yyyy-MM-dd');
        console.log(monthValue);
        return (
          <React.Fragment key={idx}>
            <DateCalendar
              referenceDate={dayjs(monthValue)}
              view={'day'}
              views={['day']}
              onChange={(newValue) => setValue(newValue)}
              showDaysOutsideCurrentMonth
              fixedWeekNumber={5}
              displayWeekNumber
              reduceAnimations
              slots={{
                switchViewButton: () => null,
                previousIconButton: () => null,
                nextIconButton: () => null,
                calendarHeader: CustomCalendarHeader,
              }}
              // slotProps={{
              //   calendarHeader: {
              //     labelId: 'calendar-header',
              //     label: format(month, 'MMMM yyyy'),
              //   },
              // }}
            />
          </React.Fragment>
        );
      })}
    </LocalizationProvider>
  );
};
