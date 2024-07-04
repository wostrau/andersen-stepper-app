import { Appointment } from '../MonthTableView.types';

export interface DayCellProps {
  day: Date;
  month: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  nonWorkingDays: Date[];
  appointments: Appointment[];
}
