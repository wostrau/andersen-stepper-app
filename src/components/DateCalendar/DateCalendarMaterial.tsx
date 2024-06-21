import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { makeStyles } from '@material-ui/core/styles';
import { Dayjs } from 'dayjs';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

const useStyles = makeStyles({
  currentDay: {
    backgroundColor: 'lightblue',
  },
  currentWeek: {
    backgroundColor: 'lightgray',
  },
});

export default function DateCalendarMaterial() {
  const classes = useStyles();

  const renderDay = (day: Dayjs, _selectedDate: Dayjs | null, DayProps: any): JSX.Element => {
    let dayClassName = '';
    if (DayProps.isCurrentDay) {
      dayClassName = classes.currentDay;
    } else if (DayProps.isCurrentWeek) {
      dayClassName = classes.currentWeek;
    }
    return (
      <div {...DayProps} className={dayClassName}>
        {day.format('D')}
      </div>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        showDaysOutsideCurrentMonth
        renderLoading={() => <DayCalendarSkeleton />}
        renderDay={renderDay}
      />
    </LocalizationProvider>
  );
}
