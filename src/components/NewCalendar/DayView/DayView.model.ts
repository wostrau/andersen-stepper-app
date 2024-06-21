export type DayViewProps = {
  day: Date;
  month: Date;
  selectedDate: Date | null;
  nonWorkingDates: Date[];
  onDateSelect: (date: Date) => void;
};

export type UseCurrentWeekResult = {
  isCurrentDay: boolean;
  isCurrentWeek: boolean;
  isStartOfCurrentWeek: boolean;
  isEndOfCurrentWeek: boolean;
};
