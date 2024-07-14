import { format } from 'date-fns';
import { Box, Typography } from '@mui/material';
import { AppointmentSlotProps } from './AppointmentSlot.model';
import { styles } from './AppointmentSlot.styles';

export const AppointmentSlot: React.FC<AppointmentSlotProps> = ({
  slotsTime,
  appointment,
  isSelected,
  isPassed,
}) => {
  return (
    <Box
      sx={{
        ...styles.containerBox,
        ...(isPassed && styles.passedContainer),
        ...(isSelected && styles.selectedContainerBox),
      }}
    >
      <Box
        sx={{
          ...styles.verticalBar,
          ...(isPassed && styles.passedBarAndDot),
          ...(isSelected && styles.selectedBar),
        }}
      />
      <Box>
        <Typography
          sx={{
            ...styles.appointmentTitle,
            ...(isPassed && styles.passedTitleColor),
            ...(isSelected && styles.selectedTitleColor),
          }}
        >
          {appointment.patientName}
        </Typography>
        <Box sx={styles.appointmentInfo}>
          <Typography
            sx={{
              ...((isPassed || isSelected) && styles.passedInfoColor),
            }}
          >
            {format(slotsTime, 'HH:mm')}
          </Typography>
          <Box sx={styles.dividingDotContainer}>
            <Box
              sx={{
                ...styles.dividingDot,
                ...(isPassed && styles.passedBarAndDot),
                ...(isSelected && styles.selectedDot),
              }}
            />
          </Box>
          <Typography
            sx={{
              ...(isPassed && styles.passedInfoColor),
              ...(isSelected && styles.selectedInfoColor),
            }}
          >
            {appointment.duration} min
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
