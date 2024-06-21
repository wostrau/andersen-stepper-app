import React, { useState, useEffect } from 'react';
import {
  eachDayOfInterval,
  startOfYear,
  startOfMonth,
  endOfMonth,
  addMonths,
  format,
  isSameDay,
  subDays,
  addDays,
  getDay,
  startOfWeek,
  endOfWeek,
  isSameWeek,
} from 'date-fns';
import './CalendarAdjusted.css';

interface MonthViewProps {
  month: Date;
  selectedDate: Date | null;
  nonWorkingDates: Date[];
  handleDateClick: (date: Date) => void;
}

interface FullYearCalendarAdjustedProps {
  year: number;
  onDateSelect: (date: Date) => void;
}

const FullYearCalendarAdjusted: React.FC<FullYearCalendarAdjustedProps> = ({
  year = 2024,
  onDateSelect,
}) => {
  // const currentYear = new Date().getFullYear();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [nonWorkingDates, setNonWorkingDates] = useState<Date[]>([]);

  useEffect(() => {
    const mockNonWorkingDates = [
      new Date(year, 5, 1),
      new Date(year, 6, 4),
      new Date(year, 11, 25),
    ];
    setNonWorkingDates(mockNonWorkingDates);
  }, [year]);

  const months = Array.from({ length: 12 }, (_, i) =>
    addMonths(startOfYear(new Date(year, 0, 1)), i)
  );

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <div className='calendar-container'>
      {months.map((month, idx) => (
        <MonthView
          key={idx}
          month={month}
          selectedDate={selectedDate}
          nonWorkingDates={nonWorkingDates}
          handleDateClick={handleDateClick}
        />
      ))}
    </div>
  );
};

const MonthView: React.FC<MonthViewProps> = ({
  month,
  selectedDate,
  nonWorkingDates,
  handleDateClick,
}) => {
  const startOfMonthDate = startOfMonth(month);
  const endOfMonthDate = endOfMonth(month);
  //IMPORTANT TO KNOW: (0=Sunday, 1=Monday, ..., 6=Saturday)
  const startDayOfWeek = getDay(startOfMonthDate);

  let daysFromPrevMonth: Date[] = [];

  if (startDayOfWeek > 1) {
    const daysToGoBack = startDayOfWeek - 1;
    daysFromPrevMonth = eachDayOfInterval({
      start: subDays(startOfMonthDate, daysToGoBack),
      end: subDays(startOfMonthDate, 1),
    });
  }

  const daysInMonth = eachDayOfInterval({
    start: startOfMonthDate,
    end: endOfMonthDate,
  });

  const totalDaysDisplayed = daysFromPrevMonth.length + daysInMonth.length;
  const daysFromNextMonth = eachDayOfInterval({
    start: addDays(endOfMonthDate, 1),
    end: addDays(endOfMonthDate, 42 - totalDaysDisplayed),
  });

  const currentDate = new Date();

  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });

  const isNonWorkingDate = (date: Date) =>
    nonWorkingDates.some((nonWorkingDate) => isSameDay(date, nonWorkingDate));

  const isCurrentWeek = (date: Date) => {
    // return isAfter(date, startOfCurrentWeek) && isBefore(date, endOfCurrentWeek);
    return isSameWeek(date, currentDate, { weekStartsOn: 1 });
  };

  const isSelectedDay = (date: Date) =>
    selectedDate && isSameDay(date, selectedDate);

  const isStartOfCurrentWeek = (date: Date) =>
    isSameDay(date, startOfCurrentWeek);

  const isEndOfCurrentWeek = (date: Date) => isSameDay(date, endOfCurrentWeek);

  return (
    <div className='month'>
      <h3>{format(month, 'MMMM yyyy')}</h3>
      <div className='weekdays-container'>
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, index) => (
          <div
            key={index}
            className='weekday'
          >
            {day}
          </div>
        ))}
      </div>
      <div className='days-container'>
        <div className='days'>
          {daysFromPrevMonth.map((day) => (
            <div
              key={day.toISOString()}
              className='day prev-next-month'
            >
              <span>{format(day, 'd')}</span>
            </div>
          ))}

          {daysInMonth.map((day) => (
            <div
              key={day.toISOString()}
              className={`day
                ${isCurrentWeek(day) ? 'current-week' : ''}
                ${isStartOfCurrentWeek(day) ? 'start-current-week' : ''}
                ${isEndOfCurrentWeek(day) ? 'end-current-week' : ''}
                `}
            >
              <div
                className={`day
                ${
                  isNonWorkingDate(day) && !isSelectedDay(day)
                    ? 'non-working'
                    : ''
                }
                ${
                  isSameDay(day, currentDate) && !isSelectedDay(day)
                    ? 'current-date'
                    : ''
                }
                ${isSelectedDay(day) ? 'selected-date' : ''}
              `}
                onClick={() => handleDateClick(day)}
              >
                <span>{format(day, 'd')}</span>
              </div>
            </div>
          ))}

          {daysFromNextMonth.map((day) => (
            <div
              key={day.toISOString()}
              className='day prev-next-month'
            >
              <span>{format(day, 'd')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullYearCalendarAdjusted;
