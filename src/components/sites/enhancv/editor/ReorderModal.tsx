"use client";

import { GripVertical, Lock, Plus, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { SECTION_TITLES } from "../export/blocks";
import type { Measurement } from "../export/ResumePreview";
import { page } from "../export/spec";
import { columnsOf, type SectionKey, type TemplateConfig } from "../export/templates";
import type { Block } from "../export/types";
import { availableSections } from "./customize";

type Sections = TemplateConfig["sections"];
type Item = { kind: "header" | "photo" | "section"; key?: SectionKey; h: number };
type PageModel = { top: number; cols: Item[][] };

const FRAME_W = 346; // page width in the reference organizer
const K = FRAME_W / page.width; // pt -> px
const INNER = 8;
const GAP = 4;
const MIN_BOX = 22;

const afterOf = (b: Block) => (b.kind === "spacer" ? 0 : b.spaceAfter);

/** Per page and column, the consecutive blocks of each section with their measured height. */
function modelOf(m: Measurement): PageModel[] {
  const pageCount = Math.max(1, ...m.pages.columns.map((c) => c.length));
  return Array.from({ length: pageCount }, (_, p) => ({
    top: p === 0 && m.layout.top.length ? m.pages.topHeight : 0,
    cols: m.layout.columns.map((blocks, ci) => {
      const items: Item[] = [];
      for (const i of m.pages.columns[ci][p] ?? []) {
        const b = blocks[i];
        const h = (m.heights.columns[ci][i] ?? 0) + afterOf(b);
        const kind: Item["kind"] = b.kind === "spacer" ? "photo" : b.section === "header" ? "header" : "section";
        const key = b.kind !== "spacer" && kind === "section" ? (b.section as SectionKey) : undefined;
        const last = items[items.length - 1];
        if (last && last.kind === kind && last.key === key) last.h += h;
        else items.push({ kind, key, h });
      }
      return items;
    }),
  }));
}

type Drag = { key: SectionKey; x: number; y: number; dx: number; dy: number; w: number; h: number };
type Target = { col: number; page: number; index: number; lineY: number };

/** "Reorganizar secciones": drag the boxes of a schematic of every page to reorder sections or change column. */
export function ReorderModal({
  template,
  measurement,
  onChange,
  onClose,
}: {
  template: TemplateConfig;
  measurement: Measurement | null;
  onChange: (s: Sections) => void;
  onClose: () => void;
}) {
  const cols = columnsOf(template);
  const lists = useMemo(() => cols.map((c) => (c.role === "main" ? template.sections.main : template.sections.side)), [cols, template.sections]);
  const model = useMemo(() => (measurement ? modelOf(measurement) : []), [measurement]);
  const hidden = availableSections(template).filter((k) => !template.sections.main.includes(k) && !template.sections.side.includes(k));
  const [drag, setDrag] = useState<Drag | null>(null);
  const [target, setTarget] = useState<Target | null>(null);
  const [focusKey, setFocusKey] = useState<SectionKey | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => titleRef.current?.focus(), []);
  useEffect(() => {
    if (focusKey) rootRef.current?.querySelector<HTMLElement>(`[data-key="${focusKey}"]`)?.focus();
  }, [focusKey, measurement]);

  const emit = (next: SectionKey[][]) => {
    const out: Sections = { main: [], side: [] };
    cols.forEach((c, ci) => (out[c.role] = next[ci]));
    onChange(out);
  };

  const moveTo = (key: SectionKey, col: number, index: number) => {
    const next = lists.map((l) => l.filter((k) => k !== key));
    next[col].splice(Math.max(0, Math.min(index, next[col].length)), 0, key);
    emit(next);
  };

  /** Where the dragged box would land: the column under the pointer and the box it goes before. */
  const locate = (x: number, y: number, key: SectionKey): Target | null => {
    const zones = [...(rootRef.current?.querySelectorAll<HTMLElement>(".sgr-col") ?? [])];
    const zone = zones.find((z) => {
      const r = z.getBoundingClientRect();
      return x >= r.left && x <= r.right && y >= r.top - 12 && y <= r.bottom + 12;
    });
    if (!zone) return null;
    const col = Number(zone.dataset.col);
    const pageIndex = Number(zone.dataset.page);
    const list = lists[col].filter((k) => k !== key);
    const boxes = [...zone.querySelectorAll<HTMLElement>(".sgr-box[data-key]")].filter((b) => b.dataset.key !== key);
    const zr = zone.getBoundingClientRect();
    const before = boxes.find((b) => {
      const r = b.getBoundingClientRect();
      return y < r.top + r.height / 2;
    });
    if (before) {
      return { col, page: pageIndex, index: list.indexOf(before.dataset.key as SectionKey), lineY: before.getBoundingClientRect().top - zr.top - GAP / 2 };
    }
    const last = boxes[boxes.length - 1];
    if (last) return { col, page: pageIndex, index: list.indexOf(last.dataset.key as SectionKey) + 1, lineY: last.getBoundingClientRect().bottom - zr.top + GAP / 2 };
    return { col, page: pageIndex, index: list.length, lineY: 4 };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLElement>, key: SectionKey) => {
    if (e.button !== 0) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.setPointerCapture(e.pointerId);
    setDrag({ key, x: e.clientX, y: e.clientY, dx: e.clientX - r.left, dy: e.clientY - r.top, w: r.width, h: r.height });
    setTarget(null);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag) return;
    setDrag({ ...drag, x: e.clientX, y: e.clientY });
    setTarget(locate(e.clientX, e.clientY, drag.key));
  };
  const onPointerUp = () => {
    if (drag && target) moveTo(drag.key, target.col, target.index);
    setDrag(null);
    setTarget(null);
  };

  const onKey = (e: React.KeyboardEvent, key: SectionKey) => {
    const col = lists.findIndex((l) => l.includes(key));
    const index = lists[col].indexOf(key);
    let to: [number, number] | null = null;
    if (e.key === "ArrowUp" && index > 0) to = [col, index - 1];
    if (e.key === "ArrowDown" && index < lists[col].length - 1) to = [col, index + 1];
    if ((e.key === "ArrowLeft" || e.key === "ArrowRight") && cols.length > 1) {
      const other = e.key === "ArrowLeft" ? col - 1 : col + 1;
      if (other >= 0 && other < cols.length) to = [other, Math.min(index, lists[other].length)];
    }
    if (!to) return;
    e.preventDefault();
    moveTo(key, to[0], to[1]);
    setFocusKey(key);
  };

  const innerW = FRAME_W - INNER * 2;
  const totalW = cols.reduce((s, c) => s + c.width, 0);

  return (
    <div className="sgr-overlay" role="presentation" onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
      <div className="sgr-modal" role="dialog" aria-modal="true" aria-labelledby="sgr-title" ref={rootRef}>
        <button type="button" className="sgr-close" onClick={onClose} aria-label="Cerrar">
          <X aria-hidden="true" />
        </button>
        <h2 id="sgr-title" ref={titleRef} tabIndex={-1}>
          Mantén y arrastra las cajas para reorganizar las secciones
        </h2>
        <p className="sgr-help">Con el teclado: selecciona una caja y usa las flechas.</p>

        {model.map((pg, p) => (
          <div key={p} className="sgr-pageWrap">
            <p className="sgr-pageLabel">
              Página {p + 1} de {model.length}
            </p>
            <div className="sgr-page" style={{ width: FRAME_W, minHeight: page.height * K }}>
              {pg.top > 0 && (
                <div className="sgr-box sgr-locked" style={{ height: Math.max(MIN_BOX, pg.top * K - GAP) }}>
                  <Lock aria-hidden="true" className="sgr-lock" />
                  Encabezado
                </div>
              )}
              <div className="sgr-cols">
                {cols.map((c, ci) => (
                  <div key={ci} className="sgr-col" data-col={ci} data-page={p} style={{ width: (innerW - GAP * (cols.length - 1)) * (c.width / totalW) }}>
                    {pg.cols[ci].map((it, i) => {
                      const h = Math.max(MIN_BOX, it.h * K - GAP);
                      if (it.kind !== "section") {
                        return (
                          <div key={i} className="sgr-box sgr-locked" style={{ height: h }}>
                            <Lock aria-hidden="true" className="sgr-lock" />
                            {it.kind === "header" ? "Encabezado" : "Foto"}
                          </div>
                        );
                      }
                      const key = it.key!;
                      return (
                        <div
                          key={i}
                          className={drag?.key === key ? "sgr-box sgr-dragging" : "sgr-box"}
                          style={{ height: h }}
                          data-key={key}
                          role="button"
                          tabIndex={0}
                          aria-label={`${SECTION_TITLES[key]}: arrastra o usa las flechas para moverla`}
                          onPointerDown={(e) => onPointerDown(e, key)}
                          onKeyDown={(e) => onKey(e, key)}
                        >
                          <GripVertical aria-hidden="true" className="sgr-grip" />
                          <span className="sgr-name">{SECTION_TITLES[key]}</span>
                        </div>
                      );
                    })}
                    {target && target.col === ci && target.page === p && (
                      <div className="sgr-drop" style={{ top: target.lineY }} aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {hidden.length > 0 && (
          <div className="sgr-hidden">
            <p>Secciones quitadas:</p>
            {hidden.map((k) => (
              <button key={k} type="button" className="sgr-chip" onClick={() => moveTo(k, cols.findIndex((c) => c.role === "main"), Infinity)}>
                <Plus aria-hidden="true" /> {SECTION_TITLES[k]}
              </button>
            ))}
          </div>
        )}

        <button type="button" className="sgr-done" onClick={onClose}>
          Continuar Editando
        </button>
      </div>
      {drag && (
        <div className="sgr-box sgr-ghost" style={{ left: drag.x - drag.dx, top: drag.y - drag.dy, width: drag.w, height: drag.h }} aria-hidden="true">
          <GripVertical aria-hidden="true" className="sgr-grip" />
          <span className="sgr-name">{SECTION_TITLES[drag.key]}</span>
        </div>
      )}
    </div>
  );
}
