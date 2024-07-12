import { TableCell, Box, Typography } from '@mui/material';
import { isBefore, format } from 'date-fns';
import { TimeSlotProps } from './TimeSlot.model';
import { styles } from './TimeSlot.styles';
import { TimeIndicator } from '../TimeIndicator';

export const TimeSlot: React.FC<TimeSlotProps> = ({
  appointment,
  currentDay,
  nonWorkingSlot,
  onTimeSlotSelect,
  selectedTimeSlot,
  slotsTime,
}) => {
  const currentTime = new Date();
  const isPassed = isBefore(slotsTime, currentTime);
  console.log('isPassed >>>', isPassed);

  return (
    <TableCell sx={styles.appointmentTableCellStyles}>
      <TimeIndicator />
      <Box
        sx={{
          ...((appointment || nonWorkingSlot) && styles.appointmentBoxStyles),
          // ...(isPassed && styles.passedBoxStyles),
          ...(nonWorkingSlot && styles.nonWorkingBoxStyles),
        }}
      >
        {(appointment || nonWorkingSlot) && (
          <Box sx={styles.patientContainer}>
            <Box sx={{...styles.patientVerticalBar, ...(nonWorkingSlot && styles.nonWorkingVerticalBar)}} />
            <Box>
              {appointment && (
                <Box sx={styles.appointmentTitleStyles}>
                  {appointment.patientName}
                </Box>
              )}
              {nonWorkingSlot && (
                <Box sx={styles.appointmentTitleStyles}>
                  Non-working
                </Box>
              )}
              <Box>{format(slotsTime, 'HH:mm')} - 30 min</Box>
            </Box>
          </Box>
        )}
      </Box>
      {/* {nonWorkingSlot && <Box sx={styles.nonWorkingBoxStyles}>Non-working</Box>} */}
    </TableCell>
  );
};
