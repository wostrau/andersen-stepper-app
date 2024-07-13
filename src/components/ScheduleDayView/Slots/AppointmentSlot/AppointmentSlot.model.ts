export interface AppointmentSlotProps {
  appointment: {
    patientName: string;
    duration: string;
  };
  slotsTime: Date;
  isPassed: boolean;
  isSelected: boolean;
}
