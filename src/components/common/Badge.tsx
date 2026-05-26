type BadgeSize = "3인" | "4인" | "5인";

const sizeStyleMap: Record<BadgeSize, { bg: string; text: string }> = {
  "3인": { bg: "bg-blue-bright", text: "text-blue-main" },
  "4인": { bg: "bg-green-bright", text: "text-green-main" },
  "5인": { bg: "bg-red-bright", text: "text-red-main" },
};

interface BadgeProps {
  size: BadgeSize;
}

const Badge = ({ size }: BadgeProps) => {
  const { bg, text } = sizeStyleMap[size];

  return (
    <div className={`rounded-4 w-fit px-2 ${bg}`}>
      <p className={`text-body2-sb ${text}`}>{size}</p>
    </div>
  );
};

export default Badge;
