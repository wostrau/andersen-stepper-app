import { useMemo } from 'react';
import { endOfWeek, isSameDay, isSameWeek, startOfWeek, Day, isSameMonth } from 'date-fns';
import type { UseCurrentWeekResult } from './DayView.model';

export const useCurrentWeek = (
  date: Date,
  weekStartsOn: Day = 1
): UseCurrentWeekResult => {
  const currentDate = new Date();

  const startOfCurrentWeek = useMemo(
    () => startOfWeek(currentDate, { weekStartsOn }),
    [currentDate, weekStartsOn]
  );

  const endOfCurrentWeek = useMemo(
    () => endOfWeek(currentDate, { weekStartsOn }),
    [currentDate, weekStartsOn]
  );

  const isCurrentDay = useMemo(
    () => isSameDay(date, currentDate),
    [date, currentDate]
  );

  const isCurrentWeek = useMemo(
    () => isSameWeek(date, currentDate, { weekStartsOn }),
    [date, currentDate, weekStartsOn]
  );

  const isStartOfCurrentWeek = useMemo(
    () => isSameDay(date, startOfCurrentWeek),
    [date, startOfCurrentWeek]
  );

  const isEndOfCurrentWeek = useMemo(
    () => isSameDay(date, endOfCurrentWeek),
    [date, endOfCurrentWeek]
  );

  return {
    isCurrentDay,
    isCurrentWeek,
    isStartOfCurrentWeek,
    isEndOfCurrentWeek,
  };
};

export const useSelectedDay = (date: Date, selectedDate: Date | null) => {
  return useMemo(() => selectedDate && isSameDay(date, selectedDate), [date, selectedDate]);
};

export const useCurrentMonth = (date: Date, month: Date) => {
  return useMemo(() => isSameMonth(date, month), [date, month]);
};

export const useNonWorkingDate = (date: Date, nonWorkingDates: Date[]) => {
  return useMemo(
    () => nonWorkingDates.some(nonWorkingDate => isSameDay(date, nonWorkingDate)),
    [date, nonWorkingDates]
  );
};

// const currentDate = new Date();
// const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
// const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });

// const isCurrentWeek = (date: Date) => {
//   return isSameWeek(date, currentDate, { weekStartsOn: 1 });
// };

// const isStartOfCurrentWeek = (date: Date) =>
//   isSameDay(date, startOfCurrentWeek);

// const isEndOfCurrentWeek = (date: Date) => isSameDay(date, endOfCurrentWeek);
