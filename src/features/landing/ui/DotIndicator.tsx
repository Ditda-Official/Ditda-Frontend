import { cn } from "@/shared/lib/utils/cn";

interface DotIndicatorProps {
  total: number;
  current: number;
}

const DotIndicator = ({ total, current }: DotIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={cn("size-2 rounded-full", i === current ? "bg-gray-60" : "bg-gray-40")}
        />
      ))}
    </div>
  );
};

export default DotIndicator;
