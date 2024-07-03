import React from 'react';
import './MonthTableMaterial.css';
import { WeekRowMaterial } from '../WeekRowMaterial/WeekRowMaterial';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@mui/material';
import { useMonthWeeks } from './MonthTableMaterial.utils';
import { MonthTableProps } from './MonthTableMaterial.types';

export const MonthTableMaterial: React.FC<MonthTableProps> = ({
  month,
  ...rest
}) => {
  const weeks = useMonthWeeks(month);

  const WEEK_DAYS_LONG = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <TableContainer
      component={Paper}
      // className='calendar'
    >
      <Table sx={{ width: 1409.8 }}>
        <TableHead>
          <TableRow>
            {WEEK_DAYS_LONG.map((day) => (
              <TableCell
                key={day}
                align='center'
                sx={{ height: 40, padding: 0, fontWeight: 700 }}
              >
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {weeks.map((week, index) => (
            <WeekRowMaterial
              key={index}
              days={week.days}
              month={month}
              {...rest}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
