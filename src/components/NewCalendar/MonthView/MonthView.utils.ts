import { useMemo } from 'react';
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  subDays,
  addDays,
  getDay,
} from 'date-fns';

export const useMonthDays = (month: Date) => {
  const startOfMonthDate = startOfMonth(month);
  const endOfMonthDate = endOfMonth(month);
  const startDayOfWeek = getDay(startOfMonthDate);

  // const daysFromPrevMonth = useMemo(() => {
  //   if (startDayOfWeek > 1) {
  //     const daysToGoBack = startDayOfWeek - 1;
  //     return eachDayOfInterval({
  //       start: subDays(startOfMonthDate, daysToGoBack),
  //       end: subDays(startOfMonthDate, 1),
  //     });
  //   }
  //   return [];
  // }, [startOfMonthDate, startDayOfWeek]);

  const daysFromPrevMonth = useMemo(() => {
    let daysToGoBack = 0;
    if (startDayOfWeek === 0) {
      daysToGoBack = 6;
    } else if (startDayOfWeek > 1) {
      daysToGoBack = startDayOfWeek - 1;
    }

    if (daysToGoBack > 0) {
      return eachDayOfInterval({
        start: subDays(startOfMonthDate, daysToGoBack),
        end: subDays(startOfMonthDate, 1),
      });
    }
    return [];
  }, [startOfMonthDate, startDayOfWeek]);

  const daysInMonth = useMemo(() => {
    return eachDayOfInterval({
      start: startOfMonthDate,
      end: endOfMonthDate,
    });
  }, [startOfMonthDate, endOfMonthDate]);

  const totalDaysDisplayed = daysFromPrevMonth.length + daysInMonth.length;

  const daysFromNextMonth = useMemo(() => {
    return eachDayOfInterval({
      start: addDays(endOfMonthDate, 1),
      end: addDays(endOfMonthDate, 42 - totalDaysDisplayed),
    });
  }, [endOfMonthDate, totalDaysDisplayed]);

  const days = [...daysFromPrevMonth, ...daysInMonth, ...daysFromNextMonth];

  return { days };
};

// const startOfMonthDate = startOfMonth(month);
// const endOfMonthDate = endOfMonth(month);
// const startDayOfWeek = getDay(startOfMonthDate);

// let daysFromPrevMonth: Date[] = [];

// if (startDayOfWeek > 1) {
//   const daysToGoBack = startDayOfWeek - 1;
//   daysFromPrevMonth = eachDayOfInterval({
//     start: subDays(startOfMonthDate, daysToGoBack),
//     end: subDays(startOfMonthDate, 1),
//   });
// }

// const daysInMonth = eachDayOfInterval({
//   start: startOfMonthDate,
//   end: endOfMonthDate,
// });

// const totalDaysDisplayed = daysFromPrevMonth.length + daysInMonth.length;
// const daysFromNextMonth = eachDayOfInterval({
//   start: addDays(endOfMonthDate, 1),
//   end: addDays(endOfMonthDate, 42 - totalDaysDisplayed),
// });
