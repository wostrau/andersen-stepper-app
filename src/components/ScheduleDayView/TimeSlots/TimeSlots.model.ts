import { Appointment } from '../../MonthTableView/MonthTableView.types';

export interface TimeSlotsProps {
  startHour: number;
  endHour: number;
  currentDay: Date;
  selectedTimeSlot: Date | null;
  onTimeSlotSelect: (date: Date) => void;
  nonWorkingTimeSlots: Date[];
  appointments: Appointment[];
}

export interface UseTimeSlotsProps {
  startHour?: number;
  endHour?: number;
  currentDay: Date;
  nonWorkingTimeSlots: Date[];
  appointments: Appointment[];
}

export type Slot = {
  slot: Date;
  nonWorkingSlot: boolean;
  appointment: null | { patientName: string };
};
