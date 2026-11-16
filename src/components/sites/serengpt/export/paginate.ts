import type { Block } from "./types";

/** Space kept free at the bottom of every page, so content placed by the preview always fits in Word too. */
export const PAGE_SAFETY_PT = 6;

/**
 * Splits a column into pages the way Word does with these paragraph settings: every paragraph is
 * "keep lines together", headings are "keep with next", and space after a paragraph may run past the
 * bottom margin. `heights[i]` is the rendered height (pt) of block i without its space after.
 * The .docx then forces page breaks at exactly these places.
 */
export function paginate(blocks: Block[], heights: number[], firstPage: number, otherPages: number): number[][] {
  const after = (i: number) => (blocks[i].kind === "spacer" ? 0 : (blocks[i] as { spaceAfter: number }).spaceAfter);
  const keepNext = (i: number) => blocks[i].kind !== "spacer" && Boolean((blocks[i] as { keepNext?: boolean }).keepNext);

  const pages: number[][] = [[]];
  let limit = firstPage - PAGE_SAFETY_PT;
  let y = 0;
  for (let i = 0; i < blocks.length; i++) {
    // Height needed so this block and the chain of "keep with next" blocks after it stay together.
    let need = heights[i];
    for (let j = i; keepNext(j) && j + 1 < blocks.length; j++) need += after(j) + heights[j + 1];
    if (y > 0 && y + need > limit) {
      pages.push([]);
      y = 0;
      limit = otherPages - PAGE_SAFETY_PT;
    }
    pages[pages.length - 1].push(i);
    y += heights[i] + after(i);
  }
  return pages;
}
