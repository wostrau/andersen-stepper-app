import React from 'react';
import { format } from 'date-fns';
import { Box, TableCell, Typography } from '@mui/material';
import {
  useCurrentMonth,
  useNonWorkingDate,
  useSelectedDay,
} from './DayCellMaterial.utils';
import { DayCellProps } from './DayCellMaterial.types';
import './DayCellMaterial.css';

export const DayCellMaterial: React.FC<DayCellProps> = ({
  day,
  month,
  selectedDate,
  onDateSelect,
  nonWorkingDays,
  appointments,
}) => {
  const isCurrentMonth = useCurrentMonth(day, month);
  const isSelected = useSelectedDay(day, selectedDate);
  const isNonWorking = useNonWorkingDate(day, nonWorkingDays);

  const handleSelectDate = () => {
    if (isCurrentMonth) {
      onDateSelect(day);
    }
  };

  const selectedTitleClass = { color: '#1BBDD4', fontWeight: '700' };
  const selectedCellClass = {
    border: '2px solid #1bbdd4',
    borderRadius: '4px',
  };
  const nonWorkingClass = {
    backgroundColor: '#f6f7f9',
  };
  const nonWorkingTitleClass = {
    color: '#6c768b',
  };
  const nonWorkingMessageClass = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '100%',
    fontSize: '14px',
    fontWeight: '500',
    color: '#6c768b',
  };

  return (
    <TableCell
      sx={{
        height: 148,
        padding: '1px',
        border: '1px solid #d7dae0',
        boxSizing: 'border-box',
      }}
      onClick={handleSelectDate}
    >
      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
          boxSizing: 'border-box',
          padding: '2px',
          border: '2px solid transparent',
          ...(isCurrentMonth && isSelected && selectedCellClass),
          ...(isCurrentMonth && isNonWorking && nonWorkingClass),
        }}
      >
        <Typography
          sx={{
            mb: '4px',
            color: '#1f6a7f',
            top: '4px',
            left: '4px',
            fontSize: '14px',
            height: '21px',
            ...(isCurrentMonth && isSelected && selectedTitleClass),
            ...(isCurrentMonth && isNonWorking && nonWorkingTitleClass),
            ...(!isCurrentMonth && { color: '#8b94a5' }),
          }}
        >
          {format(day, 'd')}
        </Typography>

        {isCurrentMonth && isNonWorking && (
          <Box sx={nonWorkingMessageClass}>Non-working day</Box>
        )}

        {isCurrentMonth && !isNonWorking && appointments.length > 0 && (
          <Box sx={{ width: '100%' }}>
            <Box className='appointment-box'>
              <Box sx={{display: 'flex', padding: '2px'}}>
                <Box
                  sx={{
                    backgroundColor: '#1E829C',
                    height: '43px',
                    width: '4px',
                    borderRadius: '2px',
                    mr: '8px'
                  }}
                ></Box>
                <Box className='patient-box'>
                  <Box>{appointments[0].patientName}</Box>

                  <Box className='patient-time'>08:00</Box>
                </Box>
              </Box>
            </Box>

            <Box sx={{ height: 40 }}>
              {appointments.length > 1 && (
                <Box className='more-title'>{appointments.length - 1}+</Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </TableCell>
  );
};
