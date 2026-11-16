"use client";

import { ArrowDown, ArrowUp, Calendar, Camera, ChevronDown, Plus, Trash2 } from "lucide-react";
import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import type { ResumeData } from "../export/types";
import { entryOf, type ListKey, type Selection } from "./state";

type Box = { x: number; y: number; w: number; h: number };

const PAD = 5;

/** Elements of the visible pages that belong to the selection. */
function matches(entry: string, sel: Selection) {
  if (sel.kind === "header") return entry === "header";
  if (sel.kind === "section") return entry === sel.key || entry.startsWith(`${sel.key}.`);
  return entry === `${sel.key}.${sel.index}`;
}

/** One outline per page the selection spans, in paper coordinates. */
function boxesOf(preview: HTMLElement, paper: HTMLElement, sel: Selection): Box[] {
  const origin = paper.getBoundingClientRect();
  const byPage = new Map<Element, DOMRect[]>();
  preview.querySelectorAll<HTMLElement>(".sgx-pagesView [data-entry]").forEach((el) => {
    if (!matches(el.dataset.entry!, sel)) return;
    const pageEl = el.closest(".sgx-page");
    if (!pageEl) return;
    // Inline spans report their line box; their paragraph gives the full text width of each line.
    const target = el.tagName === "IMG" ? el : (el.closest("p") ?? el);
    const r = el.tagName === "IMG" ? el.getBoundingClientRect() : unionWithText(el, target as HTMLElement);
    if (!byPage.has(pageEl)) byPage.set(pageEl, []);
    byPage.get(pageEl)!.push(r);
  });
  return [...byPage.values()].map((rects) => {
    const x0 = Math.min(...rects.map((r) => r.left));
    const y0 = Math.min(...rects.map((r) => r.top));
    const x1 = Math.max(...rects.map((r) => r.right));
    const y1 = Math.max(...rects.map((r) => r.bottom));
    return { x: x0 - origin.left - PAD, y: y0 - origin.top - PAD, w: x1 - x0 + PAD * 2, h: y1 - y0 + PAD * 2 };
  });
}

/** A text span's box widened to its paragraph's text area (so a whole entry gets a column-wide outline). */
function unionWithText(span: HTMLElement, p: HTMLElement): DOMRect {
  const s = span.getBoundingClientRect();
  const pr = p.getBoundingClientRect();
  const cs = getComputedStyle(p);
  const zoom = pr.width / (p.offsetWidth || pr.width);
  const left = pr.left + parseFloat(cs.paddingLeft) * zoom;
  const right = pr.right - parseFloat(cs.paddingRight) * zoom;
  return new DOMRect(Math.min(left, s.left), s.top, Math.max(right, s.right) - Math.min(left, s.left), s.height);
}

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const NOW = "Actualidad";

/** "03/2019 – 2022", "2019 – Actualidad" -> parts. */
function parsePeriod(p: string) {
  const m = /^\s*(?:(\d{1,2})\/)?(\d{4})?\s*(?:[–-]\s*(?:(?:(\d{1,2})\/)?(\d{4})|(Actualidad|actualidad|Presente|presente)))?\s*$/.exec(p);
  return {
    fromMonth: m?.[1] ? String(Number(m[1])) : "",
    fromYear: m?.[2] ?? "",
    toMonth: m?.[3] ? String(Number(m[3])) : "",
    toYear: m?.[4] ?? "",
    current: Boolean(m?.[5]),
  };
}

function formatPeriod(v: ReturnType<typeof parsePeriod>) {
  const part = (mm: string, yy: string) => (yy ? `${mm ? `${mm.padStart(2, "0")}/` : ""}${yy}` : "");
  const from = part(v.fromMonth, v.fromYear);
  const to = v.current ? NOW : part(v.toMonth, v.toYear);
  return from && to ? `${from} – ${to}` : from || to;
}

function PeriodEditor({ value, onApply, onClose }: { value: string; onApply: (v: string) => void; onClose: () => void }) {
  const [v, setV] = useState(() => parsePeriod(value));
  const year = (y: string) => y.replace(/\D/g, "").slice(0, 4);
  const set = (patch: Partial<typeof v>) => setV({ ...v, ...patch });
  return (
    <div className="sge-pop sge-period" role="dialog" aria-label="Periodo">
      <fieldset>
        <legend>Desde</legend>
        <select aria-label="Mes de inicio" value={v.fromMonth} onChange={(e) => set({ fromMonth: e.target.value })}>
          <option value="">Mes</option>
          {MONTHS.map((m, i) => (
            <option key={m} value={String(i + 1)}>
              {m}
            </option>
          ))}
        </select>
        <input aria-label="Año de inicio" inputMode="numeric" placeholder="Año" value={v.fromYear} onChange={(e) => set({ fromYear: year(e.target.value) })} />
      </fieldset>
      <fieldset disabled={v.current}>
        <legend>Hasta</legend>
        <select aria-label="Mes de fin" value={v.toMonth} onChange={(e) => set({ toMonth: e.target.value })}>
          <option value="">Mes</option>
          {MONTHS.map((m, i) => (
            <option key={m} value={String(i + 1)}>
              {m}
            </option>
          ))}
        </select>
        <input aria-label="Año de fin" inputMode="numeric" placeholder="Año" value={v.toYear} onChange={(e) => set({ toYear: year(e.target.value) })} />
      </fieldset>
      <label className="sge-checkRow">
        <input type="checkbox" checked={v.current} onChange={(e) => set({ current: e.target.checked })} />
        Actualmente
      </label>
      <div className="sge-popActions">
        <button type="button" className="sge-ghost" onClick={onClose}>
          Cancelar
        </button>
        <button
          type="button"
          className="sge-primary"
          onClick={() => {
            onApply(formatPeriod(v));
            onClose();
          }}
        >
          Aplicar
        </button>
      </div>
    </div>
  );
}

export type SelectionActions = {
  add(sel: Selection): void;
  remove(sel: Selection): void;
  move(sel: Selection, delta: number): void;
  setPeriod(sel: Selection, value: string): void;
  pickPhoto(file: File): void;
  removePhoto(): void;
};

const ADDABLE: (ListKey | "summary")[] = ["contact", "experience", "education", "skills", "languages", "certifications"];
const DATED: ListKey[] = ["experience", "education"];

/** Outline + floating toolbar of the selected entry, drawn over the A4 preview. */
export function SelectionLayer({
  previewRef,
  paperRef,
  selection,
  data,
  hasPhotoSlot,
  actions,
}: {
  previewRef: RefObject<HTMLDivElement | null>;
  paperRef: RefObject<HTMLDivElement | null>;
  selection: Selection | null;
  data: ResumeData;
  hasPhotoSlot: boolean;
  actions: SelectionActions;
}) {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [menu, setMenu] = useState<"move" | "period" | null>(null);
  const [menuFor, setMenuFor] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const key = selection ? entryOf(selection) : "";
  const openMenu = menuFor === key ? menu : null;

  // Runs after every render: the parent re-renders whenever the preview re-paginates or is zoomed.
  // eslint-disable-next-line react-hooks/exhaustive-deps -- setBoxes only fires when the outline moved, so this settles
  useLayoutEffect(() => {
    const next = selection && previewRef.current && paperRef.current ? boxesOf(previewRef.current, paperRef.current, selection) : [];
    // Only re-render when the outline actually moved.
    setBoxes((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
  });

  if (!selection || boxes.length === 0) return null;
  const first = boxes[0];
  const toggle = (m: "move" | "period") => {
    setMenuFor(key);
    setMenu(openMenu === m ? null : m);
  };
  // Buttons keep the caret in the field being edited; the date inputs still take focus.
  const keep = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest("input, select, label, fieldset")) e.preventDefault();
  };

  const item = selection.kind === "item" ? selection : null;
  const listKey = item?.key ?? (selection.kind === "section" ? selection.key : null);
  const canAdd = listKey !== null && (ADDABLE as string[]).includes(listKey);
  const period = item && DATED.includes(item.key) ? String((data[item.key] as { period: string }[])[item.index]?.period ?? "") : null;
  const count = item ? (data[item.key] as unknown[]).length : 0;

  return (
    <>
      {boxes.map((b, i) => (
        <div key={i} className="sge-selBox" style={{ left: b.x, top: b.y, width: b.w, height: b.h }} aria-hidden="true" />
      ))}
      <div className="sge-selBar" style={{ left: first.x + first.w / 2, top: first.y }} role="toolbar" aria-label="Acciones de la entrada" onMouseDown={keep}>
        {selection.kind === "header" ? (
          <>
            {hasPhotoSlot && (
              <button type="button" className="sge-selBtn" title="Cambiar foto" aria-label="Cambiar foto" onClick={() => fileRef.current?.click()}>
                <Camera aria-hidden="true" />
              </button>
            )}
            {hasPhotoSlot && data.photo && (
              <button type="button" className="sge-selBtn" title="Quitar foto" aria-label="Quitar foto" onClick={actions.removePhoto}>
                <Trash2 aria-hidden="true" />
              </button>
            )}
            {!hasPhotoSlot && <span className="sge-selNote">Esta plantilla no lleva foto</span>}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) actions.pickPhoto(f);
                e.target.value = "";
              }}
            />
          </>
        ) : (
          <>
            {canAdd && (
              <button type="button" className="sge-selAdd" onClick={() => actions.add(selection)}>
                <Plus aria-hidden="true" />
                Entrada
              </button>
            )}
            {item && count > 1 && (
              <span className="sge-selWrap">
                <button type="button" className="sge-selBtn" title="Mover" aria-label="Mover" aria-expanded={openMenu === "move"} onClick={() => toggle("move")}>
                  <ChevronDown aria-hidden="true" />
                </button>
                {openMenu === "move" && (
                  <div className="sge-pop sge-menu" role="menu">
                    <button type="button" role="menuitem" disabled={item.index === 0} onClick={() => (actions.move(selection, -1), setMenu(null))}>
                      <ArrowUp aria-hidden="true" /> Subir
                    </button>
                    <button type="button" role="menuitem" disabled={item.index >= count - 1} onClick={() => (actions.move(selection, 1), setMenu(null))}>
                      <ArrowDown aria-hidden="true" /> Bajar
                    </button>
                  </div>
                )}
              </span>
            )}
            {period !== null && (
              <span className="sge-selWrap">
                <button type="button" className="sge-selBtn" title="Fechas" aria-label="Fechas" aria-expanded={openMenu === "period"} onClick={() => toggle("period")}>
                  <Calendar aria-hidden="true" />
                </button>
                {openMenu === "period" && (
                  <PeriodEditor key={key} value={period} onApply={(v) => actions.setPeriod(selection, v)} onClose={() => setMenu(null)} />
                )}
              </span>
            )}
            <button
              type="button"
              className="sge-selBtn"
              title={item ? "Eliminar entrada" : "Quitar sección"}
              aria-label={item ? "Eliminar entrada" : "Quitar sección"}
              onClick={() => actions.remove(selection)}
            >
              <Trash2 aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </>
  );
}
