import { format } from 'date-fns';
import { Box, Typography } from '@mui/material';
import { styles } from './NonWorkingSlot.styles';

export const NonWorkingSlot: React.FC<{ slotsTime: Date }> = ({
  slotsTime,
}) => {
  return (
    <Box sx={styles.containerBox}>
      <Box>
        <Typography sx={styles.appointmentTitle}>Non-working</Typography>
        <Box sx={styles.appointmentInfo}>
          <Typography>{format(slotsTime, 'HH:mm')}</Typography>
          <Box sx={styles.dividingDotContainer}>
            <Box sx={styles.dividingDot} />
          </Box>
          <Typography>30 min</Typography>
        </Box>
      </Box>
    </Box>
  );
};
