import { useEffect, useState } from 'react';
import './App.css';

import { MonthTableView } from './components/MonthTableView/MonthTableView';
import { Box } from '@mui/material';
import { Calendar } from './components/NewCalendar';
import {
  addDays,
  addMonths,
  getYear,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { Appointment } from './components/MonthTableView/MonthTableView.types';
import { ScheduleDayView } from './components/ScheduleDayView/ScheduleDayView';
import { ScheduleWeekView } from './components/ScheduleWeekView/ScheduleWeekView';
import { ControlPanel } from './components/ControlPanel/ControlPanel';
import { fourSchedules } from './components/ControlPanel/ControlPanel.model';

function App() {
  const currentDate = new Date();

  const [showYearView, setShowYearView] = useState<boolean>(false);
  const [showMonthView, setShowMonthView] = useState<boolean>(false);
  const [showWeekView, setShowWeekView] = useState<boolean>(true);
  const [showDayView, setShowDayView] = useState<boolean>(false);

  const [selectedYear, setSelectedYear] = useState<number>(
    getYear(currentDate)
  );
  const [selectedMonth, setSelectedMonth] = useState<Date>(
    startOfMonth(currentDate)
  );
  const [selectedWeek, setSelectedWeek] = useState<Date>(
    startOfWeek(currentDate, { weekStartsOn: 1 })
  );

  const [selectedDate, setSelectedDate] = useState<Date>(currentDate);
  console.log('selected date >>>', selectedDate);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<Date | null>(null);
  console.log('selected time slot >>>', selectedTimeSlot);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [nonWorkingDates, setNonWorkingDates] = useState<Date[]>([]);
  const [nonWorkingTimeSlots, setNonWorkingTimeSlots] = useState<Date[]>([]);

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
    const mockNonWorkingTimeSlots = [
      new Date(2024, 6, 14, 12, 0, 0),
      new Date(2024, 6, 14, 16, 0, 0),
      new Date(2024, 6, 14, 18, 0, 0),
    ];

    setNonWorkingTimeSlots(mockNonWorkingTimeSlots);
  }, []);

  useEffect(() => {
    const appointments: Appointment[] = [
      {
        appointmentDate: new Date(2024, 6, 14, 10, 0, 0),
        appointmentTime: '10:00',
        appointmentDuration: '00:30',
        patientName: 'John Doe',
      },
      {
        appointmentDate: new Date(2024, 6, 14, 17, 0, 0),
        appointmentTime: '17:00',
        appointmentDuration: '00:30',
        patientName: 'Jane Smith',
      },
      {
        appointmentDate: parseISO('2024-07-19'),
        appointmentTime: '09:00',
        appointmentDuration: '00:30',
        patientName: 'Alice Johnson',
      },
      {
        appointmentDate: parseISO('2024-07-11'),
        appointmentTime: '11:00',
        appointmentDuration: '00:30',
        patientName: 'John Doe',
      },
      {
        appointmentDate: parseISO('2024-07-11'),
        appointmentTime: '15:00',
        appointmentDuration: '00:30',
        patientName: 'Jane Smith',
      },
    ];

    setAppointments(appointments);
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handlerTimeSlotSelect = (timeSlot: Date) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleGoPrevious = (value: fourSchedules) => {
    switch (value) {
      case 'year':
        setSelectedYear((prevYear) => prevYear - 1);
        break;
      case 'month':
        setSelectedMonth((prevMonth) => subMonths(prevMonth, 1));
        break;
      case 'week':
        setSelectedWeek((prevMonth) => addDays(prevMonth, -7));
        break;
      case 'day':
        setSelectedDate((prevDate) => addDays(prevDate, -1));
        break;
    }
  };

  const handleGoNext = (value: fourSchedules) => {
    switch (value) {
      case 'year':
        setSelectedYear((prevYear) => prevYear + 1);
        break;
      case 'month':
        setSelectedMonth((prevMonth) => addMonths(prevMonth, 1));
        break;
      case 'week':
        setSelectedWeek((prevMonth) => addDays(prevMonth, 7));
        break;
      case 'day':
        setSelectedDate((prevDate) => addDays(prevDate, 1));
        break;
    }
  };

  const handleShowYearView = () => {
    setShowYearView(true);
    setShowMonthView(false);
    setShowWeekView(false);
    setShowDayView(false);
  };

  const handleShowMonthView = () => {
    setShowYearView(false);
    setShowMonthView(true);
    setShowWeekView(false);
    setShowDayView(false);
  };

  const handleShowWeekView = () => {
    setShowYearView(false);
    setShowMonthView(false);
    setShowWeekView(true);
    setShowDayView(false);
  };

  const handleShowDayView = () => {
    setShowYearView(false);
    setShowMonthView(false);
    setShowWeekView(false);
    setShowDayView(true);
  };

  return (
    <Box
      className='App'
      sx={{ padding: '20px' }}
    >
      <ControlPanel
        yearView={showYearView}
        monthView={showMonthView}
        weekView={showWeekView}
        dayView={showDayView}
        showYearView={() => handleShowYearView()}
        showMonthView={() => handleShowMonthView()}
        showWeekView={() => handleShowWeekView()}
        showDayView={() => handleShowDayView()}
        goPrev={handleGoPrevious}
        goNext={handleGoNext}
      />

      {showYearView && (
        <Calendar
          year={selectedYear}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          nonWorkingDates={nonWorkingDates}
        />
      )}

      {showMonthView && (
        <MonthTableView
          month={selectedMonth}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          nonWorkingDates={nonWorkingDates}
          appointments={appointments}
        />
      )}

      {showWeekView && (
        <ScheduleWeekView
          selectedWeek={selectedWeek}
          selectedTimeSlot={selectedTimeSlot}
          onTimeSlotSelect={handlerTimeSlotSelect}
          nonWorkingTimeSlots={nonWorkingTimeSlots}
          appointments={appointments}
        />
      )}

      {showDayView && (
        <ScheduleDayView
          selectedDay={selectedDate}
          selectedTimeSlot={selectedTimeSlot}
          onTimeSlotSelect={handlerTimeSlotSelect}
          nonWorkingTimeSlots={nonWorkingTimeSlots}
          appointments={appointments}
        />
      )}
    </Box>
  );
}

export default App;
