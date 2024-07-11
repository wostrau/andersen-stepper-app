import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { TimeSlotsProps } from './TimeSlots.model';
import { styles } from './TimeSlots.styles';
import { TimeSlot } from '../TimeSlot/TimeSlot';
import { useTimeSlots } from './TimeSlots.utils';

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
          <TableCell sx={styles.tableCellStyles}>{timeSlot.slot}</TableCell>
          <TimeSlot
            slotsTime={timeSlot.slot}
            currentDay={rest.currentDay}
            nonWorkingSlot={timeSlot.nonWorkingSlot}
            appointment={timeSlot.appointment}
            selectedTimeSlot={selectedTimeSlot}
            onTimeSlotSelect={onTimeSlotSelect}
          />
        </TableRow>
      ))}
    </>
  );
};
