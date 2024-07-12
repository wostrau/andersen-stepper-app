import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { format } from 'date-fns';
// import { TimeIndicator } from './TimeIndicator';
import { ScheduleDayViewProps } from './ScheduleDayView.model';
import { TimeSlots } from './TimeSlots/TimeSlots';
import { styles } from './ScheduleDayView.styles';

export const ScheduleDayView: React.FC<ScheduleDayViewProps> = ({
  startHour = 10,
  endHour = 20,
  selectedDay,
  ...rest
}) => {
  const currentDay = selectedDay ?? new Date();

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={styles.tableContainerStyles}
    >
      <Table sx={styles.tableStyles}>
        <TableHead>
          <TableRow>
            <TableCell
              align='center'
              colSpan={2}
              sx={styles.tableCellStyles}
            >
              {format(currentDay, 'EEEE, d MMMM')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* <TimeIndicator /> */}

          <TimeSlots
            startHour={startHour}
            endHour={endHour}
            currentDay={currentDay}
            {...rest}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
};
