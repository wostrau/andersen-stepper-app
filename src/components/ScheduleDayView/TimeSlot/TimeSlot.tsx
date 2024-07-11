import { TableCell, Box, Typography } from '@mui/material';
import { isBefore, format } from 'date-fns';
import { TimeSlotProps } from './TimeSlot.model';
import { styles } from './TimeSlot.styles';

export const TimeSlot: React.FC<TimeSlotProps> = ({
  appointment,
  currentDay,
  nonWorkingSlot,
  onTimeSlotSelect,
  selectedTimeSlot,
  slotsTime,
}) => {
  const currentTime = new Date();
  const isPassed = isBefore(slotsTime, currentTime)

  return (
    <TableCell sx={styles.appointmentTableCellStyles}>
      {appointment ? (
        <Box
          sx={{...styles.appointmentBoxStyles,
            ...(isPassed && styles.passedBoxStyles)
          }}
        >
          <Typography>{appointment.patientName}</Typography>
          <Typography>
            {/* {format(appointment.time, 'HH:mm')} - {appointment.duration} */}
            {slotsTime} - '30 min'
          </Typography>
        </Box>
      ) : (
        <Box sx={styles.nonWorkingBoxStyles}>Non-working</Box>
      )}
    </TableCell>
  );
};
