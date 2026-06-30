import { ExclamationMarkCircleIcon } from "@/shared/assets/icons";
import { cn } from "@/shared/lib/utils/cn";

interface ConceptLimitToastProps {
  message: string;
  show: boolean;
}

const ConceptLimitToast = ({ message, show }: ConceptLimitToastProps) => {
  return (
    <div
      className={cn(
        "rounded-8 bg-gray-90 text-body1-sb shadow-banner z-toast fixed top-4 left-[calc(50%+var(--sidebar-w,0)/2)] flex w-235 -translate-x-1/2 items-center gap-2.5 p-4 text-white transition-all duration-300",
        show ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
      )}
    >
      <ExclamationMarkCircleIcon className="size-5 shrink-0 text-white" />
      <span>{message}</span>
    </div>
  );
};

export default ConceptLimitToast;
