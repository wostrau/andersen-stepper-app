import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { TimeSlotsProps } from './TimeSlots.model';
import { styles } from './TimeSlots.styles';
import { TimeSlot } from '../TimeSlot/TimeSlot';
import { useTimeSlots } from './TimeSlots.utils';
import { format } from 'date-fns';

export const TimeSlots: React.FC<TimeSlotsProps> = ({
  selectedTimeSlot,
  onTimeSlotSelect,
  ...rest
}) => {
  const timeSlots = useTimeSlots(rest);

  return (
    <>
      {timeSlots.map((timeSlot, index) => (
        <TableRow key={index}>
          <TableCell sx={styles.tableCellStyles}>{format(timeSlot.slot, 'HH:mm')}</TableCell>
          <TimeSlot
            slotsTime={timeSlot.slot}
            appointment={timeSlot.appointment}
            nonWorkingSlot={timeSlot.nonWorkingSlot}
            selectedTimeSlot={selectedTimeSlot}
            onTimeSlotSelect={onTimeSlotSelect}
            currentDay={rest.currentDay}
          />
        </TableRow>
      ))}
    </>
  );
};
