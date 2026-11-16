import { page } from "./spec";
import { columnsOf, type SectionKey, type TemplateConfig, type TextStyle } from "./templates";
import type { Block, Column, Layout, ResumeData, Run, TextRun } from "./types";

type Box = { indentLeft: number; indentRight: number };
type Para = Extract<Block, { kind: "paragraph" }>;

/** Hints the editor shows in empty fields. */
export const PLACEHOLDERS = {
  name: "Tu nombre",
  title: "Tu cargo o especialidad",
  contactLabel: "Etiqueta",
  contactValue: "Dato de contacto",
  summary: "Resume tu perfil profesional en dos o tres frases.",
  role: "Puesto",
  company: "Empresa",
  location: "Ubicación",
  period: "Periodo",
  bullet: "Destaca tus logros, con cifras si es posible.",
  degree: "Titulación",
  school: "Centro de estudios",
  skill: "Habilidad",
  language: "Idioma",
  level: "Nivel",
  certification: "Certificación",
  year: "Año",
} as const;

/** Section titles, in the CV's language. */
export const SECTION_TITLES: Record<SectionKey, string> = {
  contact: "Contacto",
  summary: "Perfil",
  experience: "Experiencia",
  education: "Educación",
  skills: "Habilidades",
  languages: "Idiomas",
  certifications: "Certificaciones",
};

const run = (text: string, s: TextStyle, color = s.color, bold = s.bold, entry?: string): TextRun => ({
  kind: "text",
  text,
  font: s.font,
  bold,
  size: s.size,
  color,
  letterSpacing: s.spacing,
  ...(entry ? { entry } : {}),
});
const TAB: Run = { kind: "tab" };
const isText = (r: Run | null): r is TextRun => r !== null && r.kind === "text";

/**
 * Turns CV data into the blocks of every area of the template, used by both renderers.
 * With `edit`, empty fields stay in the layout with a hint (editor view); without it they are left out (export).
 */
export function buildLayout(data: ResumeData, t: TemplateConfig, opts: { edit?: boolean } = {}): Layout {
  const S = t.style;
  const cols = columnsOf(t);
  const edit = Boolean(opts.edit);
  let section = "header";

  /** A run bound to a data field; null when the field is empty outside the editor. */
  const field = (value: string | undefined, path: string, entry: string, s: TextStyle, hint: string, color = s.color, bold = s.bold): TextRun | null => {
    const v = value ?? "";
    if (!v && !edit) return null;
    return { ...run(v, s, color, bold, entry), field: path, ...(v ? {} : { placeholder: hint }) };
  };

  /** Adds a paragraph unless it has no text at all (an empty field outside the editor). */
  const para = (out: Block[], runs: (Run | null)[], style: TextStyle, after: number, box: Box, extra: Partial<Para> = {}) => {
    const kept = runs.filter((r): r is Run => r !== null);
    if (!kept.some(isText)) return;
    out.push({ kind: "paragraph", runs: kept, lineHeight: style.line, spaceAfter: after, ...box, ...extra, section });
  };

  const setLastAfter = (out: Block[], after: number) => {
    const last = out[out.length - 1];
    if (last && last.kind !== "spacer") last.spaceAfter = after;
  };

  /** Runs of a list joined by a separator; empty items are skipped outside the editor. */
  const joined = (items: (TextRun | null)[], sep: (entry: string) => TextRun): Run[] => {
    const kept = items.filter(isText);
    return kept.flatMap((r, i) => (i ? [sep(r.entry!), r] : [r]));
  };

  // ---------- header (name, title, contact) ----------
  const header = (out: Block[], box: Box) => {
    section = "header";
    const align = t.header.align;
    para(out, [field(data.name, "name", "header", S.name, PLACEHOLDERS.name)], S.name, S.name.after, box, { align });
    para(out, [field(data.title, "title", "header", S.title, PLACEHOLDERS.title)], S.title, S.title.after, box, { align });
    if (t.header.contactInline) {
      const items = data.contact.map((c, i) => field(c.value, `contact.${i}.value`, `contact.${i}`, S.contact, PLACEHOLDERS.contactValue));
      para(out, joined(items, (entry) => run("  ·  ", S.contact, S.contact.color, S.contact.bold, entry)), S.contact, S.contact.after, box, { align });
    }
  };

  // ---------- sections ----------
  const render = (out: Block[], col: Column, keys: SectionKey[]) => {
    const side = col.role === "side";
    const [pl, pr] = side ? t.pad.side : t.pad.main;
    const box: Box = { indentLeft: pl, indentRight: pr };
    const narrow = col.width < 300;
    const H = side ? S.sideHeading : S.heading;
    const text = side ? S.side.text : S.body;
    const muted = side ? S.side.muted : S.meta.color;
    const sectionGap = side ? t.gaps.sideSection : t.gaps.section;

    const timeline = t.entry === "timeline" && !side;
    const g = t.timelineGutter;
    const bodyBox: Box = timeline ? { indentLeft: pl + g, indentRight: pr } : box;

    // Timeline templates keep the left gutter for dates only; everything else sits right of the rail.
    const heading = (key: SectionKey) => {
      const label = SECTION_TITLES[key];
      const ruleKind = S.rule.kind;
      para(out, [run(H.uppercase ? label.toLocaleUpperCase("es") : label, H, H.color, H.bold, key)], H, ruleKind === "none" ? H.after + 3 : H.after, bodyBox, {
        keepNext: true,
      });
      if (ruleKind !== "none") {
        const right = ruleKind === "short" ? col.width - bodyBox.indentLeft - S.rule.shortWidth : pr;
        out.push({
          kind: "rule",
          thickness: S.rule.thickness,
          color: side ? S.rule.sideColor : S.rule.color,
          spaceAfter: S.rule.after,
          indentLeft: bodyBox.indentLeft,
          indentRight: right,
          keepNext: true,
          section,
        });
      }
    };

    const bullet = (b: string, path: string, entry: string) =>
      para(out, [run("•", S.bullet, S.bullet.glyphColor, S.bullet.bold, entry), TAB, field(b, path, entry, S.bullet, PLACEHOLDERS.bullet)], S.bullet, S.bullet.after, {
        indentLeft: bodyBox.indentLeft + S.bullet.hanging,
        indentRight: pr,
      }, { hanging: S.bullet.hanging });

    const entryTitle = (title: TextRun | null, period: TextRun | null) => {
      if (timeline) {
        para(out, [period && { ...period, color: S.meta.color, bold: false }, TAB, title], S.role, 0, bodyBox, { hanging: g, keepNext: true });
      } else {
        para(out, [title], S.role, 0, box, { keepNext: true });
      }
    };
    const entryMeta = (where: Run[], period: TextRun | null, after: number, keepNext: boolean) => {
      if (timeline) para(out, where, S.meta, after, bodyBox, { keepNext });
      else para(out, [...where, TAB, period], S.meta, after, box, { rightTab: true, keepNext });
    };
    /** "Company · Location" with each part editable. */
    const place = (parts: (TextRun | null)[], entry: string) =>
      joined(parts, () => run(" · ", S.meta, S.meta.accent, S.meta.bold, entry));

    /** Lists: every item, or nothing at all outside the editor when the list is empty. */
    const has = <T,>(list: T[]) => edit || list.length > 0;

    keys.forEach((key) => {
      section = key;
      const before = out.length;
      switch (key) {
        case "contact": {
          const items = data.contact.filter((c) => edit || c.label || c.value);
          if (!has(items)) break;
          heading(key);
          data.contact.forEach((c, i) => {
            if (!edit && !c.label && !c.value) return;
            const entry = `contact.${i}`;
            para(out, [field(c.label.toLocaleUpperCase("es"), `contact.${i}.label`, entry, S.side.label, PLACEHOLDERS.contactLabel)], S.side.label, 1, box, { keepNext: true });
            para(out, [field(c.value, `contact.${i}.value`, entry, text, PLACEHOLDERS.contactValue)], text, t.gaps.contact, box);
          });
          break;
        }
        case "summary":
          if (!edit && !data.summary) break;
          heading(key);
          para(out, [field(data.summary, "summary", "summary", text, PLACEHOLDERS.summary)], text, 0, bodyBox);
          break;
        case "experience":
          if (!has(data.experience)) break;
          heading(key);
          data.experience.forEach((job, i) => {
            const e = `experience.${i}`;
            const period = field(job.period, `${e}.period`, e, S.meta, PLACEHOLDERS.period, S.meta.color, false);
            entryTitle(field(job.role, `${e}.role`, e, S.role, PLACEHOLDERS.role), timeline ? period && { ...period, font: S.role.font, size: S.role.size, letterSpacing: S.role.spacing } : null);
            const where = place(
              [field(job.company, `${e}.company`, e, S.meta, PLACEHOLDERS.company, S.meta.accent), field(job.location, `${e}.location`, e, S.meta, PLACEHOLDERS.location, S.meta.accent)],
              e,
            );
            entryMeta(where, period, 4, true);
            const bullets = job.bullets.length || !edit ? job.bullets : [""];
            bullets.forEach((b, j) => {
              if (!edit && !b) return;
              bullet(b, `${e}.bullets.${j}`, e);
            });
            if (i < data.experience.length - 1) setLastAfter(out, t.gaps.entry);
          });
          break;
        case "education":
          if (!has(data.education)) break;
          heading(key);
          data.education.forEach((ed, i) => {
            const e = `education.${i}`;
            const degree = field(ed.degree, `${e}.degree`, e, S.role, PLACEHOLDERS.degree);
            const school = field(ed.school, `${e}.school`, e, S.meta, PLACEHOLDERS.school, S.meta.accent);
            if (narrow) {
              para(out, [degree], S.role, 0, box, { keepNext: true });
              para(out, [school], S.meta, 0, box, { keepNext: true });
              para(out, [field(ed.period, `${e}.period`, e, S.meta, PLACEHOLDERS.period, muted)], S.meta, 0, box);
            } else {
              const period = field(ed.period, `${e}.period`, e, S.meta, PLACEHOLDERS.period, S.meta.color, false);
              entryTitle(degree, timeline ? period && { ...period, font: S.role.font, size: S.role.size, letterSpacing: S.role.spacing } : null);
              entryMeta(school ? [school] : [], period, 0, false);
            }
            if (i < data.education.length - 1) setLastAfter(out, t.gaps.entry);
          });
          break;
        case "skills": {
          if (!has(data.skills)) break;
          heading(key);
          const items = data.skills.map((k, i) => field(k, `skills.${i}`, `skills.${i}`, text, PLACEHOLDERS.skill));
          if (narrow) items.forEach((r) => para(out, [r], text, 3, box));
          else para(out, joined(items, (entry) => run("  ·  ", text, text.color, text.bold, entry)), text, 0, bodyBox);
          break;
        }
        case "languages":
          if (!has(data.languages)) break;
          heading(key);
          if (narrow)
            data.languages.forEach((l, i) => {
              const e = `languages.${i}`;
              para(out, [field(l.name, `${e}.name`, e, text, PLACEHOLDERS.language), TAB, field(l.level, `${e}.level`, e, text, PLACEHOLDERS.level, muted)], text, 3, box, {
                rightTab: true,
              });
            });
          else {
            const runs: Run[] = [];
            data.languages.forEach((l, i) => {
              const e = `languages.${i}`;
              const name = field(l.name, `${e}.name`, e, text, PLACEHOLDERS.language, text.color, true);
              const level = field(l.level, `${e}.level`, e, text, PLACEHOLDERS.level, muted, false);
              if (!name && !level) return;
              if (runs.length) runs.push(run("  ·  ", text, text.color, true, e));
              if (name) runs.push(name, run(" ", text, text.color, true, e));
              if (level) runs.push(level);
            });
            para(out, runs, text, 0, bodyBox);
          }
          break;
        case "certifications":
          if (!has(data.certifications)) break;
          heading(key);
          data.certifications.forEach((c, i) => {
            const e = `certifications.${i}`;
            const name = field(c.name, `${e}.name`, e, text, PLACEHOLDERS.certification);
            if (narrow) {
              para(out, [name], text, 0, box, { keepNext: true });
              para(out, [field(c.year, `${e}.year`, e, S.meta, PLACEHOLDERS.year, muted)], S.meta, 6, box);
            } else {
              para(out, [name, TAB, field(c.year, `${e}.year`, e, text, PLACEHOLDERS.year, muted)], text, 3, bodyBox, { rightTab: true });
            }
          });
          break;
      }
      if (out.length > before) setLastAfter(out, sectionGap);
    });
    setLastAfter(out, 0);
  };

  // ---------- assemble ----------
  const top: Block[] = [];
  if (t.header.placement === "top") header(top, { indentLeft: t.pad.top[0], indentRight: t.pad.top[1] });

  const columns = cols.map((col) => {
    const out: Block[] = [];
    if (col.role === "side" && t.photo) {
      out.push({ kind: "spacer", height: t.photo.top + t.photo.size + t.photo.gapBelow - t.margins.top });
    }
    if (col.role === "main" && t.header.placement === "main") header(out, { indentLeft: t.pad.main[0], indentRight: t.pad.main[1] });
    render(out, col, col.role === "main" ? t.sections.main : t.sections.side);
    return out;
  });

  return { top, columns };
}

/** Page-anchored decorations (behind the text) for one page, plus the photo position on page 1. */
export function decorationsFor(t: TemplateConfig, pageIndex: number, topHeight: number) {
  const rects: { x: number; y: number; w: number; h: number; color: string }[] = [];
  const W = page.width;
  const H = page.height;
  const cols = columnsOf(t);
  const bodyTop = t.margins.top + (pageIndex === 0 ? topHeight : 0);

  let bandBottom = 0;
  if (t.band && pageIndex === 0) {
    bandBottom = t.margins.top + topHeight - t.style.contact.after + t.band.padBottom;
    rects.push({ x: 0, y: 0, w: W, h: bandBottom, color: t.band.color });
  }
  const side = cols.find((c) => c.role === "side");
  if (side && t.sidebarColor) rects.push({ x: side.x, y: bandBottom, w: side.width, h: H - bandBottom, color: t.sidebarColor });
  if (t.topStrip) rects.push({ x: 0, y: 0, w: W, h: t.topStrip.height, color: t.topStrip.color });
  if (t.divider && cols.length === 2) {
    rects.push({ x: cols[1].x - t.divider.thickness / 2, y: bodyTop, w: t.divider.thickness, h: H - t.margins.bottom - bodyTop, color: t.divider.color });
  }
  if (t.rail) {
    const main = cols.find((c) => c.role === "main")!;
    const x = main.x + t.pad.main[0] + t.timelineGutter - t.rail.offset;
    rects.push({ x, y: bodyTop + 4, w: t.rail.thickness, h: H - t.margins.bottom - bodyTop - 4, color: t.rail.color });
  }
  const photo =
    pageIndex === 0 && t.photo && side
      ? { x: side.x + (side.width - t.photo.size) / 2, y: t.photo.top, size: t.photo.size }
      : undefined;
  return { rects, photo };
}
