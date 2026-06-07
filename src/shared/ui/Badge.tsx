export type BadgeVariant = "3인" | "4인" | "5인" | "교재" | "pass" | "fail" | "waiting";

const badgeStyleMap: Record<BadgeVariant, { wrapper: string; text: string; label: string }> = {
  "3인": {
    wrapper: "rounded-4 w-fit px-2 bg-blue-bright",
    text: "text-body2-sb text-blue-main",
    label: "3인",
  },
  "4인": {
    wrapper: "rounded-4 w-fit px-2 bg-green-bright",
    text: "text-body2-sb text-green-main",
    label: "4인",
  },
  "5인": {
    wrapper: "rounded-4 w-fit px-2 bg-red-bright",
    text: "text-body2-sb text-red-main",
    label: "5인",
  },
  교재: {
    wrapper: "rounded-4 w-fit px-2 bg-purple-20",
    text: "text-body2-sb text-purple-60",
    label: "교재",
  },
  pass: {
    wrapper: "flex items-center justify-center rounded-32 w-14.5 px-3 py-1 bg-blue-bright",
    text: "text-caption1-m text-blue-main",
    label: "선정",
  },
  fail: {
    wrapper: "flex items-center justify-center rounded-32 w-14.5 px-3 py-1 bg-red-bright",
    text: "text-caption1-m text-red-main",
    label: "미선정",
  },
  waiting: {
    wrapper: "flex items-center justify-center rounded-32 w-14.5 px-3 py-1 bg-gray-10",
    text: "text-caption1-m text-gray-70",
    label: "대기중",
  },
};

interface BadgeProps {
  variant: BadgeVariant;
}

const Badge = ({ variant }: BadgeProps) => {
  const { wrapper, text, label } = badgeStyleMap[variant];
  return (
    <div className={`shrink-0 whitespace-nowrap ${wrapper}`}>
      <p className={text}>{label}</p>
    </div>
  );
};

export default Badge;
