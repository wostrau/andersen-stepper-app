import { useState, useEffect } from 'react';

export const useTimeIndicatorPosition = (
  startHour: number,
  endHour: number
) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const getTimeIndicatorPosition = (): string => {
    const startOfDay = new Date().setHours(startHour, 0, 0, 0);
    const minutesSinceStartOfDay = (currentTime.getTime() - startOfDay) / 60000;
    const totalMinutes = (endHour - startHour) * 60;
    return `${(minutesSinceStartOfDay / totalMinutes) * 100}%`;
  };

  return getTimeIndicatorPosition;
};
