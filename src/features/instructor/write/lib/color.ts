export interface RgbaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export const toHex = ({ r, g, b }: RgbaColor) =>
  "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0").toUpperCase()).join("");

export const hexToRgb = (hex: string): Pick<RgbaColor, "r" | "g" | "b"> | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val));
