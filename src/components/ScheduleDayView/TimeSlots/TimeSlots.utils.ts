import { useState, useEffect } from 'react';
import {
  format,
  addMinutes,
  startOfDay,
  addHours,
  isSameMinute,
  isEqual,
  setHours,
} from 'date-fns';
import { UseTimeSlotsProps, Slot } from './TimeSlots.model';

export const useTimeSlots = (values: UseTimeSlotsProps): Slot[] => {
  const {
    startHour = 10,
    endHour = 20,
    currentDay,
    nonWorkingTimeSlots,
    appointments,
  } = values;
  const [timeSlots, setTimeSlots] = useState<Slot[]>([]);

  useEffect(() => {
    const generateTimeSlots = (): Slot[] => {
      const slots: Slot[] = [];

      const startTime = setHours(startOfDay(currentDay), startHour);
      const endTime = addHours(startOfDay(currentDay), endHour);

      let currentTime = startTime;

      while (currentTime <= endTime) {
        const isNonWorkingSlot = nonWorkingTimeSlots.some((slot) =>
          isSameMinute(slot, currentTime)
        );

        const matchingAppointment = appointments.find((appointment) =>
          isEqual(appointment.appointmentDate, currentTime)
        );

        const appointmentInfo = matchingAppointment
          ? { patientName: matchingAppointment.patientName }
          : null;

        slots.push({
          slot: currentTime,
          nonWorkingSlot: isNonWorkingSlot,
          appointment: appointmentInfo,
        });

        currentTime = addMinutes(currentTime, 30);
      }

      return slots;
    };

    setTimeSlots(generateTimeSlots());
  }, [startHour, endHour, currentDay, nonWorkingTimeSlots, appointments]);

  return timeSlots;
};
