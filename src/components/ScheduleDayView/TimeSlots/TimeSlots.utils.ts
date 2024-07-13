import { useState, useEffect } from 'react';
import {
  addMinutes,
  startOfDay,
  addHours,
  isSameMinute,
  isEqual,
  setHours,
  parse,
} from 'date-fns';
import { UseTimeSlotsProps, Slot } from './TimeSlots.model';

const durationToMinutes = (duration: string) => {
  const parsedTime = parse(duration, 'HH:mm', new Date());
  const minutes = parsedTime.getMinutes();
  const hours = parsedTime.getHours();

  return hours * 60 + minutes;
};

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
          ? {
              patientName: matchingAppointment.patientName,
              duration: durationToMinutes(matchingAppointment.appointmentDuration),
            }
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
