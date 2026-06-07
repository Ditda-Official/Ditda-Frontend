export type TagVariant = "default" | "black" | "gray";

const tagStyleMap: Record<TagVariant, string> = {
  default: "bg-red-bright text-red-main",
  black: "bg-transparent text-black",
  gray: "bg-gray-10 text-gray-80",
};

interface TagProps {
  variant: TagVariant;
  label: string;
}

const Tag = ({ variant, label }: TagProps) => {
  return (
    <div
      className={`rounded-4 text-body2-sb flex h-6.5 w-11 items-center justify-center ${tagStyleMap[variant]}`}
    >
      {label}
    </div>
  );
};

export default Tag;
