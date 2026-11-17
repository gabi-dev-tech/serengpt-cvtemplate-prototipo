"use client";

/* eslint-disable @next/next/no-img-element -- the photo is drawn at a fixed position, exactly like the .docx anchor */
import { Fragment, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { buildLayout, decorationsFor } from "./blocks";
import { EditableText } from "./editing";
import { paginate } from "./paginate";
import { cssFamily, page } from "./spec";
import { columnsOf, contentHeight, fontsOf, type TemplateConfig } from "./templates";
import type { Block, Layout, PageAssignment, ResumeData, TextRun } from "./types";

const PX_TO_PT = 0.75;

function TextSpan({ run, editable }: { run: TextRun; editable?: boolean }) {
  const style: CSSProperties = {
    fontFamily: cssFamily[run.font],
    fontWeight: run.bold ? 700 : 400,
    fontSize: `${run.size}pt`,
    color: `#${run.color}`,
    letterSpacing: run.letterSpacing ? `${run.letterSpacing}pt` : undefined,
  };
  if (editable && run.field) return <EditableText run={run} style={style} />;
  // Empty fields show their hint (editor only); the measuring copy prints it too, so both take the same room.
  return (
    <span style={style} data-entry={editable ? run.entry : undefined} className={run.placeholder ? "sgx-hint" : undefined}>
      {run.text || run.placeholder}
    </span>
  );
}

const texts = (runs: Extract<Block, { kind: "paragraph" }>["runs"]) => runs.filter((r): r is TextRun => r.kind === "text");

function BlockView({ block, editable }: { block: Block; editable?: boolean }) {
  if (block.kind === "spacer") return <div style={{ height: `${block.height}pt` }} />;
  if (block.kind === "rule")
    return (
      <div
        style={{
          height: `${block.thickness}pt`,
          marginLeft: `${block.indentLeft}pt`,
          marginRight: `${block.indentRight}pt`,
          marginBottom: `${block.spaceAfter}pt`,
          background: `#${block.color}`,
        }}
      />
    );

  // Lines use an exact height. Word 2013+ (compatibility mode 15, which the .docx declares) centers the
  // text inside such lines, like CSS line-height does, and the template fonts share one set of metrics.
  const first = texts(block.runs)[0];
  const style: CSSProperties = {
    lineHeight: `${block.lineHeight}pt`,
    fontFamily: first ? cssFamily[first.font] : undefined,
    fontSize: first ? `${first.size}pt` : undefined,
    fontWeight: first?.bold ? 700 : 400,
    paddingLeft: `${block.indentLeft}pt`,
    paddingRight: `${block.indentRight}pt`,
    marginBottom: `${block.spaceAfter}pt`,
    textAlign: block.align === "center" ? "center" : undefined,
  };
  const tab = block.runs.findIndex((r) => r.kind === "tab");
  const before = texts(tab >= 0 ? block.runs.slice(0, tab) : block.runs);
  const after = tab >= 0 ? texts(block.runs.slice(tab + 1)) : [];

  if (block.hanging) {
    // The runs before the tab sit in the hanging indent (bullet glyph or timeline date).
    return (
      <p className="sgx-p" style={{ ...style, textIndent: `-${block.hanging}pt` }}>
        <span className="sgx-hang" style={{ width: `${block.hanging}pt` }}>
          {before.map((r, i) => (
            <TextSpan key={i} run={r} editable={editable} />
          ))}
        </span>
        {after.map((r, i) => (
          <TextSpan key={i} run={r} editable={editable} />
        ))}
      </p>
    );
  }
  if (block.rightTab) {
    return (
      <p className="sgx-p sgx-tabRow" style={style}>
        <span>{before.map((r, i) => <TextSpan key={i} run={r} editable={editable} />)}</span>
        <span>{after.map((r, i) => <TextSpan key={i} run={r} editable={editable} />)}</span>
      </p>
    );
  }
  return (
    <p className="sgx-p" style={style}>
      {texts(block.runs).map((r, i) => (
        <TextSpan key={i} run={r} editable={editable} />
      ))}
    </p>
  );
}

const heightsOf = (el: HTMLElement | null) =>
  Array.from(el?.children ?? []).map((c) => (c as HTMLElement).getBoundingClientRect().height * PX_TO_PT);
const afterOf = (b: Block) => (b.kind === "spacer" ? 0 : b.spaceAfter);

/** Same number of blocks everywhere: an older pagination still points at valid blocks (e.g. while typing). */
const sameShape = (a: Layout, b: Layout) =>
  a.top.length === b.top.length && a.columns.length === b.columns.length && a.columns.every((c, i) => c.length === b.columns[i].length);

/** What the preview measured: block heights (pt, without space after) and the pagination built from them. */
export type Measurement = { layout: Layout; pages: PageAssignment; heights: { top: number[]; columns: number[][] } };

/** A4 pages laid out with the template; the pagination is reported so the .docx can break at the same places. */
export function ResumePreview({
  data,
  template,
  scale = 1,
  onPaginate,
  onMeasured,
  pageLabels = false,
  edit = false,
}: {
  data: ResumeData;
  template: TemplateConfig;
  /** Visual zoom for narrow screens; measuring always happens at full size. */
  scale?: number;
  onPaginate?: (pages: PageAssignment) => void;
  onMeasured?: (m: Measurement) => void;
  /** Draws a "Página N" separator above every page after the first (editor view). */
  pageLabels?: boolean;
  /** Editor view: every field is editable in place and empty fields show a hint. */
  edit?: boolean;
}) {
  const layout = useMemo(() => buildLayout(data, template, { edit }), [data, template, edit]);
  const cols = useMemo(() => columnsOf(template), [template]);
  const topRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  // The view is scaled with a transform, which does not shrink its layout box, so the frame around it
  // takes the scaled size. Its unscaled height is observed (page count and labels change it).
  const viewRef = useRef<HTMLDivElement>(null);
  const [viewHeight, setViewHeight] = useState(0);
  useLayoutEffect(() => {
    const el = viewRef.current;
    if (!el) return;
    const update = () => setViewHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  // Pagination is only valid for the layout it was measured on; after a template change the
  // previous one would point at blocks that no longer exist, so it is ignored until re-measured.
  const [measured, setMeasured] = useState<{ layout: Layout; pages: PageAssignment } | null>(null);
  const pages = measured && (measured.layout === layout || sameShape(measured.layout, layout)) ? measured.pages : null;

  useLayoutEffect(() => {
    let cancelled = false;
    const measure = () => {
      if (cancelled) return;
      const topHeights = heightsOf(topRef.current);
      const topHeight = layout.top.reduce((sum, b, i) => sum + topHeights[i] + afterOf(b), 0);
      const avail = contentHeight(template);
      const colHeights = layout.columns.map((_, ci) => heightsOf(colRefs.current[ci]));
      const next: PageAssignment = {
        topHeight,
        columns: layout.columns.map((blocks, ci) => paginate(blocks, colHeights[ci], avail - topHeight, avail)),
      };
      setMeasured({ layout, pages: next });
      onPaginate?.(next);
      onMeasured?.({ layout, pages: next, heights: { top: topHeights, columns: colHeights } });
    };
    // Heights depend on the template fonts. Once they are loaded (every edit after the first paint),
    // measure before the browser paints, so typing never shows an unpaginated frame.
    const loaded = fontsOf(template).every((f) => document.fonts.check(`400 12px "${cssFamily[f]}"`) && document.fonts.check(`700 12px "${cssFamily[f]}"`));
    if (loaded) measure();
    else document.fonts.ready.then(measure);
    return () => {
      cancelled = true;
    };
  }, [layout, template, onPaginate, onMeasured]);

  const pageCount = pages ? Math.max(1, ...pages.columns.map((c) => c.length)) : 1;
  const topHeight = pages?.topHeight ?? 0;

  return (
    <div className="sgx-pages" data-template={template.id} data-pagination={pages ? JSON.stringify(pages) : undefined}>
      {/* Off-screen copy used only to measure block heights at the real widths. */}
      <div className="sgx-measure" aria-hidden="true">
        <div ref={topRef} style={{ width: `${page.width}pt` }}>
          {layout.top.map((b, i) => (
            <BlockView key={i} block={b} />
          ))}
        </div>
        {cols.map((c, ci) => (
          <div
            key={ci}
            ref={(el) => {
              colRefs.current[ci] = el;
            }}
            style={{ width: `${c.width}pt` }}
          >
            {layout.columns[ci].map((b, i) => (
              <BlockView key={i} block={b} />
            ))}
          </div>
        ))}
      </div>

      {/* Scaled with transform, not `zoom`: Safari clamps zoomed text to its minimum font size (9px)
          while line heights keep shrinking, so small previews (thumbnails, phones) overlap their lines. */}
      <div className="sgx-pagesFrame" style={{ width: `${page.width * scale}pt`, height: viewHeight ? viewHeight * scale : undefined }}>
      <div
        className="sgx-pagesView"
        ref={viewRef}
        style={{ width: `${page.width}pt`, transform: scale !== 1 ? `scale(${scale})` : undefined, transformOrigin: "0 0" }}
      >
      {Array.from({ length: pageCount }, (_, p) => {
        const { rects, photo } = decorationsFor(template, p, topHeight);
        const bodyTop = template.margins.top + (p === 0 ? topHeight : 0);
        return (
          <Fragment key={p}>
          {pageLabels && p > 0 && (
            <div className="sgx-pageLabel" aria-hidden="true">
              <span>Página {p + 1}</span>
            </div>
          )}
          <div
            className="sgx-page"
            data-page={p + 1}
            style={{ width: `${page.width}pt`, height: `${page.height}pt`, visibility: pages ? undefined : "hidden" }}
          >
            {rects.map((r, i) => (
              <div
                key={i}
                className="sgx-rect"
                style={{ left: `${r.x}pt`, top: `${r.y}pt`, width: `${r.w}pt`, height: `${r.h}pt`, background: `#${r.color}` }}
              />
            ))}
            {photo && data.photo && (
              <img
                className="sgx-photo"
                src={data.photo}
                alt={data.name}
                data-entry={edit ? "header" : undefined}
                style={{ left: `${photo.x}pt`, top: `${photo.y}pt`, width: `${photo.size}pt`, height: `${photo.size}pt` }}
              />
            )}
            {p === 0 && layout.top.length > 0 && (
              <div className="sgx-col" style={{ left: 0, top: `${template.margins.top}pt`, width: `${page.width}pt` }}>
                {layout.top.map((b, i) => (
                  <BlockView key={i} block={b} editable={edit} />
                ))}
              </div>
            )}
            {cols.map((c, ci) => {
              const blocks = pages ? (pages.columns[ci][p] ?? []).map((i) => layout.columns[ci][i]) : layout.columns[ci];
              return (
                <div key={ci} className="sgx-col" style={{ left: `${c.x}pt`, top: `${bodyTop}pt`, width: `${c.width}pt` }}>
                  {blocks.map((b, i) => (
                    <BlockView key={i} block={b} editable={edit} />
                  ))}
                </div>
              );
            })}
          </div>
          </Fragment>
        );
      })}
      </div>
      </div>
    </div>
  );
}
