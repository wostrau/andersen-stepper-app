import React from 'react';
import './DayCellMaterial.css';
import { Appointment } from '../MonthTableView.types';
import { format, isSameDay } from 'date-fns';
import { useCurrentMonth, useNonWorkingDate, useSelectedDay } from './DayCellMaterial.utils';

interface DayCellProps {
  day: Date;
  month: Date;
  selectedDate: Date | null;
  nonWorkingDays: Date[];
  // formattedDate: string;
  // isNonWorking: boolean;
  // isSelected: boolean;
  // isDisabled: boolean;
  appointments: Appointment[];
  onSelectDate: (date: Date) => void;
}

export const DayCellMaterial: React.FC<DayCellProps> = ({
  day,
  month,
  selectedDate,
  nonWorkingDays,
  appointments,
  onSelectDate,
}) => {
  const formattedDate = format(day, 'd');

  const isCurrentMonth = useCurrentMonth(day, month);
  const isSelected = useSelectedDay(day, selectedDate);
  const isNonWorking = useNonWorkingDate(day, nonWorkingDays);


  // const isNonWorking = nonWorkingDays.some((nonWorkingDay) =>
  //   isSameDay(nonWorkingDay, day)
  // );

  const dayAppointments = appointments.filter((appointment) =>
    isSameDay(appointment.appointmentDate, day)
  );

  // const isSelected =
  //   selectedDate !== null && isSameDay(selectedDate, day);

  // const isDisabled =
  //   selectedDate !== null && !isSameMonth(month, day);

  const handleSelectDate = () => {
    if (isCurrentMonth) {
      onSelectDate(day);
    }
  };

  // Combine CSS classes using template literals and conditional logic
  const cellClass = `cell ${!isCurrentMonth ? 'disabled' : ''} ${isNonWorking ? 'non-working' : ''}`;
  const appointmentsContainerClass = `appointments-container ${isSelected ? 'selected' : ''}`;

  return (
    <td
      className={cellClass}
      onClick={handleSelectDate}
    >
      <div className={appointmentsContainerClass}>
        <div className='date'>{formattedDate}</div>
        {isNonWorking && <div className='title'>Non-working day</div>}
        {appointments.length > 0 && (
          <>
            <div className='appointment-box'>
              <div className='patient-box'>
                <div>{appointments[0].patientName}</div>
                <div className='patient-time'>08:00</div>
              </div>
            </div>
            <div className='more-appointments'>
              {appointments.length > 1 && (
                <div className='more-title'>
                  {appointments.length - 1}+
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </td>
  );
};
