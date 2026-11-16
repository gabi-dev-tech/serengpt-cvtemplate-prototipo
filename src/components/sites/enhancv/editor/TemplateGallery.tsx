"use client";

import { Check, X } from "lucide-react";
import { ResumePreview } from "../export/ResumePreview";
import { page } from "../export/spec";
import { templates, type TemplateConfig } from "../export/templates";
import type { ResumeData } from "../export/types";

const THUMB_W = 125;
const THUMB_SCALE = THUMB_W / ((page.width * 4) / 3);
const THUMB_H = Math.round(((page.height * 4) / 3) * THUMB_SCALE);

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
  return (
    <div className="sge-gallery">
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
