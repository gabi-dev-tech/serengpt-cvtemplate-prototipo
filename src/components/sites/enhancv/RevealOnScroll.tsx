"use client";

import { useEffect } from "react";

/**
 * The source adds entrance-animation classes once an element scrolls into view.
 * Elements opt in with `data-reveal="<classes>"`; the classes are added the first time they intersect.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reveal = (el: HTMLElement) => el.classList.add(...(el.dataset.reveal ?? "").split(" ").filter(Boolean));
    if (!("IntersectionObserver" in window)) {
      els.forEach(reveal);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
