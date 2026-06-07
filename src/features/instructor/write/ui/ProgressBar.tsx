import { WRITE_STEPS, WriteStep } from "@/features/instructor/write/config/write";

interface ProgressBarProps {
  currentStep?: WriteStep;
}

const ProgressBar = ({ currentStep = 1 }: ProgressBarProps) => {
  return (
    <div className="flex flex-row gap-3">
      {WRITE_STEPS.map(({ step, label, Icon }) => {
        const isActive = step === currentStep;

        return (
          <div key={step} className="flex flex-col gap-1">
            <div className="flex flex-row gap-1">
              <Icon className={`size-5 ${isActive ? "text-main-main" : "text-gray-50"}`} />
              <p className={`text-body2-sb ${isActive ? "text-gray-80" : "text-gray-60"}`}>
                {label}
              </p>
            </div>
            <div className={`h-1 w-36 ${isActive ? "bg-main-main" : "bg-gray-50"}`} />
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
