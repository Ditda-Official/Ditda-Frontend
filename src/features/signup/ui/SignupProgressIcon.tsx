import { cn } from "@/shared/lib/utils/cn";

type SignupProgressStep = 1 | 2 | 3;
type SignupProgressTotalSteps = 2 | 3;

type SignupProgressIconProps = {
  currentStep: SignupProgressStep;
  totalSteps: SignupProgressTotalSteps;
  className?: string;
};

const getStepCircleClassName = (step: number, currentStep: SignupProgressStep) => {
  if (step < currentStep) {
    return "border border-main-main bg-purple-10 text-main-main";
  }

  if (step === currentStep) {
    return "border border-transparent bg-main-main text-white";
  }

  return "border border-transparent bg-gray-30 text-gray-50";
};

const SignupProgressIcon = ({ currentStep, totalSteps, className }: SignupProgressIconProps) => {
  const visibleSteps = Array.from({ length: totalSteps }, (_, index) => index + 1);

  return (
    <div
      className={cn("inline-flex h-8 shrink-0 items-center", className)}
      aria-label={`회원가입 ${currentStep}/${totalSteps}단계`}
      role="img"
    >
      {visibleSteps.map((step, index) => {
        const isConnectorActive = step < currentStep;

        return (
          <div key={step} className="flex h-8 shrink-0 items-center">
            <span
              aria-hidden="true"
              className={cn(
                "text-heading3-sb flex size-8 shrink-0 items-center justify-center rounded-full",
                getStepCircleClassName(step, currentStep),
              )}
            >
              {step}
            </span>
            {index < visibleSteps.length - 1 && (
              <span
                aria-hidden="true"
                className={cn(
                  "h-0 w-5.25 shrink-0 border-t",
                  isConnectorActive ? "border-main-main" : "border-gray-40",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SignupProgressIcon;
