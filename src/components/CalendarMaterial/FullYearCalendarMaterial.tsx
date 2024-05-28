import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { startOfYear, addMonths, format } from 'date-fns';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro';

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

interface MonthViewProps {
  month: Date;
}

const FullYearCalendarMaterial: React.FC = () => {
  const classes = useStyles();
  const currentYear = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, i) =>
    addMonths(startOfYear(new Date(currentYear, 0, 1)), i)
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {' '}
      {/* Pass DateAdapter as the dateAdapter */}
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

const MonthView: React.FC<MonthViewProps> = ({ month }) => {
  const [selectedDateRange, setSelectedDateRange] = useState<any>(null);
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
          {format(month, 'MMMM yyyy')}
        </Typography>
        <DateRangePicker
          value={selectedDateRange}
          onChange={(newValue) => setSelectedDateRange(newValue)}
        />
      </Paper>
    </Grid>
  );
};

export default FullYearCalendarMaterial;
