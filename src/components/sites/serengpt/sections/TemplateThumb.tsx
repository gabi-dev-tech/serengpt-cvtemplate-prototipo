"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { cx } from "../cx";
import { ResumePreview } from "../export/ResumePreview";
import { sampleResume } from "../export/sample";
import { page } from "../export/spec";
import type { TemplateConfig } from "../export/templates";
import "../export/export.css";

/** A4 page in CSS px (the preview lays pages out in pt). */
const PAGE_W_PX = (page.width * 4) / 3;

/** Live miniature of page 1 of the sample CV in a crear-cv template, scaled to the container width. */
export function TemplateThumb({ template, className, style }: { template: TemplateConfig; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / PAGE_W_PX);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={cx("B4068q_exampleImage", className)}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: `${page.width} / ${page.height}`,
        overflow: "hidden",
        background: "#fff",
        // Parents may center text or use nowrap; the CV keeps its own layout.
        textAlign: "left",
        whiteSpace: "normal",
        letterSpacing: "normal",
        pointerEvents: "none",
        ...style,
      }}
    >
      {scale > 0 && <ResumePreview data={sampleResume} template={template} scale={scale} />}
    </div>
  );
}
