import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { format, isBefore } from 'date-fns';

// Styled components using CSS as JS objects
const StyledTableContainer = styled(TableContainer)<{
  component: React.ReactElement;
}>({
  minWidth: '964px',
  // height: '1341px',
  borderRadius: '16px',
  overflow: 'hidden',
  position: 'relative',
});

const StyledTable = styled(Table)({
  borderCollapse: 'separate',
  borderSpacing: 0,
  height: '100%',
});

const StyledTableCell = styled(TableCell)({
  height: '48px',
  borderBottom: 'none',
  fontWeight: 700,
});

const TimeTableCell = styled(TableCell)({
  height: '48px',
  width: '80px',
  borderBottom: 'none',
  textAlign: 'center',
  verticalAlign: 'middle',
  fontWeight: 'bold',
});

const AppointmentTableCell = styled(TableCell)({
  height: '48px',
  borderBottom: 'none',
  padding: 0,
});

const RedLine = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '2px',
  backgroundColor: 'red',
  top: 0,
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '0px',
    top: '-4px',
    width: '10px',
    height: '10px',
    backgroundColor: 'red',
    borderRadius: '50%',
  },
});

const AppointmentBox = styled(Box)<{ passed: boolean }>(({ passed }) => ({
  backgroundColor: passed ? '#d3d3d3' : '#1BBDD4',
  borderRadius: '8px',
  color: 'white',
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  boxSizing: 'border-box',
}));

const NonWorkingBox = styled(Box)({
  backgroundColor: '#d3d3d3',
  borderRadius: '8px',
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// Define interfaces for props
interface Appointment {
  name: string;
  time: Date;
  duration: string;
}

interface TimeSlotProps {
  appointment: Appointment | null;
  currentTime: Date;
}

// Component to render time slots
const TimeSlot: React.FC<TimeSlotProps> = ({ appointment, currentTime }) => (
  <AppointmentTableCell>
    {appointment ? (
      <AppointmentBox passed={isBefore(appointment.time, currentTime)}>
        <Typography>{appointment.name}</Typography>
        <Typography>
          {format(appointment.time, 'HH:mm')} - {appointment.duration}
        </Typography>
      </AppointmentBox>
    ) : (
      <NonWorkingBox>Non-working</NonWorkingBox>
    )}
  </AppointmentTableCell>
);

const TimeTable: React.FC<{ startHour?: number; endHour?: number }> = ({
  startHour = 10,
  endHour = 20,
}) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Update the current time every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  // Calculate the red line position based on the current time
  const getRedLinePosition = (): string => {
    const startOfDay = new Date().setHours(startHour, 0, 0, 0);
    const minutesSinceStartOfDay = (currentTime.getTime() - startOfDay) / 60000;
    const totalMinutes = (endHour - startHour) * 60;
    return `${(minutesSinceStartOfDay / totalMinutes) * 100}%`;
  };

  // Generate time slots from startHour to endHour
  const generateTimeSlots = (
    start: number,
    end: number
  ): { time: Date; appointment: Appointment | null }[] => {
    const slots = [];
    for (let hour = start; hour <= end; hour++) {
      slots.push({
        time: new Date(new Date().setHours(hour, 0, 0, 0)),
        appointment: null,
      });
      if (hour !== end) {
        slots.push({
          time: new Date(new Date().setHours(hour, 30, 0, 0)),
          appointment: null,
        });
      }
    }
    return slots;
  };

  const rows = generateTimeSlots(startHour, endHour);

  console.log('rerender');
  return (
    <StyledTableContainer component={Paper}>
      <RedLine style={{ top: getRedLinePosition() }} />
      <StyledTable>
        <TableHead>
          <TableRow>
            <StyledTableCell
              align='center'
              colSpan={2}
            >
              {format(currentTime, 'EEEE, d MMMM')}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TimeTableCell>{format(row.time, 'HH:mm')}</TimeTableCell>
              <TimeSlot
                appointment={row.appointment}
                currentTime={currentTime}
              />
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default TimeTable;
