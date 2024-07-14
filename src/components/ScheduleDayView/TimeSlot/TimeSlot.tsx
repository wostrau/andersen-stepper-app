import { TableCell } from '@mui/material';
import { TimeIndicator } from '../TimeIndicator';
import { TimeSlotProps } from './TimeSlot.model';
import { useTimeSlotStatus } from './TimeSlot.utils';
import { AppointmentSlot, NonWorkingSlot } from '../Slots/';
import { styles } from './TimeSlot.styles';

export const TimeSlot: React.FC<TimeSlotProps> = ({
  appointment,
  isNonWorkingSlot,
  onTimeSlotSelect,
  selectedTimeSlot,
  slotsTime,
}) => {
  const { isSlotRange, isPassedTime, isSelectedSlot, isSameDayAsCurrent } =
    useTimeSlotStatus(slotsTime, selectedTimeSlot);

  const handlerTimeSlotSelect = () => {
    if (!isPassedTime) {
      onTimeSlotSelect(slotsTime);
    }
  };

  return (
    <TableCell
      sx={styles.appointmentTableCellStyles}
      onClick={handlerTimeSlotSelect}
    >
      {isSameDayAsCurrent && isSlotRange && <TimeIndicator />}
      {appointment && (
        <AppointmentSlot
          slotsTime={slotsTime}
          appointment={appointment}
          isSelected={isSelectedSlot}
          isPassed={isPassedTime}
        />
      )}
      {isNonWorkingSlot && <NonWorkingSlot slotsTime={slotsTime} />}
    </TableCell>
  );
};
