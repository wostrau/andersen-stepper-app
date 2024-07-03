import React from 'react';
import {
  isSameMonth,
  isSameDay
} from 'date-fns';
import './WeekRowMaterial.css';
import { Appointment } from '../MonthTableView.types';
import { DayCellMaterial } from '../DayCellMaterial/DayCellMaterial';

interface WeekRowProps {
  days: Date[];
  nonWorkingDays: Date[];
  appointments: Appointment[];
  selectedDate: Date | null;
  month: Date;
  onDateClick: (date: Date) => void;
}

export const WeekRowMaterial: React.FC<WeekRowProps> = ({
  days,
  nonWorkingDays,
  appointments,
  selectedDate,
  month,
  onDateClick,
}) => {
  return (
    <tr>
      {days.map((day) => {

        // const isNonWorking = nonWorkingDays.some((nonWorkingDay) =>
        //   isSameDay(nonWorkingDay, day)
        // );

        const dayAppointments = appointments.filter((appointment) =>
          isSameDay(appointment.appointmentDate, day)
        );

        // const isSelected =
        //   selectedDate !== null && isSameDay(selectedDate, day);

        // const isDisabled =
        //   selectedDate !== null && !isSameMonth(month, day);

        return (
          <DayCellMaterial
            key={day.toISOString()}
            day={day}
            month={month}
            selectedDate={selectedDate}
            nonWorkingDays={nonWorkingDays}
            // isNonWorking={isNonWorking}
            // isSelected={isSelected}
            // isDisabled={isDisabled}
            appointments={dayAppointments}
            onSelectDate={onDateClick}
            />
        );
      })}
    </tr>
  );
};
