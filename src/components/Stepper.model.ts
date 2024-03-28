export type StepperProps = {
  steps: number;
  activeStep: number;
  goToPreviousStep: () => void;
};