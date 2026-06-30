import { cn } from "@/shared/lib/utils/cn";

interface ToggleProps<T extends string> {
  options: [{ value: T; label: string }, { value: T; label: string }];
  value: T;
  onChange: (value: T) => void;
}

const Toggle = <T extends string>({ options, value, onChange }: ToggleProps<T>) => {
  const [left, right] = options;

  return (
    <div className="rounded-8 border-gray-40 bg-gray-5 inline-flex border">
      {[left, right].map(option => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-8 -m-px cursor-pointer border px-3 py-2 transition-colors duration-150 outline-none",
              isActive
                ? "border-main-main text-main-dark bg-white"
                : "text-gray-60 border-transparent",
            )}
          >
            <span className={isActive ? "text-body2-sb" : "text-body2-m"}>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Toggle;
