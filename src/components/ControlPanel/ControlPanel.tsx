import React from 'react';
import { Box, Button } from '@mui/material';
import { ControlPanelProps } from './ControlPanel.model';
import { styles } from './ControlPanel.styles';

export const ControlPanel: React.FC<ControlPanelProps> = ({
  yearView,
  monthView,
  weekView,
  dayView,
  showYearView,
  showMonthView,
  showWeekView,
  showDayView,
  goPrev,
  goNext,
}) => {
  const handleGoPrevious = () => {
    if (yearView) {
      goPrev('year');
      return;
    }

    if (monthView) {
      goPrev('month');
      return;
    }

    if (weekView) {
      goPrev('week');
      return;
    }

    if (dayView) {
      goPrev('day');
      return;
    }
  };

  const handleGoNext = () => {
    if (yearView) {
      goNext('year');
      return;
    }

    if (monthView) {
      goNext('month');
      return;
    }

    if (weekView) {
      goNext('week');
      return;
    }

    if (dayView) {
      goNext('day');
      return;
    }
  };

  return (
    <Box sx={{ mb: 7 }}>
      <Button
        variant='outlined'
        sx={styles.btnStyles}
        onClick={handleGoPrevious}
      >
        GO PREVIOUS
      </Button>

      <Button
        variant='outlined'
        color='secondary'
        sx={{ marginRight: '8px' }}
        onClick={() => showYearView()}
      >
        SCHEDULE YEAR VIEW
      </Button>

      <Button
        variant='outlined'
        color='secondary'
        sx={{ marginRight: '8px' }}
        onClick={() => showMonthView()}
      >
        SCHEDULE MONTH VIEW
      </Button>

      <Button
        variant='outlined'
        color='secondary'
        sx={{ marginRight: '8px' }}
        onClick={() => showWeekView()}
      >
        SCHEDULE WEEK VIEW
      </Button>

      <Button
        variant='outlined'
        color='secondary'
        // sx={{ marginRight: '8px' }}
        onClick={() => showDayView()}
      >
        SCHEDULE DAY VIEW
      </Button>

      <Button
        variant='outlined'
        sx={styles.btnStyles}
        onClick={handleGoNext}
      >
        GO NEXT
      </Button>
    </Box>
  );
};
