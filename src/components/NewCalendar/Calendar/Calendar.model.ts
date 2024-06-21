export type CalendarProps = {
  year?: number;
  selectedDate: Date | null;
  nonWorkingDates: Date[];
  onDateSelect: (date: Date) => void;
};
