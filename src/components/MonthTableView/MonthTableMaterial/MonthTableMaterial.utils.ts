// useMonthWeeks.ts
import { useMemo } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  Day,
} from 'date-fns';

interface Week {
  // weekNumber: number;
  days: Date[];
}

export const useMonthWeeks = (month: Date, weekStartsOn: Day = 1): Week[] => {
  return useMemo(() => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const startDate = startOfWeek(monthStart, { weekStartsOn });
    const endDate = endOfWeek(monthEnd, { weekStartsOn });

    const daysArray = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    return Array.from(
      { length: Math.ceil(daysArray.length / 7) },
      (_, index) => {
        const weekDays = daysArray.slice(index * 7, index * 7 + 7);
        return {
          // weekNumber: index + 1,
          days: weekDays,
        };
      }
    );
  }, [month]);
};
