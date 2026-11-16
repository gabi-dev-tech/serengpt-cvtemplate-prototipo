import {
  AlignmentType,
  BorderStyle,
  Document,
  Header,
  type IParagraphOptions,
  HorizontalPositionRelativeFrom,
  ImageRun,
  LineRuleType,
  Paragraph,
  ShadingType,
  Tab,
  TabStopType,
  Table,
  TableBorders,
  TableCell,
  TableLayoutType,
  TableRow,
  TextRun,
  TextWrappingType,
  VerticalAlignTable,
  VerticalPositionRelativeFrom,
  WidthType,
} from "docx";
import { buildLayout, decorationsFor } from "./blocks";
import { solidPng } from "./png";
import { page } from "./spec";
import { columnsOf, embeddedFonts, fontsOf, type TemplateConfig } from "./templates";
import type { Block, FontFamily, PageAssignment, ResumeData } from "./types";

/** Binary files the writer embeds. Uint8Array works both in the browser and in Node. */
export type DocxAssets = {
  fonts: Partial<Record<FontFamily, { regular: Uint8Array; bold: Uint8Array }>>;
  photo?: Uint8Array;
};

const tw = (pt: number) => Math.round(pt * 20); // points -> twips
const px = (pt: number) => (pt * 4) / 3; // points -> 96-dpi pixels (docx image units)
const EMU_PER_PT = 12700;
const NO_BORDERS = TableBorders.NONE;

/**
 * Natural line height (ascent + descent, in em) of the embedded fonts; spec.ts fonts have hhea = typo = win,
 * set to the same values as Google's own copies (Google Docs uses those), e.g. Rubik 935/250.
 *
 * Line heights are written as "auto" (a multiple of this natural height) instead of "exactly": Word and
 * LibreOffice give the same height either way, but Google Docs has no exact spacing and reads an exact value
 * as a multiple (31 pt exactly became 2.58 lines), which blew up titles and turned the rules into thick bars.
 */
const NATURAL: Record<FontFamily, number> = { Inter: (2728 + 680) / 2816, Lora: 1.28, Rubik: (935 + 250) / 1000 };
/** Fillers (spacers, rules, empty paragraphs) use Inter, which is always embedded and has U+200B. */
const FILLER: FontFamily = "Inter";
const FILLER_FONT = { ascii: FILLER, hAnsi: FILLER, cs: FILLER, eastAsia: FILLER };

/** Height of the line that opens every page, taken from the top margin. */
const LEAD = 4; // Google Docs draws no line shorter than ~3 pt

/** `w:line` for an "auto" line that is `height` pt tall when its tallest font is `naturalPt` pt tall. */
const autoLine = (height: number, naturalPt: number) => Math.max(1, Math.round((240 * height) / naturalPt));

/**
 * An empty paragraph exactly `height` pt tall. It holds a zero-width space so Google Docs keeps the
 * run (and its size) instead of falling back to its 11 pt default.
 */
function filler(height: number, extra: Omit<IParagraphOptions, "children" | "spacing" | "run"> & { after?: number } = {}) {
  const { after = 0, ...rest } = extra;
  const size = Math.min(400, Math.max(1, Math.floor(height / NATURAL[FILLER]))); // keeps the multiple near 1
  const run = { font: FILLER_FONT, size: size * 2 };
  return new Paragraph({
    ...rest,
    spacing: { line: autoLine(height, NATURAL[FILLER] * size), lineRule: LineRuleType.AUTO, before: 0, after: tw(after) },
    run,
    children: [new TextRun({ text: "\u200B", ...run })],
  });
}

type Rule = Extract<Block, { kind: "rule" }>;

/** A rule that runs exactly under the paragraph before it is drawn as that paragraph's bottom border. */
const underlines = (p: Block, r: Block | undefined): r is Rule =>
  p.kind === "paragraph" && r?.kind === "rule" && r.indentLeft === p.indentLeft && r.indentRight === p.indentRight;

/** Word paragraphs for a column, merging each heading with the rule under it. */
function paragraphsOf(blocks: Block[], width: number): Paragraph[] {
  const out: Paragraph[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const next = blocks[i + 1];
    if (underlines(b, next)) {
      out.push(...paragraphsFor(b, width, next));
      i++;
    } else out.push(...paragraphsFor(b, width));
  }
  return out;
}

function paragraphsFor(block: Block, width: number, underline?: Rule): Paragraph[] {
  if (block.kind === "spacer") return [filler(block.height)];
  if (block.kind === "rule") {
    // A rule that is not under its heading (the short ones) is the top border of its own gap: one paragraph as
    // tall as the gap, at the rule's width. Google Docs draws no paragraph thinner than ~3 pt and paints shading
    // over the space after, so a filled 2 pt paragraph would come out thicker and lower.
    const indent = { left: tw(block.indentLeft), right: tw(block.indentRight) };
    if (block.spaceAfter >= 3) {
      return [
        filler(block.spaceAfter, {
          indent,
          border: { top: { style: BorderStyle.SINGLE, size: Math.round(block.thickness * 8), color: block.color, space: 0 } },
          keepNext: block.keepNext,
          keepLines: true,
        }),
      ];
    }
    const rule = filler(block.thickness, {
      indent,
      shading: { type: ShadingType.CLEAR, fill: block.color, color: "auto" },
      keepNext: block.keepNext,
      keepLines: true,
    });
    return block.spaceAfter > 0 ? [rule, filler(block.spaceAfter, { keepNext: block.keepNext })] : [rule];
  }

  const tabStops = [];
  if (block.hanging) tabStops.push({ type: TabStopType.LEFT, position: tw(block.indentLeft) });
  if (block.rightTab) tabStops.push({ type: TabStopType.RIGHT, position: tw(width - block.indentRight) });

  // The tallest font of the line sets its natural height; tabs and the paragraph mark copy it so they never add height.
  const texts = block.runs.filter((r) => r.kind === "text");
  const tallest = texts.reduce((a, r) => (NATURAL[r.font] * r.size > NATURAL[a.font] * a.size ? r : a), texts[0]);
  const markRun = { font: { ascii: tallest.font, hAnsi: tallest.font, cs: tallest.font, eastAsia: tallest.font }, size: Math.round(tallest.size * 2) };

  // Heading + rule: the border sits `spaceAfter` below the text (border padding, whole points) and the rule's gap
  // becomes the space after. Google Docs keeps a border's width, unlike a 0.75 pt paragraph (it draws those 3 pt tall).
  const border = underline
    ? { bottom: { style: BorderStyle.SINGLE, size: Math.round(underline.thickness * 8), color: underline.color, space: Math.round(block.spaceAfter) } }
    : undefined;
  return [new Paragraph({
    alignment: block.align === "center" ? AlignmentType.CENTER : AlignmentType.LEFT,
    spacing: {
      line: autoLine(block.lineHeight, NATURAL[tallest.font] * tallest.size),
      lineRule: LineRuleType.AUTO,
      before: 0,
      after: tw(underline ? underline.spaceAfter : block.spaceAfter),
    },
    border,
    run: markRun,
    indent: {
      left: tw(block.indentLeft),
      right: tw(block.indentRight),
      ...(block.hanging ? { hanging: tw(block.hanging) } : {}),
    },
    tabStops,
    keepLines: true,
    keepNext: block.keepNext,
    widowControl: false,
    children: block.runs.map((r) =>
      r.kind === "tab"
        ? new TextRun({ children: [new Tab()], ...markRun })
        : new TextRun({
            text: r.text,
            font: { ascii: r.font, hAnsi: r.font, cs: r.font, eastAsia: r.font },
            bold: Boolean(r.bold),
            size: Math.round(r.size * 2),
            color: r.color,
            characterSpacing: r.letterSpacing ? tw(r.letterSpacing) : undefined,
            kern: 1,
            language: { value: "es-ES" },
          }),
    ),
  })];
}

function pageImage(data: Uint8Array, x: number, y: number, w: number, h: number, zIndex: number) {
  return new ImageRun({
    type: "png",
    data,
    transformation: { width: px(w), height: px(h) },
    floating: {
      horizontalPosition: { relative: HorizontalPositionRelativeFrom.PAGE, offset: Math.round(x * EMU_PER_PT) },
      verticalPosition: { relative: VerticalPositionRelativeFrom.PAGE, offset: Math.round(y * EMU_PER_PT) },
      behindDocument: true,
      allowOverlap: true,
      wrap: { type: TextWrappingType.NONE },
      // Explicit stacking: without it the library derives z-order from the image height.
      zIndex,
    },
  });
}

/** Header paragraph holding the page's anchored pictures; it takes 1 pt of height. */
function headerWith(images: ImageRun[]) {
  const run = { font: FILLER_FONT, size: 2 };
  return new Header({
    children: [
      new Paragraph({
        spacing: { line: autoLine(1, NATURAL[FILLER]), lineRule: LineRuleType.AUTO, before: 0, after: 0 },
        run,
        children: [...images, new TextRun({ text: "\u200B", ...run })],
      }),
    ],
  });
}

/**
 * Builds the .docx of a CV for a template. `pages` is the preview's pagination: every page becomes its
 * own section, so Word breaks pages exactly where the preview does instead of re-paginating.
 */
export function buildResumeDocx(data: ResumeData, t: TemplateConfig, assets: DocxAssets, pages: PageAssignment) {
  const layout = buildLayout(data, t);
  const cols = columnsOf(t);
  const pngCache = new Map<string, Uint8Array>();
  const png = (hex: string) => {
    if (!pngCache.has(hex)) pngCache.set(hex, solidPng(hex));
    return pngCache.get(hex)!;
  };

  const headerFor = (p: number) => {
    const { rects, photo } = decorationsFor(t, p, pages.topHeight);
    const images = rects.map((r, i) => pageImage(png(r.color), r.x, r.y, r.w, r.h, i + 1));
    if (photo && assets.photo) images.push(pageImage(assets.photo, photo.x, photo.y, photo.size, photo.size, rects.length + 1));
    return headerWith(images);
  };

  const cell = (blocks: Block[], width: number, columnSpan?: number) =>
    new TableCell({
      width: { size: tw(width), type: WidthType.DXA },
      columnSpan,
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
      borders: NO_BORDERS,
      verticalAlign: VerticalAlignTable.TOP,
      // A cell needs at least one paragraph.
      children: blocks.length ? paragraphsOf(blocks, width) : [filler(1)],
    });

  const pageCount = Math.max(1, ...pages.columns.map((c) => c.length));
  const pageProps = {
    size: { width: tw(page.width), height: tw(page.height) },
    margin: { top: tw(t.margins.top - LEAD), bottom: tw(t.margins.bottom), left: 0, right: 0, header: 0, footer: 0, gutter: 0 },
  };

  const sections = Array.from({ length: pageCount }, (_, p) => {
    const rows: TableRow[] = [];
    if (p === 0 && layout.top.length) rows.push(new TableRow({ children: [cell(layout.top, page.width, cols.length)] }));
    rows.push(
      new TableRow({
        cantSplit: false,
        children: cols.map((c, ci) => cell((pages.columns[ci][p] ?? []).map((i) => layout.columns[ci][i]), c.width)),
      }),
    );
    const header = headerFor(p);
    return {
      properties: { titlePage: p === 0, page: pageProps },
      headers: p === 0 ? { first: header, default: headerFor(1) } : { default: header },
      children: [
        // Google Docs cannot start a document with a table and would insert an 11 pt line above it,
        // so every page starts with a 1 pt line of our own (the top margin is 1 pt smaller to match).
        filler(LEAD),
        new Table({
          width: { size: tw(page.width), type: WidthType.DXA },
          columnWidths: cols.map((c) => tw(c.width)),
          layout: TableLayoutType.FIXED,
          borders: NO_BORDERS,
          margins: { top: 0, bottom: 0, left: 0, right: 0 },
          rows,
        }),
        // Word needs a paragraph after a table (it also carries the section break); keep it 1 pt tall.
        filler(1),
      ],
    };
  });

  return new Document({
    creator: "SerenGPT",
    title: `CV ${data.name}`,
    fonts: embeddedFonts(t)
      .filter((f) => assets.fonts[f])
      .map((name) => ({
        name,
        // docx types these as Buffer; it only reads bytes, so a Uint8Array works in the browser too.
        data: assets.fonts[name]!.regular as Buffer,
        bold: assets.fonts[name]!.bold as Buffer,
      })),
    styles: {
      default: {
        document: {
          run: { font: fontsOf(t)[0], size: 18 },
          paragraph: { spacing: { before: 0, after: 0 } },
        },
      },
    },
    sections,
  });
}
