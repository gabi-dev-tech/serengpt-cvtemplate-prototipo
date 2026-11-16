import type { Metadata } from "next";
import { ExportPage } from "@/components/sites/serengpt/export/ExportPage";
import { sampleResume, sampleResumeLong } from "@/components/sites/serengpt/export/sample";

export const metadata: Metadata = {
  title: "Exportar CV a Word | SerenGPT",
  description: "Vista previa del CV, elección de plantilla y descarga en .docx con el mismo diseño.",
};

export default async function ExportarPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { muestra, plantilla } = await searchParams;
  return (
    <ExportPage
      data={muestra === "larga" ? sampleResumeLong : sampleResume}
      initialTemplate={typeof plantilla === "string" ? plantilla : undefined}
    />
  );
}
