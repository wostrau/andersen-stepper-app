import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';

import { stepper } from './Stepper.styles';
import { StepperProps } from './Stepper.model';

export const Stepper: React.FC<StepperProps> = ({
  activeStep = 1,
  steps = 5,
  goToPreviousStep,
}) => {
  return (
    <Box sx={stepper.stepperContainer}>
      <Button
        sx={stepper.stepperButton}
        onClick={goToPreviousStep}
      >
        <KeyboardArrowLeft />
        <Typography sx={stepper.stepperTypography}>Back</Typography>
      </Button>

      <Typography sx={stepper.stepperTypography}>
        Step {activeStep} of {steps}
      </Typography>
    </Box>
  );
};
