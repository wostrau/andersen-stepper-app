import { useState } from 'react';
import Button from '@mui/material/Button';

import './App.css';
import { Stepper } from './components/Stepper';

const STEPS = 5;
const startSTEP = 1;

function App() {
  const [currentStep, setCurrentStep] = useState(startSTEP);

  const handleNextStep = () => {
    if (currentStep < STEPS) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 1) return;
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      <Stepper
        steps={STEPS}
        activeStep={currentStep}
        goToPreviousStep={handlePrevStep}
      />
      <Button onClick={handleNextStep}>Next step</Button>
    </>
  );
}

export default App;
