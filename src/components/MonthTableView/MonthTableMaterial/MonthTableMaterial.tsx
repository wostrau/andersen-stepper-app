import React from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@mui/material';
import { WeekRowMaterial } from '../WeekRowMaterial/WeekRowMaterial';
import { MonthTableProps } from './MonthTableMaterial.types';
import { useMonthWeeks } from './MonthTableMaterial.utils';

export const MonthTableMaterial: React.FC<MonthTableProps> = ({
  month,
  ...rest
}) => {
  const weeks = useMonthWeeks(month);

  const WEEK_DAYS_LONG = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ minWidth: 1410, minHeight: 785, borderRadius: 1, overflow: 'hidden',
        //border: '1px solid #d7dae0',
      }}
    >
      <Table
        sx={{
          tableLayout: 'fixed',
          // borderCollapse: 'collapse',
           borderCollapse: 'collapse', borderSpacing: 0
          // border: '1px solid #d7dae0',
        }}
      >
        <TableHead>
          <TableRow>
            {WEEK_DAYS_LONG.map((day) => (
              <TableCell
                key={day}
                align='center'
                sx={{
                  height: 40,
                  // padding: 0,
                  fontWeight: 400,
                  border: '1px solid #d7dae0',
                  padding: '1px', borderBottom: '1px solid #d7dae0'
                }}
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
