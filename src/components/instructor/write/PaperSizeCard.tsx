import { cn } from "@/lib/utils/cn";

const PAPER_SIZES = [
  { label: "A4", sizeClassName: "w-24 h-34.5" },
  { label: "국배판", sizeClassName: "w-19.75 h-27.5" },
  { label: "B5", sizeClassName: "w-19 h-27.5" },
  { label: "A5", sizeClassName: "w-15.25 h-21.5" },
];

const PaperSizeCard = () => {
  return (
    <div className="rounded-8 border-gray-20 flex w-fit items-end gap-2 border bg-white px-14.25 py-6.75">
      {PAPER_SIZES.map(({ label, sizeClassName }) => (
        <div
          key={label}
          className={cn(
            "border-gray-30 bg-gray-10 flex shrink-0 items-center justify-center border",
            sizeClassName,
          )}
        >
          <span className="text-caption2-m text-gray-80">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default PaperSizeCard;
