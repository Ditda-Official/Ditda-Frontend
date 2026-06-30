import { ExclamationMarkCircleIcon } from "@/shared/assets/icons";
import { cn } from "@/shared/lib/utils/cn";

interface ToastProps {
  message: string;
  show: boolean;
  className?: string;
}

const Toast = ({ message, show, className }: ToastProps) => {
  return (
    <div
      className={cn(
        "rounded-8 bg-gray-90 text-body1-sb shadow-banner z-toast flex items-center gap-2.5 p-4 text-white transition-all duration-300",
        show ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        className,
      )}
    >
      <ExclamationMarkCircleIcon className="size-5 shrink-0 text-white" />
      <span>{message}</span>
    </div>
  );
};

export default Toast;
