"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * The source moves the hero resume card with JS: at window.innerWidth <= 992 it renders inside the text
 * column (between the buttons and the reviews), otherwise as the right-hand column. Like the source hook,
 * the first (server) render assumes the narrow layout.
 */
export function HeroCardSlot({ variant, children }: { variant: "inline" | "column"; children: ReactNode }) {
  const [narrow, setNarrow] = useState(true);
  useEffect(() => {
    const update = () => setNarrow(window.innerWidth <= 992);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const show = variant === "inline" ? narrow : !narrow;
  return show ? <>{children}</> : null;
}
