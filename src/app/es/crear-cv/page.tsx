import type { Metadata } from "next";
import { EditorClient } from "@/components/sites/enhancv/editor/EditorClient";
import { sampleResume, sampleResumeLong } from "@/components/sites/enhancv/export/sample";

export const metadata: Metadata = {
  title: "Crear CV | SerenGPT",
  description: "Elige una plantilla, revisa tu CV en tamaño A4 y descárgalo en Word (.docx) con el mismo diseño.",
};

export default async function CrearCvPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { muestra, plantilla } = await searchParams;
  return (
    <EditorClient
      data={muestra === "larga" ? sampleResumeLong : sampleResume}
      initialTemplate={typeof plantilla === "string" ? plantilla : undefined}
    />
  );
}
