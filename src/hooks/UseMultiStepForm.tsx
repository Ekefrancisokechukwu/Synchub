import { ReactElement, useState } from "react";

const UseMultiStepForm = (steps: ReactElement[]) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => {
      if (prev >= steps.length) return prev;
      return prev + 1;
    });
  };

  return {
    step: steps[currentStep],
    nextStep,
    isLastStep: currentStep === steps.length - 1,
  };
};

export default UseMultiStepForm;
