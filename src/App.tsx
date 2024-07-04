import { useEffect, useState } from 'react';
import './App.css';

import { MonthTableView } from './components/MonthTableView/MonthTableView';
import { Box, Button } from '@mui/material';
import { Calendar } from './components/NewCalendar';
import {
  addMonths,
  format,
  getYear,
  parseISO,
  startOfMonth,
  subMonths,
} from 'date-fns';
import { Appointment } from './components/MonthTableView/MonthTableView.types';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [nonWorkingDates, setNonWorkingDates] = useState<Date[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const currentDate = new Date();
  const [yearView, setYearView] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number>(
    getYear(currentDate)
  );
  const [selectedMonth, setSelectedMonth] = useState<Date>(
    startOfMonth(currentDate)
  );

  useEffect(() => {
    const mockNonWorkingDates = [
      new Date(2024, 5, 1),
      new Date(2024, 6, 4),
      new Date(2024, 7, 1),
      new Date(2024, 11, 25),
    ];

    setNonWorkingDates(mockNonWorkingDates);
  }, []);

  useEffect(() => {
    const appointments: Appointment[] = [
      {
        appointmentDate: parseISO('2024-07-18'),
        appointmentTime: '10:00',
        patientName: 'John Doe',
      },
      {
        appointmentDate: parseISO('2024-07-18'),
        appointmentTime: '14:00',
        patientName: 'Jane Smith',
      },
      {
        appointmentDate: parseISO('2024-07-19'),
        appointmentTime: '09:00',
        patientName: 'Alice Johnson',
      },
    ];

    setAppointments(appointments);
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const btnColor = '#0d323f';
  const btnStyles = {
    m: 1,
    color: btnColor,
    border: `1px solid ${btnColor}`,
    borderRadius: '4px',
  };

  return (
    <div className='App'>
      <Box sx={{ mb: 7 }}>
        <Button
          variant='outlined'
          sx={btnStyles}
          onClick={
            yearView
              ? () => setSelectedYear((prevYear) => prevYear - 1)
              : () => setSelectedMonth((prevMonth) => subMonths(prevMonth, 1))
          }
        >
          {yearView ? 'Prev Year' : 'Prev Month'}
        </Button>
        <Box
          onClick={() => setYearView((prevView) => !prevView)}
          component='span'
          sx={{
            m: 1,
            color: '#1bbdd4',
            fontSize: '16px',
            fontWeight: '900',
          }}
        >
          {yearView ? selectedYear : format(selectedMonth, 'MMMM')}
        </Box>
        <Button
          variant='outlined'
          sx={btnStyles}
          onClick={
            yearView
              ? () => setYearView((prevView) => !prevView)
              : () => setSelectedMonth((prevMonth) => addMonths(prevMonth, 1))
          }
        >
          {yearView ? 'Next Year' : 'Next Month'}
        </Button>
      </Box>
      {yearView && (
        <Calendar
          year={selectedYear}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          nonWorkingDates={nonWorkingDates}
        />
      )}
      {!yearView && (
        <MonthTableView
          month={selectedMonth}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          nonWorkingDates={nonWorkingDates}
          appointments={appointments}
        />
      )}
    </div>
  );
}

export default App;
