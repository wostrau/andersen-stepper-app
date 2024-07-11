export interface Appointment {
  appointmentDate: Date;
  appointmentTime: string;
  patientName: string;
}

export interface ScheduleDayViewProps {
  startHour?: number;
  endHour?: number;
  selectedDay: Date;
  selectedTimeSlot: Date | null;
  onTimeSlotSelect: (date: Date) => void;
  nonWorkingTimeSlots: Date[];
  appointments: Appointment[];
}
