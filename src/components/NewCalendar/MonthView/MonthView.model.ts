export type MonthViewProps = {
  month: Date;
  selectedDate: Date | null;
  nonWorkingDates: Date[];
  onDateSelect: (date: Date) => void;
}