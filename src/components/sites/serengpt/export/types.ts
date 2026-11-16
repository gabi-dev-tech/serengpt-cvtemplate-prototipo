/** CV content, independent of any template. */
export type ResumeData = {
  name: string;
  title: string;
  /** Square image (PNG/JPEG); templates with a photo place it in their sidebar. */
  photo?: string;
  contact: { label: string; value: string }[];
  summary: string;
  experience: {
    role: string;
    company: string;
    location?: string;
    period: string;
    bullets: string[];
  }[];
  education: { degree: string; school: string; period: string }[];
  skills: string[];
  languages: { name: string; level: string }[];
  certifications: { name: string; year: string }[];
};

export type FontFamily = "Inter" | "Rubik" | "Lora";

/** One run of text with a single style. Sizes and spacing are in points. */
export type TextRun = {
  kind: "text";
  text: string;
  font: FontFamily;
  bold?: boolean;
  size: number;
  color: string;
  letterSpacing?: number;
  /** Editor only: path of the ResumeData value this run shows ("experience.0.bullets.1"). */
  field?: string;
  /** Editor only: selectable unit the run belongs to ("header", "summary", "experience.0", "skills.2"). */
  entry?: string;
  /** Editor only: hint shown while the field is empty (the run's text is then ""). */
  placeholder?: string;
};
export type Run = TextRun | { kind: "tab" };

/**
 * Layout blocks shared by the HTML preview and the .docx writer, so both render the same thing.
 * Every paragraph has a fixed line height (the .docx writes the multiple that gives exactly that height).
 * Indents are measured from the left edge of the block's column (or of the page for the top area).
 */
export type Block =
  | {
      kind: "paragraph";
      runs: Run[];
      lineHeight: number;
      spaceAfter: number;
      indentLeft: number;
      indentRight: number;
      align?: "left" | "center";
      /** Hanging indent: the runs before the first tab sit in the `hanging` pt left of indentLeft. */
      hanging?: number;
      /** Right-aligned tab stop at the column's right text edge. */
      rightTab?: boolean;
      keepNext?: boolean;
      /** Section the block belongs to ("header" for name/title/contact); used by the section organizer. */
      section?: string;
    }
  | {
      kind: "rule";
      thickness: number;
      color: string;
      spaceAfter: number;
      indentLeft: number;
      indentRight: number;
      keepNext?: boolean;
      section?: string;
    }
  | { kind: "spacer"; height: number };

/** A column of the page body, in visual order. */
export type Column = { role: "main" | "side"; x: number; width: number };

/** `top` spans the full page width on the first page only; `columns` follow the template's columns. */
export type Layout = { top: Block[]; columns: Block[][] };

/** Solid rectangle drawn behind the text, in page coordinates (pt). */
export type Rect = { x: number; y: number; w: number; h: number; color: string };

/** Pagination decided by the preview; the .docx breaks pages at the same places. */
export type PageAssignment = {
  /** Height (pt) of the full-width top area on page 1, including its last space after. */
  topHeight: number;
  /** columns[c][page] = indexes of the blocks of column c on that page. */
  columns: number[][][];
};
