import React, { useState } from 'react';
import MonthTable from './MonthTable';
import { parseISO } from 'date-fns';
import './MonthTable.css';

interface Appointment {
  appointmentDate: Date;
  appointmentTime: string;
  patientName: string;
}

export const MonthTableView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const nonWorkingDays = ['2024-06-01', '2024-06-07'].map((date) =>
    parseISO(date)
  );
  const appointments: Appointment[] = [
    {
      appointmentDate: parseISO('2024-06-21'),
      appointmentTime: '10:00',
      patientName: 'John Doe',
    },
    {
      appointmentDate: parseISO('2024-06-21'),
      appointmentTime: '14:00',
      patientName: 'Jane Smith',
    },
    {
      appointmentDate: parseISO('2024-06-22'),
      appointmentTime: '09:00',
      patientName: 'Alice Johnson',
    },
  ];

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    console.log('Selected Date:', date);
  };

  return (
    <MonthTable
      selectedDate={selectedDate}
      month={new Date('2024-06-01')}
      nonWorkingDays={nonWorkingDays}
      appointments={appointments}
      onDateClick={handleDateClick}
    />
  );
};
