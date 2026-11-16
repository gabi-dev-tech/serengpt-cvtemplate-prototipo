import type { SectionKey, TemplateConfig, TextStyle } from "../export/templates";
import type { FontFamily } from "../export/types";

/** "Diseño y Fuente" settings. Every default reproduces the template exactly as designed. */
export type Design = {
  /** Index into MARGIN_STEPS. */
  margins: number;
  /** Index into SECTION_STEPS. */
  sectionGap: number;
  /** Index into SIZE_STEPS. */
  size: number;
  /** Index into LINE_STEPS. */
  line: number;
  /** Accent color (hex without #); null keeps the template's own. */
  color: string | null;
  /** One font for the whole CV; null keeps the template's pairing. */
  font: FontFamily | null;
};

/** Everything the user changes on top of a template, saved with the CV. */
export type Custom = {
  design: Design;
  /** Colors added with "+". */
  customColors: string[];
  /** Section order per template id (templates have different columns). */
  sections: Record<string, TemplateConfig["sections"]>;
};

export const MARGIN_STEPS = [0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8];
export const SECTION_STEPS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
export const SIZE_STEPS = [
  { factor: 0.9, label: "Muy pequeño" },
  { factor: 0.95, label: "Pequeño" },
  { factor: 1, label: "Mediano" },
  { factor: 1.05, label: "Grande" },
  { factor: 1.1, label: "Muy grande" },
];
export const LINE_STEPS = [0.9, 0.95, 1, 1.05, 1.1, 1.15, 1.2];
export const FONTS: FontFamily[] = ["Inter", "Rubik", "Lora"];

/** Ten preset accent colors, like the reference editor's palette. */
export const PALETTE = ["1A73E8", "5F6368", "1E8E5A", "D93F0B", "4A90E2", "3F51B5", "F57C00", "8E24AA", "00A3AD", "C08A1E"];

export const defaultDesign: Design = { margins: 2, sectionGap: 2, size: 2, line: 2, color: null, font: null };
export const defaultCustom: Custom = { design: defaultDesign, customColors: [], sections: {} };

/**
 * Which colors of each template follow the accent. `main` is replaced by the chosen color; `tints` and
 * `shades` are lighter/darker versions of it, so they are recomputed from the new color with the same ratio.
 * Only accent-bearing fields change (titles, headings, rules, company names, bullets, bands, strips…).
 */
const ACCENTS: Record<string, { main: string; tints?: string[]; shades?: string[] }> = {
  "dos-columnas": { main: "2BB3A3" },
  clasico: { main: "111111" },
  minimalista: { main: "6B7280", tints: ["9CA3AF"] },
  moderno: { main: "3B4CCA", tints: ["D7DCFF"] },
  "barra-derecha": { main: "1D7A5F", tints: ["BFD9CF", "EEF3F1"] },
  "linea-de-tiempo": { main: "D9682A", tints: ["F2C8A6"] },
  multicolumna: { main: "6D4AFF", tints: ["D9D3F5"] },
  academico: { main: "1A2B4A" },
  creativo: { main: "E4573D", tints: ["FFE1DA"] },
  ejecutivo: { main: "B7862C", tints: ["E7DCC5"], shades: ["8A6420"] },
};

export const accentOf = (t: TemplateConfig) => ACCENTS[t.id]?.main ?? t.style.meta.accent;

const rgb = (hex: string) => [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
const hex = (c: number[]) => c.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("").toUpperCase();
const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);

function recolor(value: string | undefined, spec: (typeof ACCENTS)[string], next: string): string | undefined {
  if (!value) return value;
  const v = value.toUpperCase();
  const main = rgb(spec.main);
  const to = rgb(next);
  if (v === spec.main) return next;
  if (spec.tints?.includes(v)) {
    const k = mean(rgb(v).flatMap((c, i) => (main[i] < 255 ? [(c - main[i]) / (255 - main[i])] : [])));
    return hex(to.map((c) => c + (255 - c) * k));
  }
  if (spec.shades?.includes(v)) {
    const k = mean(rgb(v).flatMap((c, i) => (main[i] > 0 ? [1 - c / main[i]] : [])));
    return hex(to.map((c) => c * (1 - k)));
  }
  return value;
}

/** Sizes go to half points and spacing to 0.05 pt, the precision of the .docx, so preview and file match. */
const half = (v: number) => Math.round(v * 2) / 2;
const twip = (v: number) => Math.round(v * 20) / 20;

/** The template with the user's section order and design applied; the CV engine only ever sees this. */
export function customize(t: TemplateConfig, c: Custom): TemplateConfig {
  const d = c.design;
  const f = SIZE_STEPS[d.size]?.factor ?? 1;
  const g = LINE_STEPS[d.line] ?? 1;
  const m = MARGIN_STEPS[d.margins] ?? 1;
  const sg = SECTION_STEPS[d.sectionGap] ?? 1;
  const spec = ACCENTS[t.id];
  const col = (v: string) => (d.color && spec ? (recolor(v, spec, d.color) ?? v) : v);

  const ts = <T extends TextStyle>(s: T, accentField = false): T => ({
    ...s,
    font: d.font ?? s.font,
    size: half(s.size * f),
    line: twip(s.line * f * g),
    ...(s.spacing ? { spacing: twip(s.spacing * f) } : {}),
    ...(accentField ? { color: col(s.color) } : {}),
  });
  const S = t.style;
  const pad = (p: [number, number]): [number, number] => [half(p[0] * m), half(p[1] * m)];

  return {
    ...t,
    margins: { top: half(t.margins.top * m), bottom: half(t.margins.bottom * m) },
    pad: { main: pad(t.pad.main), side: pad(t.pad.side), top: pad(t.pad.top) },
    band: t.band && { ...t.band, color: col(t.band.color) },
    topStrip: t.topStrip && { ...t.topStrip, color: col(t.topStrip.color) },
    sidebarColor: t.sidebarColor && col(t.sidebarColor),
    divider: t.divider && { ...t.divider, color: col(t.divider.color) },
    rail: t.rail && { ...t.rail, color: col(t.rail.color) },
    style: {
      name: { ...ts(S.name), after: half(S.name.after * f) },
      title: { ...ts(S.title, true), after: half(S.title.after * f) },
      contact: { ...ts(S.contact), after: half(S.contact.after * f) },
      heading: { ...ts(S.heading, true), after: half(S.heading.after * f) },
      sideHeading: { ...ts(S.sideHeading, true), after: half(S.sideHeading.after * f) },
      rule: { ...S.rule, color: col(S.rule.color), sideColor: col(S.rule.sideColor) },
      body: ts(S.body),
      role: ts(S.role),
      meta: { ...ts(S.meta), accent: col(S.meta.accent) },
      bullet: { ...ts(S.bullet), hanging: half(S.bullet.hanging * f), after: S.bullet.after, glyphColor: col(S.bullet.glyphColor) },
      side: { text: ts(S.side.text), muted: S.side.muted, label: ts(S.side.label, true) },
    },
    gaps: { ...t.gaps, section: half(t.gaps.section * sg), sideSection: half(t.gaps.sideSection * sg) },
    timelineGutter: half(t.timelineGutter * f),
    sections: c.sections[t.id] ?? t.sections,
  };
}

/** Sections a template can show (contact is part of the header when the template writes it inline). */
export function availableSections(t: TemplateConfig): SectionKey[] {
  const all: SectionKey[] = ["contact", "summary", "experience", "education", "skills", "languages", "certifications"];
  return t.header.contactInline ? all.filter((k) => k !== "contact") : all;
}
