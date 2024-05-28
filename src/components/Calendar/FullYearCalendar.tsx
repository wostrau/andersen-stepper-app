import React, { useState } from 'react';
import {
  eachDayOfInterval,
  startOfYear,
  startOfMonth,
  endOfMonth,
  addMonths,
  format,
  isSameDay,
  isBefore,
  isAfter,
  subDays,
  addDays,
  getDay
} from 'date-fns';
import './FullYearCalendar.css';

interface MonthViewProps {
  month: Date;
  isSelected: (date: Date) => boolean;
  isInMiddleOfSelection: (date: Date) => boolean;
  handleDateClick: (date: Date) => void;
}

const FullYearCalendar: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectionStart, setSelectionStart] = useState<Date | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<Date | null>(null);

  const months = Array.from({ length: 12 }, (_, i) => addMonths(startOfYear(new Date(currentYear, 0, 1)), i));

  const handleDateClick = (date: Date) => {
    if (!selectionStart || (selectionStart && selectionEnd)) {
      setSelectionStart(date);
      setSelectionEnd(null);
    } else {
      if (isBefore(date, selectionStart)) {
        setSelectionEnd(selectionStart);
        setSelectionStart(date);
      } else {
        setSelectionEnd(date);
      }
    }
  };

  const isSelected = (date: Date) => {
    if (!selectionStart) return false;
    if (!selectionEnd) return isSameDay(date, selectionStart);

    return (
      (isAfter(date, selectionStart) || isSameDay(date, selectionStart)) &&
      (isBefore(date, selectionEnd) || isSameDay(date, selectionEnd))
    );
  };

  const isInMiddleOfSelection = (date: Date) => {
    if (!selectionStart || !selectionEnd) return false;
    return isAfter(date, selectionStart) && isBefore(date, selectionEnd);
  };

  return (
    <div className="calendar-container">
      {months.map((month, idx) => (
        <MonthView
          key={idx}
          month={month}
          isSelected={isSelected}
          isInMiddleOfSelection={isInMiddleOfSelection}
          handleDateClick={handleDateClick}
        />
      ))}
    </div>
  );
};

const MonthView: React.FC<MonthViewProps> = ({ month, isSelected, isInMiddleOfSelection, handleDateClick }) => {
  const startOfMonthDate = startOfMonth(month);
  const endOfMonthDate = endOfMonth(month);

  // Get the start and end days of the weeks in the current month
  const startDayOfWeek = getDay(startOfMonthDate);
  const endDayOfWeek = getDay(endOfMonthDate);

  // Get the days to display from the previous and next months
  const daysFromPrevMonth = startDayOfWeek === 0 ? [] : eachDayOfInterval({
    start: subDays(startOfMonthDate, startDayOfWeek),
    end: subDays(startOfMonthDate, 1)
  });

  const daysFromNextMonth = endDayOfWeek === 6 ? [] : eachDayOfInterval({
    start: addDays(endOfMonthDate, 1),
    end: addDays(endOfMonthDate, 6 - endDayOfWeek)
  });

  const daysInMonth = eachDayOfInterval({ start: startOfMonthDate, end: endOfMonthDate });

  return (
    <div className="month">
      <h3>{format(month, 'MMMM yyyy')}</h3>
      <div className="days">
        {daysFromPrevMonth.map((day) => (
          <div
            key={day.toISOString()}
            className="day prev-next-month"
          >
            <span>{format(day, 'd')}</span>
          </div>
        ))}
        {daysInMonth.map((day) => (
          <div
            key={day.toISOString()}
            className={`day ${isSelected(day) ? 'selected' : ''} ${isInMiddleOfSelection(day) ? 'in-middle' : ''}`}
            onClick={() => handleDateClick(day)}
          >
            <span>{format(day, 'd')}</span>
          </div>
        ))}
        {daysFromNextMonth.map((day) => (
          <div
            key={day.toISOString()}
            className="day prev-next-month"
          >
            <span>{format(day, 'd')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullYearCalendar;
