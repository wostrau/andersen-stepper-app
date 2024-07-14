import { addDays } from "date-fns";

export const generateTimeSlots = (startHour: number, endHour: number) => {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${String(hour).padStart(2, '0')}:00`);
    slots.push(`${String(hour).padStart(2, '0')}:30`);
  }
  slots.push(`${String(endHour).padStart(2, '0')}:00`);
  return slots;
};

export const getWeekDays = (start: Date) => {
  return Array.from({ length: 7 }).map((_, i) => addDays(start, i));
};
