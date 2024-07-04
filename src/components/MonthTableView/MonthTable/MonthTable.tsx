import React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from 'date-fns';
// import './MonthTable.css';
import classNames from 'classnames';

interface Appointment {
  appointmentDate: Date;
  appointmentTime: string;
  patientName: string;
}

interface MonthTableProps {
  selectedDate: Date | null;
  month: Date;
  nonWorkingDays: Date[];
  appointments: Appointment[];
  onDateClick: (date: Date) => void;
}

const MonthTable: React.FC<MonthTableProps> = ({
  selectedDate,
  month,
  nonWorkingDays,
  appointments,
  onDateClick,
}) => {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const generateDaysArray = () => {
    const daysArray = [];
    let day = startDate;
    while (day <= endDate) {
      daysArray.push(day);
      day = addDays(day, 1);
    }
    return daysArray;
  };

  const daysArray = generateDaysArray();

  const renderDays = (weekDays: Date[]) => {
    return weekDays.map((day) => {
      const formattedDate = format(day, 'd');
      const isNonWorking = nonWorkingDays.some((nonWorkingDay) =>
        isSameDay(nonWorkingDay, day)
      );
      const dayAppointments = appointments.filter((appointment) =>
        isSameDay(appointment.appointmentDate, day)
      );
      const isSelected = selectedDate !== null && isSameDay(selectedDate, day);
      const isDisabled = selectedDate !== null && !isSameMonth(day, monthStart);

      const handleSelectDate = (day: Date) => {
        if (!isDisabled) {
          onDateClick(day);
        }
      };

      return (
        <td
          key={day.toISOString()}
          className={classNames('cell', {
            disabled: isDisabled,
            'non-working': isNonWorking,
          })}
          onClick={() => handleSelectDate(day)}
        >
          <div className={`appointments-container ${isSelected ? 'selected' : ''}`}>
            <div className='date'>{formattedDate}</div>

            {isNonWorking && <div className='title'>Non-working day</div>}

            {dayAppointments.length > 0 && (
              <>
                <div className='appointment-box'>
                  <div className='patient-box'>
                    <div>{dayAppointments[0].patientName}</div>
                    <div className='patient-time'>08:00</div>
                  </div>
                </div>
                <div className='more-appointments'>
                  {dayAppointments.length > 1 && (
                    <div className='more-title'>
                      {dayAppointments.length - 1}+
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </td>
      );
    });
  };

  const renderWeeks = () => {
    const weeks = [];
    for (let i = 0; i < daysArray.length; i += 7) {
      const weekDays = daysArray.slice(i, i + 7);
      weeks.push(<tr key={i}>{renderDays(weekDays)}</tr>);
    }
    return weeks;
  };

  return (
    <div className='calendar'>
      <table>
        <thead>
          <tr>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderWeeks()}</tbody>
      </table>
    </div>
  );
};

export default MonthTable;
