import { cn } from "@/shared/lib/utils/cn";

interface PageIndicatorProps {
  total: number;
  current: number;
  variant?: "home" | "my";
}

const PageIndicator = ({ total, current, variant = "home" }: PageIndicatorProps) => {
  return (
    <div className={cn("flex items-center", variant === "my" ? "gap-3" : "gap-2")}>
      {Array.from({ length: total }, (_, i) => {
        const active = i === current;

        return (
          <div
            key={i}
            className={cn(
              "transition-colors duration-300",
              variant === "my" ? "rounded-12 size-3" : "size-2 rounded-full",
              active ? (variant === "my" ? "bg-gray-90" : "bg-gray-70") : "bg-gray-30",
            )}
          />
        );
      })}
    </div>
  );
};

export default PageIndicator;
