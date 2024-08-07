import { useMemo } from 'react';
import { addMinutes, isAfter, isBefore, isEqual, isSameDay } from 'date-fns';
import { TimeSlotStatus } from './TimeSlot.model';

export const useTimeSlotStatus = (
  slotsTime: Date,
  selectedTimeSlot: Date | null
): TimeSlotStatus => {
  const currentTime = new Date();
  const endOfTimeSlot = useMemo(() => addMinutes(slotsTime, 30), [slotsTime]);

  const isSlotRange = useMemo(
    () =>
      isAfter(currentTime, slotsTime) && isBefore(currentTime, endOfTimeSlot),
    [currentTime, slotsTime, endOfTimeSlot]
  );

  const isPassedTime = useMemo(
    () => isBefore(slotsTime, currentTime),
    [slotsTime, currentTime]
  );

  const isSelectedSlot = useMemo(
    () => selectedTimeSlot !== null && isEqual(selectedTimeSlot, slotsTime),
    [selectedTimeSlot, slotsTime]
  );

  const isSameDayAsCurrent = useMemo(
    () => isSameDay(currentTime, slotsTime),
    [currentTime, slotsTime]
  );

  return {
    isSlotRange,
    isPassedTime,
    isSelectedSlot,
    isSameDayAsCurrent,
  };
};
