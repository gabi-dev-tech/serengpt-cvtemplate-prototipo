import { page } from "./spec";
import type { Column, FontFamily } from "./types";

export type TextStyle = { font: FontFamily; bold?: boolean; size: number; line: number; spacing?: number; color: string };
export type SectionKey = "contact" | "summary" | "experience" | "education" | "skills" | "languages" | "certifications";

/** A SerenGPT CV template: geometry, decorations and typography, all in points. */
export type TemplateConfig = {
  id: string;
  name: string;
  /** One line shown in the template picker. */
  summary: string;
  layout: "single" | "sidebar-left" | "sidebar-right";
  sidebarWidth: number;
  margins: { top: number; bottom: number };
  /** Left/right text padding inside each column (and for the full-width top area). */
  pad: { main: [number, number]; side: [number, number]; top: [number, number] };
  /** Name/title/contact go at the top of the main column, or in a full-width area on page 1. */
  header: { placement: "main" | "top"; align: "left" | "center"; contactInline: boolean };
  /** Colored band behind the full-width top area (page 1). */
  band?: { color: string; padBottom: number };
  /** Thin colored strip at the top edge of every page. */
  topStrip?: { color: string; height: number };
  sidebarColor?: string;
  /** Vertical line between the two columns. */
  divider?: { color: string; thickness: number };
  /** Vertical rail for timeline entries. */
  rail?: { color: string; thickness: number; offset: number };
  /** Photo, centered in the sidebar on page 1. */
  photo?: { size: number; top: number; gapBelow: number };
  style: {
    name: TextStyle & { after: number };
    title: TextStyle & { after: number };
    contact: TextStyle & { after: number };
    heading: TextStyle & { uppercase: boolean; after: number };
    sideHeading: TextStyle & { uppercase: boolean; after: number };
    rule: { kind: "full" | "short" | "none"; color: string; sideColor: string; thickness: number; after: number; shortWidth: number };
    body: TextStyle;
    role: TextStyle;
    meta: TextStyle & { accent: string };
    bullet: TextStyle & { hanging: number; after: number; glyphColor: string };
    side: { text: TextStyle; muted: string; label: TextStyle };
  };
  gaps: { section: number; entry: number; sideSection: number; contact: number };
  entry: "standard" | "timeline";
  timelineGutter: number;
  sections: { main: SectionKey[]; side: SectionKey[] };
};

/** Columns in visual order. */
export function columnsOf(t: TemplateConfig): Column[] {
  const W = page.width;
  const S = t.sidebarWidth;
  if (t.layout === "single") return [{ role: "main", x: 0, width: W }];
  if (t.layout === "sidebar-left")
    return [
      { role: "side", x: 0, width: S },
      { role: "main", x: S, width: W - S },
    ];
  return [
    { role: "main", x: 0, width: W - S },
    { role: "side", x: W - S, width: S },
  ];
}

export const contentHeight = (t: TemplateConfig) => page.height - t.margins.top - t.margins.bottom;

// ---------------------------------------------------------------------------------------------
// Templates. Each is an original SerenGPT design; together they cover the usual CV layout types
// (sidebar, single column, classic, minimal, header band, timeline, two columns, academic…).
// ---------------------------------------------------------------------------------------------

const ink = "1F2933";
const gray = "5B6672";

/** "SerenGPT · Dos columnas": the first template (unchanged). */
const dosColumnas: TemplateConfig = {
  id: "dos-columnas",
  name: "Dos columnas",
  summary: "Barra lateral oscura con foto y datos de contacto.",
  layout: "sidebar-left",
  sidebarWidth: 190,
  margins: { top: 36, bottom: 36 },
  pad: { main: [30, 34], side: [22, 20], top: [30, 34] },
  header: { placement: "main", align: "left", contactInline: false },
  sidebarColor: "1E2A3A",
  photo: { size: 104, top: 40, gapBelow: 20 },
  style: {
    name: { font: "Rubik", bold: true, size: 26, line: 32, color: ink, after: 2 },
    title: { font: "Rubik", size: 12.5, line: 17, spacing: 0.2, color: "2BB3A3", after: 14 },
    contact: { font: "Inter", size: 8.5, line: 12.5, color: gray, after: 14 },
    heading: { font: "Rubik", bold: true, size: 10.5, line: 14, spacing: 1.2, color: ink, uppercase: true, after: 3 },
    sideHeading: { font: "Rubik", bold: true, size: 9.5, line: 13, spacing: 1.4, color: "E6EBF2", uppercase: true, after: 3 },
    rule: { kind: "full", color: "2BB3A3", sideColor: "2BB3A3", thickness: 1, after: 8, shortWidth: 36 },
    body: { font: "Inter", size: 9, line: 13.5, color: ink },
    role: { font: "Inter", bold: true, size: 10, line: 14, color: ink },
    meta: { font: "Inter", size: 8.5, line: 12.5, color: gray, accent: "2BB3A3" },
    bullet: { font: "Inter", size: 8.5, line: 12.5, color: ink, hanging: 9, after: 1.5, glyphColor: "2BB3A3" },
    side: {
      text: { font: "Inter", size: 8.5, line: 12.5, color: "E6EBF2" },
      muted: "9FB0C4",
      label: { font: "Inter", bold: true, size: 7, line: 10, spacing: 0.6, color: "9FB0C4" },
    },
  },
  gaps: { section: 12, entry: 8, sideSection: 14, contact: 6 },
  entry: "standard",
  timelineGutter: 0,
  sections: {
    main: ["summary", "experience", "education"],
    side: ["contact", "skills", "languages", "certifications"],
  },
};

type Overrides = Omit<Partial<TemplateConfig>, "style"> & { style?: Partial<TemplateConfig["style"]> };
const make = (o: Overrides): TemplateConfig => ({
  ...dosColumnas,
  ...o,
  style: { ...dosColumnas.style, ...o.style },
  gaps: { ...dosColumnas.gaps, ...o.gaps },
});

/** Text styles for templates whose sidebar is light (dark text). */
const lightSide = (accent: string, font: FontFamily = "Inter"): TemplateConfig["style"]["side"] => ({
  text: { font, size: 8.5, line: 12.5, color: ink },
  muted: gray,
  label: { font, bold: true, size: 7, line: 10, spacing: 0.6, color: accent },
});

const singleSections: TemplateConfig["sections"] = {
  main: ["summary", "experience", "education", "skills", "languages", "certifications"],
  side: [],
};

const clasico = make({
  id: "clasico",
  name: "Clásico",
  summary: "Una columna con tipografía serif y encabezado centrado.",
  layout: "single",
  sidebarColor: undefined,
  photo: undefined,
  margins: { top: 46, bottom: 40 },
  pad: { main: [56, 56], side: [0, 0], top: [56, 56] },
  header: { placement: "top", align: "center", contactInline: true },
  style: {
    name: { font: "Lora", bold: true, size: 24, line: 30, color: "111111", after: 2 },
    title: { font: "Lora", size: 12, line: 16, color: "444444", after: 6 },
    contact: { font: "Lora", size: 8.5, line: 12.5, color: "444444", after: 16 },
    heading: { font: "Lora", bold: true, size: 10.5, line: 14, spacing: 1, color: "111111", uppercase: true, after: 3 },
    sideHeading: dosColumnas.style.sideHeading,
    rule: { kind: "full", color: "111111", sideColor: "111111", thickness: 0.75, after: 7, shortWidth: 36 },
    body: { font: "Lora", size: 9.5, line: 14, color: "222222" },
    role: { font: "Lora", bold: true, size: 10, line: 14, color: "111111" },
    meta: { font: "Lora", size: 9, line: 13, color: "555555", accent: "555555" },
    bullet: { font: "Lora", size: 9, line: 13, color: "222222", hanging: 10, after: 1.5, glyphColor: "111111" },
    side: lightSide("111111", "Lora"),
  },
  sections: singleSections,
});

const minimalista = make({
  id: "minimalista",
  name: "Minimalista",
  summary: "Una columna limpia, sin adornos y con mucho aire.",
  layout: "single",
  sidebarColor: undefined,
  photo: undefined,
  margins: { top: 54, bottom: 44 },
  pad: { main: [64, 64], side: [0, 0], top: [64, 64] },
  header: { placement: "top", align: "left", contactInline: true },
  style: {
    name: { font: "Inter", bold: true, size: 22, line: 28, color: "16191D", after: 2 },
    title: { font: "Inter", size: 11, line: 15, color: "6B7280", after: 6 },
    contact: { font: "Inter", size: 8.5, line: 12.5, color: "6B7280", after: 22 },
    heading: { font: "Inter", bold: true, size: 8, line: 12, spacing: 1.6, color: "6B7280", uppercase: true, after: 8 },
    sideHeading: dosColumnas.style.sideHeading,
    rule: { kind: "none", color: "6B7280", sideColor: "6B7280", thickness: 0, after: 0, shortWidth: 0 },
    body: { font: "Inter", size: 9, line: 14, color: "16191D" },
    role: { font: "Inter", bold: true, size: 9.5, line: 14, color: "16191D" },
    meta: { font: "Inter", size: 8.5, line: 13, color: "6B7280", accent: "6B7280" },
    bullet: { font: "Inter", size: 8.5, line: 13, color: "16191D", hanging: 10, after: 1.5, glyphColor: "9CA3AF" },
    side: lightSide("6B7280"),
  },
  gaps: { section: 18, entry: 10, sideSection: 14, contact: 6 },
  sections: singleSections,
});

const moderno = make({
  id: "moderno",
  name: "Moderno",
  summary: "Banda de color con el nombre y una columna amplia.",
  layout: "single",
  sidebarColor: undefined,
  photo: undefined,
  margins: { top: 40, bottom: 40 },
  pad: { main: [48, 48], side: [0, 0], top: [48, 48] },
  header: { placement: "top", align: "left", contactInline: true },
  band: { color: "3B4CCA", padBottom: 22 },
  style: {
    name: { font: "Rubik", bold: true, size: 26, line: 32, color: "FFFFFF", after: 2 },
    title: { font: "Rubik", size: 12.5, line: 17, color: "D7DCFF", after: 8 },
    contact: { font: "Inter", size: 8.5, line: 12.5, color: "EEF0FF", after: 46 },
    heading: { font: "Rubik", bold: true, size: 11, line: 15, spacing: 0.8, color: "3B4CCA", uppercase: true, after: 3 },
    sideHeading: dosColumnas.style.sideHeading,
    rule: { kind: "short", color: "3B4CCA", sideColor: "3B4CCA", thickness: 2, after: 9, shortWidth: 28 },
    body: { font: "Inter", size: 9, line: 13.5, color: ink },
    role: { font: "Inter", bold: true, size: 10, line: 14, color: ink },
    meta: { font: "Inter", size: 8.5, line: 12.5, color: gray, accent: "3B4CCA" },
    bullet: { font: "Inter", size: 8.5, line: 12.5, color: ink, hanging: 9, after: 1.5, glyphColor: "3B4CCA" },
    side: lightSide("3B4CCA"),
  },
  sections: singleSections,
});

const barraDerecha = make({
  id: "barra-derecha",
  name: "Barra derecha",
  summary: "Contenido a la izquierda y barra clara con foto a la derecha.",
  layout: "sidebar-right",
  sidebarWidth: 182,
  sidebarColor: "EEF3F1",
  photo: { size: 96, top: 40, gapBelow: 18 },
  pad: { main: [38, 26], side: [20, 22], top: [38, 26] },
  style: {
    name: { font: "Rubik", bold: true, size: 25, line: 31, color: ink, after: 2 },
    title: { font: "Rubik", size: 12.5, line: 17, color: "1D7A5F", after: 14 },
    contact: dosColumnas.style.contact,
    heading: { font: "Rubik", bold: true, size: 10.5, line: 14, spacing: 1.2, color: "1D7A5F", uppercase: true, after: 3 },
    sideHeading: { font: "Rubik", bold: true, size: 9.5, line: 13, spacing: 1.4, color: "1D7A5F", uppercase: true, after: 3 },
    rule: { kind: "full", color: "BFD9CF", sideColor: "BFD9CF", thickness: 1, after: 8, shortWidth: 36 },
    body: dosColumnas.style.body,
    role: dosColumnas.style.role,
    meta: { font: "Inter", size: 8.5, line: 12.5, color: gray, accent: "1D7A5F" },
    bullet: { font: "Inter", size: 8.5, line: 12.5, color: ink, hanging: 9, after: 1.5, glyphColor: "1D7A5F" },
    side: lightSide("1D7A5F"),
  },
});

const lineaDeTiempo = make({
  id: "linea-de-tiempo",
  name: "Línea de tiempo",
  summary: "Fechas a la izquierda y una línea vertical que une la trayectoria.",
  layout: "single",
  sidebarColor: undefined,
  photo: undefined,
  margins: { top: 44, bottom: 40 },
  pad: { main: [48, 48], side: [0, 0], top: [48, 48] },
  header: { placement: "top", align: "left", contactInline: true },
  rail: { color: "F2C8A6", thickness: 1.5, offset: 12 },
  style: {
    name: { font: "Rubik", bold: true, size: 25, line: 31, color: ink, after: 2 },
    title: { font: "Rubik", size: 12.5, line: 17, color: "D9682A", after: 6 },
    contact: { font: "Inter", size: 8.5, line: 12.5, color: gray, after: 18 },
    heading: { font: "Rubik", bold: true, size: 10.5, line: 14, spacing: 1.2, color: "D9682A", uppercase: true, after: 3 },
    sideHeading: dosColumnas.style.sideHeading,
    rule: { kind: "none", color: "D9682A", sideColor: "D9682A", thickness: 0, after: 0, shortWidth: 0 },
    body: dosColumnas.style.body,
    role: { font: "Inter", bold: true, size: 9.5, line: 14, color: ink },
    meta: { font: "Inter", size: 8.5, line: 12.5, color: gray, accent: "D9682A" },
    bullet: { font: "Inter", size: 8.5, line: 12.5, color: ink, hanging: 9, after: 1.5, glyphColor: "D9682A" },
    side: lightSide("D9682A"),
  },
  gaps: { section: 14, entry: 10, sideSection: 14, contact: 6 },
  entry: "timeline",
  timelineGutter: 100,
  sections: singleSections,
});

const multicolumna = make({
  id: "multicolumna",
  name: "Multicolumna",
  summary: "Encabezado a todo el ancho y dos columnas separadas por una línea.",
  layout: "sidebar-right",
  sidebarWidth: 215,
  sidebarColor: undefined,
  photo: undefined,
  margins: { top: 44, bottom: 40 },
  pad: { main: [44, 20], side: [20, 40], top: [44, 40] },
  header: { placement: "top", align: "left", contactInline: true },
  divider: { color: "D9D3F5", thickness: 0.75 },
  style: {
    name: { font: "Rubik", bold: true, size: 25, line: 31, color: ink, after: 2 },
    title: { font: "Rubik", size: 12.5, line: 17, color: "6D4AFF", after: 6 },
    contact: { font: "Inter", size: 8.5, line: 12.5, color: gray, after: 18 },
    heading: { font: "Rubik", bold: true, size: 10.5, line: 14, spacing: 1.2, color: "6D4AFF", uppercase: true, after: 3 },
    sideHeading: { font: "Rubik", bold: true, size: 10.5, line: 14, spacing: 1.2, color: "6D4AFF", uppercase: true, after: 3 },
    rule: { kind: "full", color: "D9D3F5", sideColor: "D9D3F5", thickness: 1, after: 8, shortWidth: 36 },
    body: dosColumnas.style.body,
    role: dosColumnas.style.role,
    meta: { font: "Inter", size: 8.5, line: 12.5, color: gray, accent: "6D4AFF" },
    bullet: { font: "Inter", size: 8.5, line: 12.5, color: ink, hanging: 9, after: 1.5, glyphColor: "6D4AFF" },
    side: lightSide("6D4AFF"),
  },
  sections: { main: ["summary", "experience"], side: ["education", "skills", "languages", "certifications"] },
});

const academico = make({
  id: "academico",
  name: "Académico",
  summary: "Serif sobria con la formación primero; pensado para perfiles académicos.",
  layout: "single",
  sidebarColor: undefined,
  photo: undefined,
  margins: { top: 50, bottom: 44 },
  pad: { main: [60, 60], side: [0, 0], top: [60, 60] },
  header: { placement: "top", align: "left", contactInline: true },
  style: {
    name: { font: "Lora", bold: true, size: 23, line: 29, color: "1A2B4A", after: 2 },
    title: { font: "Lora", size: 12, line: 16, color: "1A2B4A", after: 6 },
    contact: { font: "Lora", size: 8.5, line: 12.5, color: "4A5568", after: 18 },
    heading: { font: "Lora", bold: true, size: 11, line: 15, spacing: 0.4, color: "1A2B4A", uppercase: false, after: 2 },
    sideHeading: dosColumnas.style.sideHeading,
    rule: { kind: "full", color: "1A2B4A", sideColor: "1A2B4A", thickness: 0.75, after: 7, shortWidth: 36 },
    body: { font: "Lora", size: 9.5, line: 14, color: "1F2937" },
    role: { font: "Lora", bold: true, size: 10, line: 14, color: "1F2937" },
    meta: { font: "Lora", size: 9, line: 13, color: "4A5568", accent: "4A5568" },
    bullet: { font: "Lora", size: 9, line: 13, color: "1F2937", hanging: 10, after: 1.5, glyphColor: "1A2B4A" },
    side: lightSide("1A2B4A", "Lora"),
  },
  sections: { main: ["summary", "education", "experience", "certifications", "skills", "languages"], side: [] },
});

const creativo = make({
  id: "creativo",
  name: "Creativo",
  summary: "Barra lateral de color intenso y títulos con acento corto.",
  layout: "sidebar-left",
  sidebarWidth: 186,
  sidebarColor: "E4573D",
  photo: { size: 100, top: 40, gapBelow: 20 },
  pad: { main: [32, 34], side: [22, 20], top: [32, 34] },
  style: {
    name: { font: "Rubik", bold: true, size: 27, line: 33, color: "2B1B17", after: 2 },
    title: { font: "Rubik", size: 12.5, line: 17, color: "E4573D", after: 14 },
    contact: dosColumnas.style.contact,
    heading: { font: "Rubik", bold: true, size: 12, line: 16, color: "2B1B17", uppercase: false, after: 4 },
    sideHeading: { font: "Rubik", bold: true, size: 10.5, line: 14, color: "FFFFFF", uppercase: false, after: 4 },
    rule: { kind: "short", color: "E4573D", sideColor: "FFFFFF", thickness: 2.5, after: 9, shortWidth: 24 },
    body: dosColumnas.style.body,
    role: { font: "Inter", bold: true, size: 10, line: 14, color: "2B1B17" },
    meta: { font: "Inter", size: 8.5, line: 12.5, color: gray, accent: "E4573D" },
    bullet: { font: "Inter", size: 8.5, line: 12.5, color: ink, hanging: 9, after: 1.5, glyphColor: "E4573D" },
    side: {
      text: { font: "Inter", size: 8.5, line: 12.5, color: "FFFFFF" },
      muted: "FFE1DA",
      label: { font: "Inter", bold: true, size: 7, line: 10, spacing: 0.6, color: "FFE1DA" },
    },
  },
});

const ejecutivo = make({
  id: "ejecutivo",
  name: "Ejecutivo",
  summary: "Franja dorada, encabezado amplio y columna lateral con datos clave.",
  layout: "sidebar-right",
  sidebarWidth: 200,
  sidebarColor: undefined,
  photo: undefined,
  margins: { top: 48, bottom: 40 },
  pad: { main: [44, 22], side: [22, 40], top: [44, 40] },
  header: { placement: "top", align: "left", contactInline: true },
  topStrip: { color: "B7862C", height: 10 },
  divider: { color: "E7DCC5", thickness: 0.75 },
  style: {
    name: { font: "Lora", bold: true, size: 25, line: 31, color: "1C2433", after: 2 },
    title: { font: "Inter", bold: true, size: 10, line: 14, spacing: 1.2, color: "B7862C", after: 6 },
    contact: { font: "Inter", size: 8.5, line: 12.5, color: gray, after: 18 },
    heading: { font: "Lora", bold: true, size: 11.5, line: 15, color: "1C2433", uppercase: false, after: 3 },
    sideHeading: { font: "Lora", bold: true, size: 11, line: 15, color: "1C2433", uppercase: false, after: 3 },
    rule: { kind: "full", color: "B7862C", sideColor: "B7862C", thickness: 0.75, after: 8, shortWidth: 36 },
    body: dosColumnas.style.body,
    role: { font: "Inter", bold: true, size: 10, line: 14, color: "1C2433" },
    meta: { font: "Inter", size: 8.5, line: 12.5, color: gray, accent: "8A6420" },
    bullet: { font: "Inter", size: 8.5, line: 12.5, color: ink, hanging: 9, after: 1.5, glyphColor: "B7862C" },
    side: lightSide("8A6420"),
  },
  sections: { main: ["summary", "experience"], side: ["education", "skills", "languages", "certifications"] },
});

export const templates: TemplateConfig[] = [
  dosColumnas,
  clasico,
  minimalista,
  moderno,
  barraDerecha,
  lineaDeTiempo,
  multicolumna,
  academico,
  creativo,
  ejecutivo,
];

export const defaultTemplate = dosColumnas;

export function templateById(id: string | undefined): TemplateConfig {
  return templates.find((t) => t.id === id) ?? defaultTemplate;
}

/** Fonts the .docx embeds: the template's plus Inter, which the writer uses for its empty filler lines. */
export function embeddedFonts(t: TemplateConfig): FontFamily[] {
  return Array.from(new Set<FontFamily>([...fontsOf(t), "Inter"]));
}

/** Fonts a template uses. */
export function fontsOf(t: TemplateConfig): FontFamily[] {
  const s = t.style;
  const all = [s.name, s.title, s.contact, s.heading, s.sideHeading, s.body, s.role, s.meta, s.bullet, s.side.text, s.side.label].map(
    (x) => x.font,
  );
  return Array.from(new Set(all));
}
