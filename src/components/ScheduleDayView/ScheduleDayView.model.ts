export interface Appointment {
  appointmentDate: Date;
  appointmentTime: string;
  patientName: string;
}

export interface ScheduleDayViewProps {
  startHour?: number;
  endHour?: number;
  selectedDay: Date | null;
  selectedTimeSlot: Date | null;
  onTimeSlotSelect: (date: Date) => void;
  nonWorkingTimeSlots: Date[];
  appointments: Appointment[];
}
