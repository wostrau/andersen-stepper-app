import { useMemo } from 'react';
import {
  isSameDay,
  isSameMonth
} from 'date-fns';


export const useSelectedDay = (date: Date, selectedDate: Date | null) => {
  return useMemo(
    () => selectedDate && isSameDay(date, selectedDate),
    [date, selectedDate]
  );
};

export const useCurrentMonth = (date: Date, month: Date) => {
  return useMemo(() => isSameMonth(date, month), [date, month]);
};

export const useNonWorkingDate = (date: Date, nonWorkingDates: Date[]) => {
  return useMemo(
    () =>
      nonWorkingDates.some((nonWorkingDate) => isSameDay(date, nonWorkingDate)),
    [date, nonWorkingDates]
  );
};

// const isNonWorking = nonWorkingDays.some((nonWorkingDay) =>
//   isSameDay(nonWorkingDay, day)
// );

// const dayAppointments = appointments.filter((appointment) =>
//   isSameDay(appointment.appointmentDate, day)
// );

// const isSelected =
//   selectedDate !== null && isSameDay(selectedDate, day);

// const isDisabled =
//   selectedDate !== null && !isSameMonth(month, day);
