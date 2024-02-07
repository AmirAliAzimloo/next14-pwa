"use client";
import { useState } from "react";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

interface RegisterFormProps<T> {
  locales: T;
}

const RegisterForm: React.FC<RegisterFormProps<{ [key: string]: string }>> = ({
  locales,
}) => {
  const [step, setStep] = useState<number>(2);
  const [stepOneDetails,setStepOneDetails]=useState({});


  return (
    <>
      <div>
          {step == 1 && (
            <StepOne
              locales={locales}
              setStep={setStep}
              setStepOneDetails={setStepOneDetails}
            />
          )}

          {step == 2 && (
            <StepTwo
              locales={locales}
              stepOneDetails={stepOneDetails}
            />
          )}
      
      </div>
    </>
  );
};

export default RegisterForm;
