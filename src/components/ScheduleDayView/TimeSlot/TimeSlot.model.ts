export interface TimeSlotProps {
  slotsTime: Date;
  currentDay: Date;
  nonWorkingSlot: boolean;
  appointment: null | { patientName: string };
  selectedTimeSlot: Date | null;
  onTimeSlotSelect: (date: Date) => void;
}
