import { cn } from "@/shared/lib/utils/cn";

interface InterviewIndicatorProps {
  total: number;
  current: number;
}

const InterviewIndicator = ({ total, current }: InterviewIndicatorProps) => {
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

export default InterviewIndicator;
