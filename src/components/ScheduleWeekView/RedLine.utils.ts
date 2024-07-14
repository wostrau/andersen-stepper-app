import { useEffect, useState } from "react";

export const useCurrentTimeIndicator = (startHour: number, endHour: number) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(intervalId);
  }, []);

  const getRedLinePosition = () => {
    const startOfDay = new Date().setHours(startHour, 0, 0, 0);
    const minutesSinceStartOfDay = (currentTime.getTime() - startOfDay) / 60000;
    const totalMinutes = (endHour - startHour) * 60;
    return `${(minutesSinceStartOfDay / totalMinutes) * 100}%`;
  };

  return getRedLinePosition();
};
