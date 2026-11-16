import type { SectionKey } from "../export/templates";
import type { ResumeData } from "../export/types";
import { defaultCustom, type Custom } from "./customize";

/** Everything the editor saves: the CV text and the user's design/section choices. */
export type EditorState = { data: ResumeData; custom: Custom };

// ---------------------------------------------------------------------------------------------
// Paths: "experience.0.bullets.2" addresses a value inside ResumeData.
// ---------------------------------------------------------------------------------------------

type Json = string | number | boolean | null | undefined | Json[] | { [k: string]: Json };

export function getAt(data: ResumeData, path: string): Json {
  return path.split(".").reduce<Json>((v, k) => (v == null ? undefined : (v as Record<string, Json>)[k]), data as unknown as Json);
}

/** Immutable update of one value. */
export function setAt(data: ResumeData, path: string, value: string): ResumeData {
  const keys = path.split(".");
  const rec = (node: Json, i: number): Json => {
    const k = keys[i];
    if (i === keys.length - 1) {
      if (Array.isArray(node)) {
        const copy = [...node];
        copy[Number(k)] = value;
        return copy;
      }
      return { ...(node as Record<string, Json>), [k]: value };
    }
    if (Array.isArray(node)) {
      const copy = [...node];
      copy[Number(k)] = rec(node[Number(k)], i + 1);
      return copy;
    }
    const obj = node as Record<string, Json>;
    return { ...obj, [k]: rec(obj[k], i + 1) };
  };
  return rec(data as unknown as Json, 0) as unknown as ResumeData;
}

// ---------------------------------------------------------------------------------------------
// Entries: the selectable units of the CV ("header", "summary", "experience.1", "skills.0"…).
// ---------------------------------------------------------------------------------------------

export type ListKey = "contact" | "experience" | "education" | "skills" | "languages" | "certifications";
export const LIST_KEYS: ListKey[] = ["contact", "experience", "education", "skills", "languages", "certifications"];

export type Selection =
  | { kind: "header" }
  | { kind: "section"; key: SectionKey }
  | { kind: "item"; key: ListKey; index: number };

export function parseEntry(entry: string): Selection | null {
  if (entry === "header") return { kind: "header" };
  const [key, idx] = entry.split(".");
  if (idx !== undefined && (LIST_KEYS as string[]).includes(key)) return { kind: "item", key: key as ListKey, index: Number(idx) };
  if (["summary", ...LIST_KEYS].includes(key)) return { kind: "section", key: key as SectionKey };
  return null;
}

export const entryOf = (s: Selection) => (s.kind === "header" ? "header" : s.kind === "section" ? s.key : `${s.key}.${s.index}`);

/** Empty item of each list, and the field to edit first when it is added. */
const BLANK: Record<ListKey, { item: () => unknown; first: string }> = {
  contact: { item: () => ({ label: "", value: "" }), first: "label" },
  experience: { item: () => ({ role: "", company: "", location: "", period: "", bullets: [] }), first: "role" },
  education: { item: () => ({ degree: "", school: "", period: "" }), first: "degree" },
  skills: { item: () => "", first: "" },
  languages: { item: () => ({ name: "", level: "" }), first: "name" },
  certifications: { item: () => ({ name: "", year: "" }), first: "name" },
};

const fieldOf = (key: ListKey, index: number) => (BLANK[key].first ? `${key}.${index}.${BLANK[key].first}` : `${key}.${index}`);

/** Inserts an empty item at `index` and returns the field to focus. */
export function addItem(data: ResumeData, key: ListKey, index: number): { data: ResumeData; focus: string } {
  const list = [...(data[key] as unknown[])];
  const at = Math.max(0, Math.min(index, list.length));
  list.splice(at, 0, BLANK[key].item());
  return { data: { ...data, [key]: list }, focus: fieldOf(key, at) };
}

export function removeItem(data: ResumeData, key: ListKey, index: number): ResumeData {
  const list = [...(data[key] as unknown[])];
  list.splice(index, 1);
  return { ...data, [key]: list };
}

export function moveItem(data: ResumeData, key: ListKey, index: number, delta: number): { data: ResumeData; index: number } {
  const list = [...(data[key] as unknown[])];
  const to = index + delta;
  if (to < 0 || to >= list.length) return { data, index };
  [list[index], list[to]] = [list[to], list[index]];
  return { data: { ...data, [key]: list }, index: to };
}

/** "experience.1.bullets.2" -> { exp: 1, bullet: 2 } */
export function bulletOf(field: string): { exp: number; bullet: number } | null {
  const m = /^experience\.(\d+)\.bullets\.(\d+)$/.exec(field);
  return m ? { exp: Number(m[1]), bullet: Number(m[2]) } : null;
}

export function insertBullet(data: ResumeData, exp: number, at: number): ResumeData {
  const experience = data.experience.map((e, i) => {
    if (i !== exp) return e;
    const bullets = e.bullets.length ? [...e.bullets] : [""];
    bullets.splice(at, 0, "");
    return { ...e, bullets };
  });
  return { ...data, experience };
}

export function removeBullet(data: ResumeData, exp: number, at: number): ResumeData {
  const experience = data.experience.map((e, i) => (i === exp ? { ...e, bullets: e.bullets.filter((_, j) => j !== at) } : e));
  return { ...data, experience };
}

// ---------------------------------------------------------------------------------------------
// Saved in this browser only (no server).
// ---------------------------------------------------------------------------------------------

const KEY = "serengpt-cv-editor-v1";

export function loadState(): EditorState | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as EditorState;
    if (!parsed?.data?.experience || !parsed.custom?.design) return null;
    return { data: parsed.data, custom: { ...defaultCustom, ...parsed.custom, design: { ...defaultCustom.design, ...parsed.custom.design } } };
  } catch {
    return null;
  }
}

export function saveState(state: EditorState) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage full or blocked (private mode): the CV still works, it just is not kept.
  }
}

export function clearState() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
