import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@mui/material/Button';

import '../App.css';
import { AuthContext } from '../context/AuthContext';
import { Stepper } from '../components/Stepper/Stepper';
import { AuthContextType } from '../context/AuthContext.model';

const STEPS = 5;
const startSTEP = 1;

export const StepperPage = () => {
  const { authData, updateAuthData } = useContext<AuthContextType>(AuthContext);

  const { handleSubmit } = useForm();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const onSubmit = () => {
    updateAuthData(email, password);

    handleNextStep();
  };

  console.log(authData); //!

  return (
    <>
      <Stepper
        steps={STEPS}
        activeStep={currentStep}
        goToPreviousStep={handlePrevStep}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <label htmlFor='email'>Email:</label>
          </div>
          <input
            id='email'
            name='email'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div>
          <div>
            <label htmlFor='password'>Password:</label>
          </div>
          <input
            id='password'
            name='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <Button
          variant='contained'
          type='submit'
          sx={{ marginTop: '16px' }}
        >
          Next step
        </Button>
      </form>
    </>
  );
};
