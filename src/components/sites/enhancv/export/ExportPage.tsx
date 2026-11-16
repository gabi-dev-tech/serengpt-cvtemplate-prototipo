"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./export.css";
import { ResumePreview } from "./ResumePreview";
import { downloadResumeDocx } from "./download";
import { page } from "./spec";
import { TemplatePicker } from "./TemplatePicker";
import { templateById, type TemplateConfig } from "./templates";
import type { PageAssignment, ResumeData } from "./types";

const PAGE_WIDTH_PX = (page.width * 4) / 3;

/** Preview of the CV, template picker and the "Descargar .docx" action. */
export function ExportPage({ data, initialTemplate }: { data: ResumeData; initialTemplate?: string }) {
  const [template, setTemplate] = useState<TemplateConfig>(() => templateById(initialTemplate));
  const [status, setStatus] = useState<"idle" | "working" | "error">("idle");
  const [error, setError] = useState("");
  const [scale, setScale] = useState(1);
  const [pages, setPages] = useState<{ id: string; value: PageAssignment } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const onPaginate = useCallback((p: PageAssignment) => setPages({ id: template.id, value: p }), [template.id]);
  const ready = pages?.id === template.id;

  // Fit the A4 page to narrow screens; the page itself is always laid out at full size.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, (el.clientWidth - 32) / PAGE_WIDTH_PX));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  function chooseTemplate(t: TemplateConfig) {
    setTemplate(t);
    // Keep the choice in the URL (shareable, survives reloads) without a navigation.
    const url = new URL(window.location.href);
    url.searchParams.set("plantilla", t.id);
    window.history.replaceState(null, "", url);
  }

  async function download() {
    if (!pages || !ready) return;
    setStatus("working");
    setError("");
    try {
      await downloadResumeDocx(data, template, pages.value);
      setStatus("idle");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setStatus("error");
    }
  }

  return (
    <div className="sgx-root">
      <div className="sgx-toolbar">
        <div className="sgx-toolbarInner">
          <a className="sgx-logo" href="/es" aria-label="Inicio de SerenGPT">
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG logo */}
            <img src="/sites/serengpt/serengpt-logo-ink.svg" alt="SerenGPT" width="110" height="28" />
          </a>
          <a className="sgx-back" href="/es">
            ← Volver
          </a>
          <div className="sgx-title">
            <strong>Exportar CV</strong>
            <span>Vista previa A4 · el .docx sale igual</span>
          </div>
          <TemplatePicker value={template} onChange={chooseTemplate} />
          <button type="button" className="sgx-download" onClick={download} disabled={status === "working" || !ready}>
            {status === "working" ? "Generando…" : "Descargar .docx"}
          </button>
        </div>
        {status === "error" && <p className="sgx-error">No se pudo generar el archivo: {error}</p>}
      </div>
      <div className="sgx-stage" ref={stageRef}>
        <div className="sgx-zoom">
          <ResumePreview data={data} template={template} scale={scale} onPaginate={onPaginate} />
        </div>
      </div>
    </div>
  );
}
