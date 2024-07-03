import React from 'react';
import { parseISO } from 'date-fns';
import './MonthTable/MonthTable.css';
import { Grid } from '@mui/material';
import { Appointment } from './MonthTableView.types';
import { MonthTableMaterial } from './MonthTableMaterial/MonthTableMaterial';

interface MonthTableViewProps {
  month: Date;
  selectedDate: Date | null;
  onDateSelect: (day: Date) => void;
  nonWorkingDates: Date[];
}

export const MonthTableView: React.FC<MonthTableViewProps> = ({
  month,
  selectedDate,
  onDateSelect,
  nonWorkingDates,
}) => {
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

  const handleDateSelect = (date: Date) => {
    onDateSelect(date);
    console.log('Selected Date >>>', date);
  };

  return (
    <Grid container>
      <MonthTableMaterial
        month={month}
        selectedDate={selectedDate}
        appointments={appointments}
        nonWorkingDays={nonWorkingDates}
        onDateClick={handleDateSelect}
      />
    </Grid>
  );
};
