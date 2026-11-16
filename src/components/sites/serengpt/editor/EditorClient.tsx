"use client";

import dynamic from "next/dynamic";
import type { ResumeData } from "../export/types";

// The editor reads the CV saved in this browser on its first render, so it only renders in the browser.
const EditorPage = dynamic(() => import("./EditorPage").then((m) => m.EditorPage), {
  ssr: false,
  loading: () => <div className="sge-loading">Cargando editor…</div>,
});

export function EditorClient(props: { data: ResumeData; initialTemplate?: string }) {
  return <EditorPage {...props} />;
}
