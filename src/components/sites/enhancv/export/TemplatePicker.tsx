"use client";

import { useEffect, useRef, useState } from "react";
import { decorationsFor } from "./blocks";
import { page } from "./spec";
import { columnsOf, templates, type TemplateConfig } from "./templates";

const THUMB_W = 96;
const K = THUMB_W / page.width; // pt -> thumbnail px

/** Schematic miniature of a template: its decorations, columns and heading color. */
function Thumb({ t }: { t: TemplateConfig }) {
  const estTop = t.header.placement === "top" ? 70 : 0;
  const { rects, photo } = decorationsFor(t, 0, estTop);
  const cols = columnsOf(t);
  const lines = (n: number, color: string, wide = 1) =>
    Array.from({ length: n }, (_, i) => (
      <span key={i} className="sgx-thumbLine" style={{ background: `#${color}`, width: `${(i % 3 === 2 ? 60 : 90) * wide}%` }} />
    ));
  return (
    <span className="sgx-thumb" style={{ width: THUMB_W, height: page.height * K }} aria-hidden="true">
      {rects.map((r, i) => (
        <span key={i} className="sgx-thumbRect" style={{ left: r.x * K, top: r.y * K, width: Math.max(1, r.w * K), height: r.h * K, background: `#${r.color}` }} />
      ))}
      {photo && (
        <span className="sgx-thumbPhoto" style={{ left: photo.x * K, top: photo.y * K, width: photo.size * K, height: photo.size * K }} />
      )}
      {t.header.placement === "top" && (
        <span className="sgx-thumbCol" style={{ left: t.pad.top[0] * K, right: t.pad.top[1] * K, top: t.margins.top * K, alignItems: t.header.align === "center" ? "center" : "flex-start" }}>
          <span className="sgx-thumbName" style={{ background: `#${t.style.name.color}` }} />
          <span className="sgx-thumbLine" style={{ background: `#${t.style.title.color}`, width: "45%" }} />
        </span>
      )}
      {cols.map((c, i) => {
        const side = c.role === "side";
        const [pl, pr] = side ? t.pad.side : t.pad.main;
        const top = (t.margins.top + estTop + (side && t.photo ? t.photo.top + t.photo.size - t.margins.top + 8 : 0)) * K;
        const text = side ? t.style.side.text.color : "C9CED6";
        const heading = side ? t.style.sideHeading.color : t.style.heading.color;
        return (
          <span key={i} className="sgx-thumbCol" style={{ left: (c.x + pl) * K, width: (c.width - pl - pr) * K, top }}>
            {!side && t.header.placement === "main" && <span className="sgx-thumbName" style={{ background: `#${t.style.name.color}` }} />}
            {[0, 1, 2].map((s) => (
              <span key={s} className="sgx-thumbSection">
                <span className="sgx-thumbHeading" style={{ background: `#${heading}` }} />
                {lines(side ? 3 : 4, side && t.sidebarColor ? text : "C9CED6")}
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
}

/** "Plantilla" button with a popover listing every template. */
export function TemplatePicker({ value, onChange }: { value: TemplateConfig; onChange: (t: TemplateConfig) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="sgx-picker" ref={ref}>
      <button type="button" className="sgx-pickerButton" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="sgx-pickerLabel">Plantilla</span>
        <span className="sgx-pickerValue">{value.name}</span>
        <span aria-hidden="true" className="sgx-pickerChevron">
          ▾
        </span>
      </button>
      {open && (
        <div className="sgx-pickerPanel" role="listbox" aria-label="Plantillas de CV">
          {templates.map((t) => (
            <button
              key={t.id}
              type="button"
              role="option"
              aria-selected={t.id === value.id}
              className="sgx-pickerItem"
              onClick={() => {
                onChange(t);
                setOpen(false);
              }}
            >
              <Thumb t={t} />
              <span className="sgx-pickerText">
                <strong>{t.name}</strong>
                <span>{t.summary}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
