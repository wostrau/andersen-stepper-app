import { Appointment } from "../ScheduleDayView/ScheduleDayView.model";

export interface ScheduleWeekViewProps {
  startHour?: number;
  endHour?: number;
  selectedDay: Date | null;
  selectedTimeSlot: Date | null;
  onTimeSlotSelect: (date: Date) => void;
  nonWorkingTimeSlots: Date[];
  appointments: Appointment[];
}