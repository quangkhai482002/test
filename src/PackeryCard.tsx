import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
} from "@mui/material";

export default function MuiStepperExample() {
  const steps = ["Thông tin cơ bản", "Chi tiết", "Xác nhận"];
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <Box>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box>
        {activeStep === steps.length ? (
          <Typography>Hoàn thành!</Typography>
        ) : (
          <>
            <Typography>Bạn đang ở bước: {steps[activeStep]}</Typography>
            <Box>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Quay lại
              </Button>
              <Button variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Hoàn tất" : "Tiếp"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
