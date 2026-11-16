"use client";

import { createContext, useContext, useLayoutEffect, useRef, type CSSProperties } from "react";
import type { TextRun } from "./types";

/** What the editor needs from every editable text of the preview. */
export type EditApi = {
  /** Field being edited and its caret; kept outside React so a field that remounts (new page) gets it back. */
  getActive(): { field: string; caret: number } | null;
  setActive(active: { field: string; caret: number } | null): void;
  /** Bumped by the editor after changes made outside the field (undo, new bullet…), so fields re-sync. */
  version: number;
  onInput(field: string, text: string): void;
  onEnter(field: string): void;
  onBackspaceEmpty(field: string): void;
};

export const EditContext = createContext<EditApi | null>(null);

export function caretOf(el: HTMLElement): number {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0 || !el.contains(sel.anchorNode)) return (el.textContent ?? "").length;
  const range = sel.getRangeAt(0).cloneRange();
  range.selectNodeContents(el);
  range.setEnd(sel.anchorNode!, sel.anchorOffset);
  return range.toString().length;
}

export function placeCaret(el: HTMLElement, offset: number) {
  const sel = window.getSelection();
  if (!sel) return;
  const range = document.createRange();
  const node = el.firstChild;
  if (node && node.nodeType === Node.TEXT_NODE) range.setStart(node, Math.min(offset, node.textContent?.length ?? 0));
  else range.setStart(el, 0);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}

/**
 * A run of the CV that can be edited in place. Its text is written by hand (not as React children), so
 * typing never fights React: the DOM is only overwritten while the field is not being edited.
 */
export function EditableText({ run, style }: { run: TextRun; style: CSSProperties }) {
  const api = useContext(EditContext)!;
  const ref = useRef<HTMLSpanElement>(null);
  const field = run.field!;

  // Keep the DOM in sync with the data (also after an outside change such as undo).
  useLayoutEffect(() => {
    const el = ref.current!;
    if (el.textContent !== run.text) {
      el.textContent = run.text;
      if (document.activeElement === el) placeCaret(el, run.text.length);
    }
  }, [run.text, api, field]);

  // Give the caret back to the field being edited when it remounts (its block moved page) or was just
  // created (new bullet). Runs after every render: while the preview re-paginates the page is hidden
  // and cannot take focus, so it retries on the next render.
  useLayoutEffect(() => {
    const el = ref.current!;
    const a = api.getActive();
    if (!a || a.field !== field || document.activeElement === el) return;
    if (el.closest<HTMLElement>(".sgx-page")?.style.visibility === "hidden") return;
    el.focus({ preventScroll: true });
    placeCaret(el, a.caret);
  });

  const remember = () => api.setActive({ field, caret: caretOf(ref.current!) });

  return (
    <span
      ref={ref}
      className="sgx-edit"
      style={style}
      contentEditable="plaintext-only"
      suppressContentEditableWarning
      spellCheck
      role="textbox"
      aria-label={run.placeholder ?? field}
      data-field={field}
      data-entry={run.entry}
      data-placeholder={run.placeholder}
      onFocus={remember}
      onKeyUp={remember}
      onMouseUp={remember}
      onInput={(e) => {
        const el = e.currentTarget;
        let text = el.textContent ?? "";
        if (/[\r\n]/.test(text)) {
          // One line per field: pasted line breaks become spaces.
          const caret = caretOf(el);
          text = text.replace(/[\r\n]+/g, " ");
          el.textContent = text;
          placeCaret(el, caret);
        }
        if (!text && el.childNodes.length) el.textContent = "";
        api.setActive({ field, caret: caretOf(el) });
        api.onInput(field, text);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          api.onEnter(field);
        } else if (e.key === "Backspace" && !(e.currentTarget.textContent ?? "")) {
          e.preventDefault();
          api.onBackspaceEmpty(field);
        } else if (e.key === "Escape") {
          e.currentTarget.blur();
        }
      }}
      onBlur={(e) => {
        const el = e.currentTarget;
        // A field that leaves the DOM because its block moved to another page keeps its "active" state.
        requestAnimationFrame(() => {
          if (el.isConnected && document.activeElement !== el && api.getActive()?.field === field) api.setActive(null);
        });
      }}
    />
  );
}
