"use client";

import { Check, Plus, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { cssFamily } from "../export/spec";
import { fontsOf, type TemplateConfig } from "../export/templates";
import {
  accentOf,
  FONTS,
  LINE_STEPS,
  MARGIN_STEPS,
  PALETTE,
  SECTION_STEPS,
  SIZE_STEPS,
  type Custom,
  type Design,
} from "./customize";

const num = (v: number) => v.toLocaleString("es-ES", { maximumFractionDigits: 2 });

function Slider({
  id,
  label,
  value,
  max,
  onChange,
  left,
  right,
  minus = "−",
  plus = "+",
}: {
  id: string;
  label: string;
  value: number;
  max: number;
  onChange: (v: number) => void;
  left?: string;
  right?: string;
  minus?: React.ReactNode;
  plus?: React.ReactNode;
}) {
  return (
    <div className="sgd-group">
      <label className="sgd-label" htmlFor={id}>
        {label}
      </label>
      <div className="sgd-slider">
        <button type="button" className="sgd-step" aria-label="Menos" disabled={value <= 0} onClick={() => onChange(value - 1)}>
          {minus}
        </button>
        <input
          id={id}
          type="range"
          min={0}
          max={max}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ ["--sgd-ticks" as string]: max }}
        />
        <button type="button" className="sgd-step" aria-label="Más" disabled={value >= max} onClick={() => onChange(value + 1)}>
          {plus}
        </button>
      </div>
      {(left || right) && (
        <div className="sgd-ends" aria-hidden="true">
          <span>{left}</span>
          <span>{right}</span>
        </div>
      )}
    </div>
  );
}

function Swatch({ color, selected, onClick, label, onRemove }: { color: string; selected: boolean; onClick: () => void; label: string; onRemove?: () => void }) {
  return (
    <span className="sgd-swatchWrap">
      <button type="button" className="sgd-swatch" style={{ background: `#${color}` }} aria-label={label} aria-pressed={selected} title={label} onClick={onClick}>
        {selected && <Check aria-hidden="true" />}
      </button>
      {onRemove && (
        <button type="button" className="sgd-swatchRemove" aria-label={`Quitar ${label}`} onClick={onRemove}>
          <X aria-hidden="true" />
        </button>
      )}
    </span>
  );
}

/** "Diseño y Fuente": margins, section spacing, accent color, font, size and line spacing. */
export function DesignPanel({
  template,
  custom,
  onChange,
  onClose,
}: {
  template: TemplateConfig;
  custom: Custom;
  onChange: (c: Custom) => void;
  onClose: () => void;
}) {
  const d = custom.design;
  const colorRef = useRef<HTMLInputElement>(null);
  const set = (patch: Partial<Design>) => onChange({ ...custom, design: { ...d, ...patch } });
  const own = accentOf(template);
  const current = d.color ?? own;
  const pairing = fontsOf(template).join(" + ");

  // The picker previews while it is dragged (input events) and keeps the color when it closes (change event).
  const latest = useRef({ custom, onChange });
  useEffect(() => {
    latest.current = { custom, onChange };
  });
  useEffect(() => {
    const el = colorRef.current;
    if (!el) return;
    const done = () => {
      const { custom: c, onChange: emit } = latest.current;
      const color = el.value.replace("#", "").toUpperCase();
      emit({ ...c, customColors: c.customColors.includes(color) ? c.customColors : [...c.customColors, color], design: { ...c.design, color } });
    };
    el.addEventListener("change", done);
    return () => el.removeEventListener("change", done);
  }, []);

  return (
    <div className="sgd">
      <div className="sgd-head">
        <span />
        <h2>Diseño y Fuente</h2>
        <button type="button" className="sge-close" onClick={onClose} aria-label="Cerrar diseño y fuente">
          <X aria-hidden="true" />
        </button>
      </div>

      <section className="sgd-block">
        <Slider
          id="sgd-margins"
          label={`Márgenes de página: ${num(MARGIN_STEPS[d.margins])}`}
          value={d.margins}
          max={MARGIN_STEPS.length - 1}
          onChange={(v) => set({ margins: v })}
          left="estrecho"
          right="ancho"
        />
        <Slider
          id="sgd-sections"
          label={`Espaciado de sección: ${num(SECTION_STEPS[d.sectionGap])}`}
          value={d.sectionGap}
          max={SECTION_STEPS.length - 1}
          onChange={(v) => set({ sectionGap: v })}
          left="compacto"
          right="más espacio"
        />
      </section>

      <section className="sgd-block">
        <p className="sgd-label">Colores</p>
        <div className="sgd-swatches">
          <Swatch color={own} label="Color de la plantilla" selected={current === own} onClick={() => set({ color: null })} />
          {PALETTE.filter((c) => c !== own).map((c) => (
            <Swatch key={c} color={c} label={`Color #${c}`} selected={current === c} onClick={() => set({ color: c })} />
          ))}
          {custom.customColors.map((c) => (
            <Swatch
              key={`custom-${c}`}
              color={c}
              label={`Color personalizado #${c}`}
              selected={current === c}
              onClick={() => set({ color: c })}
              onRemove={() =>
                onChange({
                  ...custom,
                  customColors: custom.customColors.filter((x) => x !== c),
                  design: { ...d, color: d.color === c ? null : d.color },
                })
              }
            />
          ))}
          <button type="button" className="sgd-add" aria-label="Añadir color" title="Añadir color" onClick={() => colorRef.current?.click()}>
            <Plus aria-hidden="true" />
          </button>
          <input
            ref={colorRef}
            type="color"
            className="sgd-colorInput"
            aria-label="Elegir color"
            defaultValue={`#${current}`}
            onChange={(e) => set({ color: e.target.value.replace("#", "").toUpperCase() })}
          />
        </div>
      </section>

      <section className="sgd-block">
        <label className="sgd-label" htmlFor="sgd-font">
          Estilo de fuente
        </label>
        <select
          id="sgd-font"
          className="sgd-select"
          value={d.font ?? ""}
          onChange={(e) => set({ font: (e.target.value || null) as Design["font"] })}
          style={{ fontFamily: d.font ? cssFamily[d.font] : undefined }}
        >
          <option value="">De la plantilla ({pairing})</option>
          {FONTS.map((f) => (
            <option key={f} value={f} style={{ fontFamily: cssFamily[f] }}>
              {f}
            </option>
          ))}
        </select>
        <Slider
          id="sgd-size"
          label={`Tamaño de fuente: ${SIZE_STEPS[d.size].label}`}
          value={d.size}
          max={SIZE_STEPS.length - 1}
          onChange={(v) => set({ size: v })}
          minus={
            <>
              − <span className="sgd-a sgd-aSmall">A</span>
            </>
          }
          plus={
            <>
              + <span className="sgd-a">A</span>
            </>
          }
        />
        <Slider
          id="sgd-line"
          label={`Interlineado: ${num(LINE_STEPS[d.line])}`}
          value={d.line}
          max={LINE_STEPS.length - 1}
          onChange={(v) => set({ line: v })}
          left="condensado"
          right="espacioso"
        />
      </section>
    </div>
  );
}
