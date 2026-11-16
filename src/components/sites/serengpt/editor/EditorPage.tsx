"use client";

import { ArrowDownUp, Contrast, Download, Eye, FileText, LayoutTemplate, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../export/export.css";
import { downloadResumeDocx } from "../export/download";
import { EditContext, type EditApi } from "../export/editing";
import { ResumePreview, type Measurement } from "../export/ResumePreview";
import { page } from "../export/spec";
import { templateById, type TemplateConfig } from "../export/templates";
import type { PageAssignment, ResumeData } from "../export/types";
import { customize, defaultCustom, type Custom } from "./customize";
import { DesignPanel } from "./DesignPanel";
import { SerenNavbar } from "../SerenNavbar";
import "../topbar.css";
import "./editor.css";
import { photoFromFile } from "./photo";
import { ReorderModal } from "./ReorderModal";
import { SelectionLayer, type SelectionActions } from "./SelectionLayer";
import {
  addItem,
  bulletOf,
  clearState,
  getAt,
  insertBullet,
  loadState,
  moveItem,
  parseEntry,
  removeBullet,
  removeItem,
  saveState,
  setAt,
  type EditorState,
  type Selection,
} from "./state";
import { TemplateGallery } from "./TemplateGallery";

const PAGE_PX = (page.width * 4) / 3; // A4 width in CSS px at 100 %
const PAGE_MAX = 740; // width of the page in the reference editor at desktop sizes
const isNarrow = () => window.matchMedia("(max-width: 991px)").matches;
const TYPING_GROUP_MS = 1200;
/** Present state plus undo/redo stacks; consecutive typing in one field counts as one step. */
function useHistory(initial: () => EditorState) {
  const [h, setH] = useState(() => ({ past: [] as EditorState[], present: initial(), future: [] as EditorState[] }));
  const last = useRef<{ group: string; at: number } | null>(null);

  const commit = useCallback((update: (s: EditorState) => EditorState, group?: string) => {
    const now = Date.now();
    const merge = group && last.current?.group === group && now - last.current.at < TYPING_GROUP_MS;
    last.current = group ? { group, at: now } : null;
    setH((cur) => {
      const next = update(cur.present);
      if (next === cur.present) return cur;
      return merge ? { ...cur, present: next } : { past: [...cur.past, cur.present].slice(-100), present: next, future: [] };
    });
  }, []);
  const undo = useCallback(() => {
    last.current = null;
    setH((cur) => (cur.past.length ? { past: cur.past.slice(0, -1), present: cur.past[cur.past.length - 1], future: [cur.present, ...cur.future] } : cur));
  }, []);
  const redo = useCallback(() => {
    last.current = null;
    setH((cur) => (cur.future.length ? { past: [...cur.past, cur.present], present: cur.future[0], future: cur.future.slice(1) } : cur));
  }, []);
  const reset = useCallback((s: EditorState) => {
    last.current = null;
    setH((cur) => ({ past: [...cur.past, cur.present], present: s, future: [] }));
  }, []);
  return { state: h.present, commit, undo, redo, reset, canUndo: h.past.length > 0, canRedo: h.future.length > 0 };
}

/** CV editor (/es/crear-cv): edit in place, templates, design and section order, .docx download. */
export function EditorPage({ data: sample, initialTemplate }: { data: ResumeData; initialTemplate?: string }) {
  const history = useHistory(() => loadState() ?? { data: sample, custom: defaultCustom });
  const { state, commit } = history;
  const { data, custom } = state;

  const [template, setTemplate] = useState<TemplateConfig>(() => templateById(initialTemplate));
  const ct = useMemo(() => customize(template, custom), [template, custom]);

  // "auto": open on wide screens, closed on narrow ones (decided by CSS, so the first render matches).
  const [panel, setPanel] = useState<"auto" | "open" | "closed">("auto");
  const [panelKind, setPanelKind] = useState<"plantillas" | "diseno">("plantillas");
  const panelOpen = panel !== "closed";
  const [reorder, setReorder] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const [status, setStatus] = useState<"idle" | "working" | "error">("idle");
  const [error, setError] = useState("");
  const [scale, setScale] = useState(PAGE_MAX / PAGE_PX);
  const canvasRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // ---------- pagination ----------
  // The download uses a hidden copy without the empty-field hints; the visible one only drives the screen.
  const [finalPages, setFinalPages] = useState<{ data: ResumeData; t: TemplateConfig; pages: PageAssignment } | null>(null);
  const onFinalPaginate = useCallback((p: PageAssignment) => setFinalPages({ data, t: ct, pages: p }), [data, ct]);
  const ready = finalPages?.data === data && finalPages.t === ct;
  const [measurement, setMeasurement] = useState<Measurement | null>(null);

  // ---------- saving ----------
  useEffect(() => {
    const id = window.setTimeout(() => saveState(state), 300);
    return () => window.clearTimeout(id);
  }, [state]);

  // ---------- editing in place ----------
  const [selection, setSelection] = useState<Selection | null>(null);
  const [version, setVersion] = useState(0);
  const active = useRef<{ field: string; caret: number } | null>(null);
  const dataRef = useRef(data);
  useEffect(() => {
    dataRef.current = data;
  });

  /** Structural change: move the caret to `focus` (or nowhere) and let every field re-sync. */
  const restructure = useCallback(
    (update: (d: ResumeData) => ResumeData, focus: { field: string; caret: number } | null) => {
      active.current = focus;
      if (!focus && document.activeElement instanceof HTMLElement && document.activeElement.isContentEditable) document.activeElement.blur();
      commit((s) => ({ ...s, data: update(s.data) }));
      setVersion((v) => v + 1);
    },
    [commit],
  );

  const api: EditApi = useMemo(
    () => ({
      version,
      getActive: () => active.current,
      setActive: (a) => {
        active.current = a;
      },
      onInput: (field, text) => commit((s) => ({ ...s, data: setAt(s.data, field, text) }), `field:${field}`),
      onEnter: (field) => {
        const b = bulletOf(field);
        if (b) restructure((d) => insertBullet(d, b.exp, b.bullet + 1), { field: `experience.${b.exp}.bullets.${b.bullet + 1}`, caret: 0 });
        else (document.activeElement as HTMLElement | null)?.blur();
      },
      onBackspaceEmpty: (field) => {
        const b = bulletOf(field);
        if (!b) return;
        const prev = b.bullet > 0 ? `experience.${b.exp}.bullets.${b.bullet - 1}` : `experience.${b.exp}.role`;
        const caret = String(getAt(dataRef.current, prev) ?? "").length;
        restructure((d) => removeBullet(d, b.exp, b.bullet), { field: prev, caret });
      },
    }),
    [version, commit, restructure],
  );

  const actions: SelectionActions = useMemo(
    () => ({
      add: (sel) => {
        if (sel.kind === "header") return;
        const key = sel.key;
        if (key === "summary") return;
        const at = sel.kind === "item" ? sel.index + 1 : (dataRef.current[key] as unknown[]).length;
        const { focus } = addItem(dataRef.current, key, at);
        restructure((d) => addItem(d, key, at).data, { field: focus, caret: 0 });
        setSelection({ kind: "item", key, index: at });
      },
      remove: (sel) => {
        if (sel.kind === "item") {
          restructure((d) => removeItem(d, sel.key, sel.index), null);
        } else if (sel.kind === "section") {
          // Removing a section hides it (its text is kept); "Reorganizar secciones" brings it back.
          const s = ct.sections;
          commit((st) => ({
            ...st,
            custom: { ...st.custom, sections: { ...st.custom.sections, [template.id]: { main: s.main.filter((k) => k !== sel.key), side: s.side.filter((k) => k !== sel.key) } } },
          }));
        }
        setSelection(null);
      },
      move: (sel, delta) => {
        if (sel.kind !== "item") return;
        const moved = moveItem(dataRef.current, sel.key, sel.index, delta);
        restructure(() => moved.data, null);
        setSelection({ ...sel, index: moved.index });
      },
      setPeriod: (sel, value) => {
        if (sel.kind !== "item") return;
        restructure((d) => setAt(d, `${sel.key}.${sel.index}.period`, value), null);
      },
      pickPhoto: (file) => {
        photoFromFile(file)
          .then((url) => commit((s) => ({ ...s, data: { ...s.data, photo: url } })))
          .catch((e) => {
            setError(e instanceof Error ? e.message : String(e));
            setStatus("error");
          });
      },
      removePhoto: () => commit((s) => ({ ...s, data: { ...s.data, photo: undefined } })),
    }),
    [restructure, commit, ct.sections, template.id],
  );

  // Clicking text selects its entry; clicking anywhere else (outside the toolbar and popovers) clears it.
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      const el = e.target as HTMLElement;
      // Pointing anywhere but another field ends the editing of the current one (no focus restore).
      if (!el.closest(".sgx-edit")) active.current = null;
      if (el.closest(".sge-selBar, .sge-pop, .sgr-overlay, .sge-panel, .sge-tools, .sgn-header")) return;
      const hit = el.closest<HTMLElement>(".sgx-pagesView [data-entry]");
      setSelection(hit ? parseEntry(hit.dataset.entry!) : null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  // ---------- keyboard: undo/redo everywhere, Escape closes the innermost thing ----------
  const { undo, redo } = history;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      const inForm = (e.target as HTMLElement).closest("input, select, textarea");
      if (mod && !inForm && e.key.toLowerCase() === "z") {
        e.preventDefault();
        active.current = null;
        if (e.shiftKey) redo();
        else undo();
        setVersion((v) => v + 1);
      } else if (mod && !inForm && e.key.toLowerCase() === "y") {
        e.preventDefault();
        active.current = null;
        redo();
        setVersion((v) => v + 1);
      } else if (e.key === "Escape") {
        if (reorder) setReorder(false);
        else if (selection) setSelection(null);
        else if (panelOpen) setPanel("closed");
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [undo, redo, reorder, selection, panelOpen]);

  // ---------- layout ----------
  // The page keeps its A4 layout and is only zoomed to the width the canvas leaves free.
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const update = () => {
      const cs = getComputedStyle(el);
      const free = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      setScale(Math.max(0.2, Math.min(PAGE_MAX, free) / PAGE_PX));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [panelOpen, panelKind]);

  function chooseTemplate(t: TemplateConfig) {
    setTemplate(t);
    setSelection(null);
    const url = new URL(window.location.href);
    url.searchParams.set("plantilla", t.id);
    window.history.replaceState(null, "", url);
    if (isNarrow()) setPanel("closed");
  }

  function togglePanel(kind: "plantillas" | "diseno") {
    const showing = panelKind === kind && (panel === "open" || (panel === "auto" && !isNarrow()));
    setPanelKind(kind);
    setPanel(showing ? "closed" : "open");
  }

  async function download() {
    if (!finalPages || !ready) return;
    setStatus("working");
    setError("");
    try {
      await downloadResumeDocx(data, ct, finalPages.pages);
      setStatus("idle");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setStatus("error");
    }
  }

  const exportHref = `/es/exportar?plantilla=${template.id}`;
  const rootClass = ["sge-root", panel !== "closed" && "sge-panelOpen", panel === "auto" && "sge-panelAuto", panelKind === "diseno" && "sge-panelNarrow"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      <SerenNavbar />

      <nav className="sge-tools" aria-label="Herramientas del editor">
        <div className="sge-toolsLeft">
          <a href="/es" className="sge-home" aria-label="Volver al inicio">
            <span>← Inicio</span>
          </a>
          <span className="sge-sep" aria-hidden="true" />
          <span className="sge-doc">
            <FileText aria-hidden="true" />
            <span className="sge-docName">CV de {data.name || "sin nombre"}</span>
            <span className="sge-saved">(Guardado en este navegador)</span>
          </span>
        </div>
        <div className="sge-toolsCenter">
          <button type="button" className={reorder ? "sge-tool sge-toolActive" : "sge-tool"} aria-haspopup="dialog" onClick={() => setReorder(true)}>
            <ArrowDownUp aria-hidden="true" />
            <span className="sge-toolLabel">Reorganizar secciones</span>
          </button>
          <button
            type="button"
            className={panelOpen && panelKind === "plantillas" ? "sge-tool sge-toolActive" : "sge-tool"}
            aria-expanded={panelOpen && panelKind === "plantillas"}
            aria-controls="sge-templates"
            onClick={() => togglePanel("plantillas")}
          >
            <LayoutTemplate aria-hidden="true" />
            <span className="sge-toolLabel">Plantillas</span>
          </button>
          <button
            type="button"
            className={panelOpen && panelKind === "diseno" ? "sge-tool sge-toolActive" : "sge-tool"}
            aria-expanded={panelOpen && panelKind === "diseno"}
            aria-controls="sge-templates"
            onClick={() => togglePanel("diseno")}
          >
            <Contrast aria-hidden="true" />
            <span className="sge-toolLabel">Diseño y Fuente</span>
          </button>
        </div>
        <div className="sge-toolsRight">
          {confirmReset ? (
            <span className="sge-confirm" role="group" aria-label="Volver al CV de ejemplo">
              ¿Volver al CV de ejemplo?
              <button
                type="button"
                className="sge-ghost"
                onClick={() => {
                  clearState();
                  active.current = null;
                  history.reset({ data: sample, custom: defaultCustom });
                  setVersion((v) => v + 1);
                  setSelection(null);
                  setConfirmReset(false);
                }}
              >
                Sí
              </button>
              <button type="button" className="sge-ghost" onClick={() => setConfirmReset(false)}>
                No
              </button>
            </span>
          ) : (
            <button type="button" className="sge-tool sge-iconOnly sge-reset" title="Volver al CV de ejemplo" aria-label="Volver al CV de ejemplo" onClick={() => setConfirmReset(true)}>
              <RotateCcw aria-hidden="true" />
            </button>
          )}
          <button type="button" className="sge-primary" onClick={download} disabled={status === "working" || !ready}>
            <Download aria-hidden="true" />
            <span>{status === "working" ? "Generando…" : "Descargar .docx"}</span>
          </button>
        </div>
      </nav>
      {status === "error" && (
        <p className="sge-error" role="alert">
          {error}
        </p>
      )}

      {panelOpen && <div className="sge-backdrop" onClick={() => setPanel("closed")} aria-hidden="true" />}
      <aside id="sge-templates" className="sge-panel" hidden={!panelOpen} aria-label={panelKind === "plantillas" ? "Plantillas" : "Diseño y Fuente"}>
        {panelKind === "plantillas" ? (
          <TemplateGallery data={sample} value={template} onChange={chooseTemplate} onClose={() => setPanel("closed")} />
        ) : (
          <DesignPanel template={template} custom={custom} onChange={(c: Custom) => commit((s) => ({ ...s, custom: c }), "design")} onClose={() => setPanel("closed")} />
        )}
      </aside>

      <main className="sge-canvas" ref={canvasRef}>
        <div className="sge-paper" ref={paperRef} style={{ width: PAGE_PX * scale }}>
          <div className="sge-rail">
            <a className="sge-railBtn" href={exportHref} aria-label="Vista previa para exportar" title="Vista previa para exportar">
              <Eye aria-hidden="true" />
            </a>
            <button type="button" className="sge-railBtn" onClick={download} disabled={status === "working" || !ready} aria-label="Descargar .docx" title="Descargar .docx">
              <Download aria-hidden="true" />
            </button>
          </div>
          <div className="sge-preview" data-editor-preview ref={previewRef}>
            <EditContext.Provider value={api}>
              <ResumePreview data={data} template={ct} scale={scale} onMeasured={setMeasurement} pageLabels edit />
            </EditContext.Provider>
          </div>
          <SelectionLayer
            previewRef={previewRef}
            paperRef={paperRef}
            selection={selection}
            data={data}
            hasPhotoSlot={Boolean(ct.photo)}
            actions={actions}
          />
        </div>

        {/* What the .docx is built from: the same CV without the hints of empty fields. */}
        <div className="sge-offscreen" aria-hidden="true">
          <ResumePreview data={data} template={ct} onPaginate={onFinalPaginate} />
        </div>

        <footer className="sge-footer">
          <p className="sge-footerTag">
            <span>Diseñado para la empleabilidad de por vida.</span>
          </p>
          <div className="sge-footerRow">
            <p>© 2026 SerenGPT. Todos los derechos reservados.</p>
            <nav aria-label="Enlaces del pie">
              <a href="/es/exportar?muestra=larga">Ejemplos de CV</a>
              <span aria-hidden="true">·</span>
              <a href="https://serengpt.ai/es/blog">Blog</a>
              <span aria-hidden="true">·</span>
              <a href="https://serengpt.ai/es/privacy-policy">Privacidad</a>
              <span aria-hidden="true">·</span>
              <a href="https://serengpt.ai/es/contacts">Contacto</a>
            </nav>
          </div>
        </footer>
      </main>

      {reorder && (
        <ReorderModal
          template={ct}
          measurement={measurement}
          onChange={(sections) => commit((s) => ({ ...s, custom: { ...s.custom, sections: { ...s.custom.sections, [template.id]: sections } } }))}
          onClose={() => setReorder(false)}
        />
      )}
    </div>
  );
}
