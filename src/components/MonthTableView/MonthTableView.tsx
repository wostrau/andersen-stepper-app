import React from 'react';
import './MonthTable/MonthTable.css';
import { Grid } from '@mui/material';
import { Appointment } from './MonthTableView.types';
import { MonthTableMaterial } from './MonthTableMaterial/MonthTableMaterial';

interface MonthTableViewProps {
  month: Date;
  selectedDate: Date | null;
  onDateSelect: (day: Date) => void;
  nonWorkingDates: Date[];
  appointments: Appointment[];
}

export const MonthTableView: React.FC<MonthTableViewProps> = ({
  month,
  selectedDate,
  onDateSelect,
  nonWorkingDates,
  appointments,
}) => {
  const handleDateSelect = (date: Date) => {
    onDateSelect(date);
    console.log('Selected Date >>>', date);
  };

  return (
    <Grid container>
      <MonthTableMaterial
        month={month}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        nonWorkingDays={nonWorkingDates}
        appointments={appointments}
      />
    </Grid>
  );
};
