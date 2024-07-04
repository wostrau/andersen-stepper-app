import React from 'react';
import { isSameDay } from 'date-fns';
import { TableRow } from '@mui/material';
import { DayCellMaterial } from '../DayCellMaterial/DayCellMaterial';
import { WeekRowProps } from './WeekRowMaterial.types';

export const WeekRowMaterial: React.FC<WeekRowProps> = ({
  days,
  appointments,
  ...rest
}) => {
  return (
    <TableRow
    // sx={{height: 148}}
    >
      {days.map((day, index) => {
        const dayAppointments = appointments.filter((appointment) =>
          isSameDay(appointment.appointmentDate, day)
        );

        return (
          <DayCellMaterial
            key={index}
            day={day}
            appointments={dayAppointments}
            {...rest}
          />
        );
      })}
    </TableRow>
  );
};
