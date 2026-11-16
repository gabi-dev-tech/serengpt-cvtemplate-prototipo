import { fontFiles } from "./spec";
import { embeddedFonts, type TemplateConfig } from "./templates";
import type { FontFamily, PageAssignment, ResumeData } from "./types";

async function fetchBytes(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo cargar ${url} (${res.status})`);
  return new Uint8Array(await res.arrayBuffer());
}

export function docxFileName(name: string, template: TemplateConfig) {
  const slug = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^A-Za-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  return `CV-${slug(name) || "SerenGPT"}-${template.id}.docx`;
}

/** Builds the .docx in the browser (nothing is sent to a server) and starts the download. */
export async function downloadResumeDocx(data: ResumeData, template: TemplateConfig, pages: PageAssignment) {
  const [{ buildResumeDocx }, { Packer }] = await Promise.all([import("./docx"), import("docx")]);
  const fontBytes = await Promise.all(
    embeddedFonts(template).map(
      async (f) => [f, { regular: await fetchBytes(fontFiles[f].regular), bold: await fetchBytes(fontFiles[f].bold) }] as const,
    ),
  );
  const photo = template.photo && data.photo ? await fetchBytes(data.photo) : undefined;
  const fonts: Partial<Record<FontFamily, { regular: Uint8Array; bold: Uint8Array }>> = Object.fromEntries(fontBytes);
  const blob = await Packer.toBlob(buildResumeDocx(data, template, { fonts, photo }, pages));
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = docxFileName(data.name, template);
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
