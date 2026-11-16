import type { Metadata } from "next";
import "./globals.css";

// The page self-hosts its fonts (Manrope and icons-ui from public/sites/serengpt),
// so the template's Geist next/font imports were removed (they also need network access at build time).
export const metadata: Metadata = {
  title: "Crear CV online con IA | SerenGPT",
  description:
    "Crea tu CV con IA en SerenGPT: elige una plantilla profesional y descárgala en Word (.docx) igual que en la vista previa.",
  applicationName: "SerenGPT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-ES" className="h-full antialiased">
      {/* Browser extensions (e.g. ColorZilla adds cz-shortcut-listen) edit <body> before React hydrates. */}
      <body className="min-h-full" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
