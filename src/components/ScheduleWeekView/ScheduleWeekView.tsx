import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import {
  startOfWeek,
  isSameDay,
  format,
  isBefore,
  isAfter,
  addMinutes,
} from 'date-fns';
import { useMemo } from 'react';
import { generateTimeSlots, getWeekDays } from './ScheduleWeekView.utils';
import { ScheduleWeekViewProps } from './ScheduleWeekView.model';
import { styles } from './ScheduleWeekView.styles';
import { TimeIndicator } from '../ScheduleDayView/TimeIndicator';

export const ScheduleWeekView: React.FC<ScheduleWeekViewProps> = ({
  startHour = 8,
  endHour = 20,
  appointments,
  selectedDay,
  nonWorkingTimeSlots,
  onTimeSlotSelect,
  selectedTimeSlot,
}) => {
  const currentWeek = selectedDay || selectedTimeSlot || new Date();

  const startOfCurrentWeek = useMemo(
    () => startOfWeek(currentWeek, { weekStartsOn: 1 }),
    [currentWeek]
  );

  const weekDays = useMemo(
    () => getWeekDays(startOfCurrentWeek),
    [startOfCurrentWeek]
  );

  const timeSlots = useMemo(
    () => generateTimeSlots(startHour, endHour),
    [startHour, endHour]
  );

  // const redLinePosition = useCurrentTimeIndicator(startHour, endHour);

  const getAppointmentForSlot = (day: Date, timeSlot: string) => {
    return appointments.find(
      (app) =>
        isSameDay(app.appointmentDate, day) && app.appointmentTime === timeSlot
    );
  };

  const isNonWorkingSlot = (day: Date, timeSlot: string) => {
    const slotDate = new Date(`${format(day, 'yyyy-MM-dd')}T${timeSlot}`);
    return appointments.some(
      (app) => app.nonWorkingSlot && isSameDay(app.nonWorkingSlot, slotDate)
    );
  };

  console.log('weekDays >>>', weekDays);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          // height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          paddingTop: '56px',
          paddingRight: '4px',
        }}
      >
        {timeSlots.map((slot, index) => (
          <Box
            key={index}
            sx={styles.timeSlotCell}
          >
            {slot}
          </Box>
        ))}
      </Box>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          ...styles.container,
          minWidth: 960,
          minHeight: 785,
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid #d7dae0',
        }}
      >
        <Table
          sx={{
            tableLayout: 'fixed',
            borderStyle: 'hidden',
            borderCollapse: 'collapse',
            borderSpacing: 0,
            //border: '1px solid #d7dae0',
          }}
        >
          <TableHead>
            <TableRow>
              {/* <TableCell sx={{ borderBottom: 'none' }}></TableCell> */}
              {weekDays.map((day, index) => (
                <TableCell
                  key={index}
                  sx={{
                    textAlign: 'center',
                    borderBottom: 'none',
                    border: '1px solid #d7dae0',
                    backgroundColor: index >= 5 ? '#f0f0f0' : 'inherit',
                    //borderTopLeftRadius: index === 0 ? '16px' : 0,
                    //borderTopRightRadius: index === 6 ? '16px' : 0,
                  }}
                >
                  {format(day, 'EEE, d')}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {timeSlots.map((slot, index) => (
              <TableRow key={index}>
                {/* <TableCell sx={styles.timeSlotCell}>{slot}</TableCell> */}
                {weekDays.map((day, dayIndex) => {
                  const appointment = getAppointmentForSlot(day, slot);
                  const isNonWorking = isNonWorkingSlot(day, slot);
                  const currentTime = new Date();
                  const slotDate = new Date(
                    `${format(day, 'yyyy-MM-dd')}T${slot}`
                  );
                  const isPast = isBefore(slotDate, currentTime);
                  const isCurrent =
                    isSameDay(slotDate, currentTime) &&
                    isAfter(currentTime, slotDate) &&
                    isBefore(currentTime, addMinutes(slotDate, 30));

                  return (
                    <TableCell
                      key={dayIndex}
                      sx={{
                        ...styles.tableCell,
                        border: '1px solid #d7dae0',
                        backgroundColor: dayIndex >= 5 ? '#f0f0f0' : 'inherit',
                        position: 'relative',
                        padding: '0',
                      }}
                    >
                      {isCurrent && (
                        <TimeIndicator
                          startHour={8}
                          endHour={20}
                        />
                      )}
                      {/* {appointment && (
                          <Box
                            sx={{
                              ...styles.appointmentBox,
                              backgroundColor: isPast ? '#d3d3d3' : '#1BBDD4',
                            }}
                          >
                            <Typography>{appointment.patientName}</Typography>
                            <Typography>
                              {appointment.appointmentDuration} mins
                            </Typography>
                          </Box>
                        )} */}
                      {/* {isNonWorking && (
                        <Box sx={styles.nonWorkingBox}>
                          <Typography>Non-working</Typography>
                        </Box>
                      )} */}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
