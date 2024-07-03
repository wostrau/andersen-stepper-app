import { Appointment } from "../MonthTableView.types";

export interface MonthTableProps {
  selectedDate: Date | null;
  month: Date;
  nonWorkingDays: Date[];
  appointments: Appointment[];
  onDateClick: (date: Date) => void;
}