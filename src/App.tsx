// import { useEffect, useState } from 'react';
// import { Box } from '@mui/material';
// import { Button } from '@mui/material';
import './App.css';

//import { Calendar } from './components/NewCalendar';
import { MonthTableView } from './components/MonthTable/MonthTableView';
// import { getMonth } from 'date-fns';
// import { StepperPage } from './pages/StepperPage';
// import { CalendarReact } from './components/CalendarReact/CalendarReact';
// import { DateCalendarMonth } from './components/CalendarMaterial/DateCalendarMonth';
// import FullYearCalendar from './components/Calendar/FullYearCalendar';
// import FullYearCalendarAdjusted from './components/CalendarAdjusted/CalendarAdjusted';
// import FullYearCalendarMaterial from './components/CalendarMaterial/FullYearCalendarMaterial';
// import DateCalendarMaterial from './components/DateCalendar/DateCalendarMaterial';
// import { SchedulePage } from './pages/SchedulePage';

function App() {
  // const [selectedYear, setSelectedYear] = useState<number>(2024);
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // const [nonWorkingDates, setNonWorkingDates] = useState<Date[]>([]);

  // const handleDateSelect = (date: Date) => {
  //   setSelectedDate(date);
  //   console.log('Date >>>', date);
  // };

  // useEffect(() => {
  //   const mockNonWorkingDates = [
  //     new Date(2024, 5, 1),
  //     new Date(2024, 6, 4),
  //     new Date(2024, 11, 25),
  //   ];
  //   setNonWorkingDates(mockNonWorkingDates);
  // }, []);

  // const btnColor = '#0d323f';
  // const btnStyles = {
  //   m: 1,
  //   color: btnColor,
  //   border: `1px solid ${btnColor}`,
  //   borderRadius: '4px',
  // };

  return (
    <div className='App'>
      {/* <StepperPage /> */}
      {/* <CalendarReact /> */}
      {/* <DateCalendarMonth /> */}
      {/* <FullYearCalendar /> */}
      {/* <FullYearCalendarMaterial /> */}
      {/* <DateCalendarMaterial/> */}
      {/* <SchedulePage /> */}
      {/* <FullYearCalendarAdjusted /> */}
      {/* <Box sx={{ mb: 7 }}>
        <Button
          variant='outlined'
          sx={btnStyles}
          onClick={() => setSelectedYear((prevYear) => prevYear - 1)}
        >
          Prev Year
        </Button>
        <Box
          component='span'
          sx={{
            m: 1,
            color: '#1bbdd4',
            fontSize: '16px',
            fontWeight: '900',
          }}
        >
          {selectedYear}
        </Box>
        <Button
          variant='outlined'
          sx={btnStyles}
          onClick={() => setSelectedYear((prevYear) => prevYear + 1)}
        >
          Next Year
        </Button>
      </Box>
      <Calendar
        year={selectedYear}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        nonWorkingDates={nonWorkingDates}
      /> */}
        <MonthTableView />
    </div>
  );
}

export default App;
