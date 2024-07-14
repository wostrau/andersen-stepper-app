export interface TimeSlotProps {
  slotsTime: Date;
  isNonWorkingSlot: boolean;
  appointment: null | { patientName: string; duration: string };
  selectedTimeSlot: Date | null;
  onTimeSlotSelect: (date: Date) => void;
}

export interface TimeSlotStatus {
  isSlotRange: boolean;
  isPassedTime: boolean;
  isSelectedSlot: boolean;
  isSameDayAsCurrent: boolean;
}
