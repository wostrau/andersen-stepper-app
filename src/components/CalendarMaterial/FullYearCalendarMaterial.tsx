import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { startOfYear, addMonths, format } from 'date-fns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

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
}));

const FullYearCalendarMaterial: React.FC = () => {
  const classes = useStyles();
  const currentYear = dayjs().year();
  const months = Array.from({ length: 12 }, (_, i) =>
    dayjs(startOfYear(new Date(currentYear, 0, 1))).add(i, 'month')
  );

console.log(currentYear)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid
        container
        className={classes.calendarContainer}
        spacing={2}
      >
        {months.map((month, idx) => (
          <MonthView
            key={idx}
            month={month}
          />
        ))}
      </Grid>
    </LocalizationProvider>
  );
};

interface MonthViewProps {
  month: Dayjs;
}

const MonthView: React.FC<MonthViewProps> = ({ month }) => {
  const classes = useStyles();

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2}
    >
      <Paper className={classes.month}>
        <Typography
          variant='h6'
          align='center'
        >
          {month.format('MMMM YYYY')}
        </Typography>
        <DateCalendar
          // value={null}
          onChange={() => {}}
        />
      </Paper>
    </Grid>
  );
};

export default FullYearCalendarMaterial;
