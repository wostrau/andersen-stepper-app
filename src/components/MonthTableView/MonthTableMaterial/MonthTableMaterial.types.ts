import { Appointment } from "../MonthTableView.types";

export interface MonthTableProps {
  month: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  nonWorkingDays: Date[];
  appointments: Appointment[];
}