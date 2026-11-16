"use client";

import { Check, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { ResumePreview } from "../export/ResumePreview";
import { page } from "../export/spec";
import { templates, type TemplateConfig } from "../export/templates";
import type { ResumeData } from "../export/types";

const THUMB_W = 125;
const THUMB_SCALE = THUMB_W / ((page.width * 4) / 3);
const THUMB_H = Math.round(((page.height * 4) / 3) * THUMB_SCALE);

// #region agent log
function debugProbeThumbs(root: HTMLElement | null, runId: string) {
  if (!root) return;
  const send = (hypothesisId: string, message: string, data: unknown) =>
    fetch('/agent-debug-log',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'edd178'},body:JSON.stringify({sessionId:'edd178',runId,hypothesisId,location:'TemplateGallery.tsx:debugProbeThumbs',message,data,timestamp:Date.now()})}).catch(()=>{});
  const htmlCs = getComputedStyle(document.documentElement) as CSSStyleDeclaration & { webkitTextSizeAdjust?: string };
  send("A,B,C,D,E", "env", { ua: navigator.userAgent, supportsZoom: CSS.supports("zoom", "0.5"), innerWidth: window.innerWidth, dpr: window.devicePixelRatio, vvScale: window.visualViewport?.scale, htmlTSA: htmlCs.webkitTextSizeAdjust ?? htmlCs.getPropertyValue("-webkit-text-size-adjust"), fontsStatus: document.fonts.status, thumbScale: THUMB_SCALE });
  const thumbs = Array.from(root.querySelectorAll<HTMLElement>(".sge-thumb")).slice(0, 3);
  thumbs.forEach((thumb) => {
    const view = thumb.querySelector<HTMLElement>(".sgx-pagesView");
    const pageEl = thumb.querySelector<HTMLElement>(".sgx-page");
    const measure = thumb.querySelector<HTMLElement>(".sgx-measure");
    const span = thumb.querySelector<HTMLElement>(".sgx-page .sgx-p span");
    const mSpan = measure?.querySelector<HTMLElement>(".sgx-p span");
    if (!view || !pageEl || !span || !mSpan) return send("D", "missing nodes", { view: !!view, pageEl: !!pageEl, span: !!span, mSpan: !!mSpan });
    const read = () => {
      const sr = span.getBoundingClientRect();
      const mr = mSpan.getBoundingClientRect();
      return { spanW: +sr.width.toFixed(2), spanH: +sr.height.toFixed(2), expectedW: +(mr.width * THUMB_SCALE).toFixed(2), widthRatio: +(sr.width / (mr.width * THUMB_SCALE)).toFixed(3), pRectH: +span.closest("p")!.getBoundingClientRect().height.toFixed(2), pExpectedH: +(mSpan.closest("p")!.getBoundingClientRect().height * THUMB_SCALE).toFixed(2) };
    };
    const cs = getComputedStyle(span) as CSSStyleDeclaration & { webkitTextSizeAdjust?: string };
    const before = read();
    thumb.style.setProperty("-webkit-text-size-adjust", "none");
    thumb.style.setProperty("text-size-adjust", "none");
    const withTSAnone = read();
    thumb.style.removeProperty("-webkit-text-size-adjust");
    thumb.style.removeProperty("text-size-adjust");
    send("A,B,C,D,E", "thumb probe", {
      template: view.parentElement?.getAttribute("data-template"),
      text: span.textContent?.slice(0, 30),
      viewZoom: getComputedStyle(view).getPropertyValue("zoom"),
      spanInlineFont: span.style.fontSize, spanComputedFont: cs.fontSize, spanComputedLH: getComputedStyle(span.closest("p")!).lineHeight, spanFamily: cs.fontFamily, spanTSA: cs.webkitTextSizeAdjust ?? cs.getPropertyValue("-webkit-text-size-adjust"),
      thumbW: thumb.clientWidth, pageRectW: +pageEl.getBoundingClientRect().width.toFixed(2),
      before, withTSAnone,
    });
  });
}
// #endregion

/** Templates panel: a real miniature of page 1 of the CV in every template. */
export function TemplateGallery({
  data,
  value,
  onChange,
  onClose,
}: {
  data: ResumeData;
  value: TemplateConfig;
  onChange: (t: TemplateConfig) => void;
  onClose: () => void;
}) {
  // #region agent log
  const debugRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let cancelled = false;
    document.fonts.ready.then(() => requestAnimationFrame(() => requestAnimationFrame(() => { if (!cancelled) debugProbeThumbs(debugRef.current, "run1"); })));
    return () => { cancelled = true; };
  }, []);
  // #endregion
  return (
    <div className="sge-gallery" ref={debugRef}>
      <button type="button" className="sge-close" onClick={onClose} aria-label="Cerrar plantillas">
        <X aria-hidden="true" />
      </button>
      <div className="sge-grid" role="listbox" aria-label="Plantillas de CV">
        {templates.map((t) => {
          const selected = t.id === value.id;
          return (
            <button
              key={t.id}
              type="button"
              role="option"
              aria-selected={selected}
              className="sge-item"
              title={t.summary}
              onClick={() => onChange(t)}
            >
              <span className="sge-thumb" style={{ width: THUMB_W, height: THUMB_H }}>
                <ResumePreview data={data} template={t} scale={THUMB_SCALE} />
                {selected && (
                  <span className="sge-check" aria-hidden="true">
                    <Check />
                  </span>
                )}
              </span>
              <span className="sge-itemName">{t.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
