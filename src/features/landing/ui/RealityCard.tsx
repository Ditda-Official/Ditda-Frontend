import { cn } from "@/shared/lib/utils/cn";

interface RealityCardProps {
  highlight: React.ReactNode;
  title: string;
  description: React.ReactNode;
  color: "red" | "purple";
  active?: boolean;
}

const RealityCard = ({ highlight, title, description, color, active }: RealityCardProps) => {
  return (
    <div
      className={cn(
        "rounded-17 flex h-43.25 w-62.25 flex-col border bg-white px-9.5 py-5.25 transition-all duration-300",
        active ? "border-red-main shadow-lg" : "border-main-bright",
      )}
    >
      <span
        className={cn(
          "text-[30px] leading-[140%] font-semibold tracking-[-0.6px]",
          color === "red" ? "text-red-main" : "text-purple-60",
        )}
      >
        {highlight}
      </span>
      <span className="text-gray-90 text-heading1-sb pb-4.25 whitespace-nowrap">{title}</span>
      <p className="text-gray-70 text-heading3-m whitespace-nowrap">{description}</p>
    </div>
  );
};

export default RealityCard;
