import type { FontFamily } from "./types";

/**
 * Page constants shared by every template. All measures are in points (1 pt = 20 twips = 4/3 CSS px).
 * Sizes are multiples of 0.5 pt and spacing multiples of 0.05 pt so Word's half-point and twip
 * units represent them exactly.
 */
export const page = { width: 595.3, height: 841.9 } as const;

/** Font files: static instances whose hhea/typo/win metrics were unified, so every renderer agrees. */
export const fontFiles: Record<FontFamily, { regular: string; bold: string }> = {
  Inter: { regular: "/sites/serengpt/export/fonts/Inter-Regular.ttf", bold: "/sites/serengpt/export/fonts/Inter-Bold.ttf" },
  Rubik: { regular: "/sites/serengpt/export/fonts/Rubik-Regular.ttf", bold: "/sites/serengpt/export/fonts/Rubik-Bold.ttf" },
  Lora: { regular: "/sites/serengpt/export/fonts/Lora-Regular.ttf", bold: "/sites/serengpt/export/fonts/Lora-Bold.ttf" },
};

/** CSS family names used by the preview (declared in export.css). */
export const cssFamily: Record<FontFamily, string> = {
  Inter: "SGX Inter",
  Rubik: "SGX Rubik",
  Lora: "SGX Lora",
};
