import { useState, useEffect } from 'react';
import {
  format,
  addMinutes,
  startOfDay,
  addHours,
  isSameMinute,
  isEqual,
} from 'date-fns';
import { UseTimeSlotsProps, Slot } from './TimeSlots.model';

export const useTimeSlots = (props: UseTimeSlotsProps): Slot[] => {
  const {
    startHour = 10,
    endHour = 20,
    currentDay,
    nonWorkingTimeSlots,
    appointments,
  } = props;
  const [timeSlots, setTimeSlots] = useState<Slot[]>([]);

  useEffect(() => {
    const generateTimeSlots = (): Slot[] => {
      const slots: Slot[] = [];

      const startTime = startOfDay(currentDay);
      const endTime = addHours(startOfDay(currentDay), endHour - startHour + 1);

      let currentTime = startTime;

      while (currentTime < endTime) {
        const timeSlot = format(currentTime, 'HH:mm');
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
          slot: timeSlot,
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
