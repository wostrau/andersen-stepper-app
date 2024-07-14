export interface Appointment {
  appointmentDate: Date;
  patientName: string;
  appointmentTime: string;
  appointmentDuration: string;
  nonWorkingSlot?: Date;
}

export interface ScheduleWeekViewProps {
  appointments: Appointment[];
  selectedDay?: Date;
}