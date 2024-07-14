import { Box, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";
import { startOfWeek, addDays, isSameDay, format, isBefore, isAfter, addMinutes } from "date-fns";
import { useState, useMemo } from "react";
import { generateTimeSlots, getWeekDays } from "./helper";
import { useCurrentTimeIndicator } from "./RedLine.utils";
import { ScheduleWeekViewProps } from "./types";
import { styles } from "./styles";
import { RedLine } from "./RedLine";

export const ScheduleWeekView: React.FC<ScheduleWeekViewProps> = ({ appointments, selectedDay }) => {
  const startHour = 8;
  const endHour = 20;

  const [currentWeek, setCurrentWeek] = useState<Date>(selectedDay || new Date());

  const startOfCurrentWeek = useMemo(() => startOfWeek(currentWeek, { weekStartsOn: 1 }), [currentWeek]);
  // const endOfCurrentWeek = useMemo(() => endOfWeek(currentWeek, { weekStartsOn: 1 }), [currentWeek]);

  const weekDays = useMemo(() => getWeekDays(startOfCurrentWeek), [startOfCurrentWeek]);

  const timeSlots = useMemo(() => generateTimeSlots(startHour, endHour), [startHour, endHour]);

  const handlePreviousWeek = () => {
    setCurrentWeek(addDays(currentWeek, -7));
  };

  const handleNextWeek = () => {
    setCurrentWeek(addDays(currentWeek, 7));
  };

  const redLinePosition = useCurrentTimeIndicator(startHour, endHour);

  const getAppointmentForSlot = (day: Date, timeSlot: string) => {
    return appointments.find(app => isSameDay(app.appointmentDate, day) && app.appointmentTime === timeSlot);
  };

  const isNonWorkingSlot = (day: Date, timeSlot: string) => {
    const slotDate = new Date(`${format(day, 'yyyy-MM-dd')}T${timeSlot}`);
    return appointments.some(app => app.nonWorkingSlot && isSameDay(app.nonWorkingSlot, slotDate));
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button onClick={handlePreviousWeek}>Previous Week</Button>
        <Button onClick={handleNextWeek}>Next Week</Button>
      </Box>
      <TableContainer component={Paper} sx={styles.container}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderBottom: 'none' }}></TableCell>
              {weekDays.map((day, index) => (
                <TableCell
                  key={index}
                  sx={{
                    textAlign: 'center',
                    borderBottom: 'none',
                    backgroundColor: index >= 5 ? '#f0f0f0' : 'inherit',
                    borderTopLeftRadius: index === 0 ? '16px' : 0,
                    borderTopRightRadius: index === 6 ? '16px' : 0,
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
                <TableCell sx={styles.timeSlotCell}>{slot}</TableCell>
                {weekDays.map((day, dayIndex) => {
                  const appointment = getAppointmentForSlot(day, slot);
                  const isNonWorking = isNonWorkingSlot(day, slot);
                  const currentTime = new Date();
                  const slotDate = new Date(`${format(day, 'yyyy-MM-dd')}T${slot}`);
                  const isPast = isBefore(slotDate, currentTime);
                  const isCurrent = isSameDay(slotDate, currentTime) && isAfter(currentTime, slotDate) && isBefore(currentTime, addMinutes(slotDate, 30));

                  return (
                    <TableCell
                      key={dayIndex}
                      sx={{
                        ...styles.tableCell,
                        backgroundColor: index >= 5 ? '#f0f0f0' : 'inherit',
                        position: 'relative',
                      }}
                    >
                      {isCurrent && <RedLine topPosition={redLinePosition} />}
                      {appointment && (
                        <Box sx={{ ...styles.appointmentBox, backgroundColor: isPast ? '#d3d3d3' : '#1BBDD4' }}>
                          <Typography>{appointment.patientName}</Typography>
                          <Typography>{appointment.appointmentDuration} mins</Typography>
                        </Box>
                      )}
                      {isNonWorking && (
                        <Box sx={styles.nonWorkingBox}>
                          <Typography>Non-working</Typography>
                        </Box>
                      )}
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
