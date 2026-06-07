import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-title1-b",
        "text-title2-b",
        "text-title2-sb",
        "text-heading1-sb",
        "text-heading2-sb",
        "text-heading2-m",
        "text-heading3-sb",
        "text-heading3-m",
        "text-body1-sb",
        "text-body1-m",
        "text-body2-sb",
        "text-body2-m",
        "text-body2-r",
        "text-caption1-sb",
        "text-caption1-m",
        "text-caption1-r",
        "text-caption2-sb",
        "text-caption2-m",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
