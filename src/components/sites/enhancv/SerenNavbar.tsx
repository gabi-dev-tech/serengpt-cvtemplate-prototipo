"use client";

import { useEffect, useRef, useState } from "react";
import { Briefcase, Camera, ChevronDown, FileText, Gauge, Mail, MessagesSquare, Search, Sparkles, TrendingUp, type LucideIcon } from "lucide-react";
import { cx } from "./cx";
import { SG_ORIGIN, sg, sgLanguages } from "./serengpt-links";
import "./serengpt-navbar.css";

type Menu = "lang" | "tools";
type Link = { href: string; label: string; icon: LucideIcon };

const primaryLinks: Link[] = [
  { href: sg.preparation, label: "Preparación", icon: Sparkles },
  { href: sg.jobSearch, label: "Oportunidades", icon: Search },
  { href: sg.market, label: "Mercado", icon: TrendingUp },
];

const toolLinks: Link[] = [
  { href: sg.myCv, label: "Mi CV", icon: FileText },
  { href: sg.myPhoto, label: "Mi foto", icon: Camera },
  { href: sg.coverLetter, label: "Carta de presentación", icon: Mail },
  { href: sg.jobInterview, label: "Entrevista de trabajo", icon: MessagesSquare },
  { href: sg.employability, label: "Empleabilidad", icon: Gauge },
  { href: sg.recruiterZone, label: "Zona del reclutador", icon: Briefcase },
];

function MenuItem({ href, label, icon: Icon }: Link) {
  return (
    <a href={href} className="sgn-menuItem" role="menuitem">
      <Icon className="sgn-menuIcon" aria-hidden="true" />
      {label}
    </a>
  );
}

/** Navbar of serengpt.ai (logo on the left, glass pill on the right); the same on every page. */
export function SerenNavbar() {
  const [open, setOpen] = useState<Menu | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = (m: Menu) => setOpen((cur) => (cur === m ? null : m));

  return (
    <header className={cx("sgn-header", scrolled && "sgn-scrolled")}>
      <a className="sgn-logo" href={sg.home} aria-label="SerenGPT">
        {/* eslint-disable-next-line @next/next/no-img-element -- static SVG logo */}
        <img src="/sites/serengpt/serengpt-logo-ink.svg" alt="SerenGPT" width="160" height="40" />
      </a>
      <div className="sgn-navWrapper">
        <nav ref={navRef} className="sgn-nav" aria-label="Navegación principal">
          <div className="sgn-primary">
            {primaryLinks.map(({ href, label, icon: Icon }) => (
              <a key={href} href={href} className="sgn-link">
                <Icon className="sgn-linkIcon" aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
          <span className="sgn-sep" aria-hidden="true" />
          <div className="sgn-menuAnchor sgn-desktopOnly">
            <button type="button" className="sgn-langTrigger" aria-haspopup="menu" aria-expanded={open === "lang"} aria-controls="sgn-lang-menu" aria-label="Idioma" onClick={() => toggle("lang")}>
              <span className="sgn-langBadge">ES</span>
              <ChevronDown className={cx("sgn-chevron", open === "lang" && "sgn-chevronOpen")} aria-hidden="true" />
            </button>
            {open === "lang" && (
              <div id="sgn-lang-menu" className="sgn-menu sgn-langMenu" role="menu">
                {sgLanguages.map(({ code, label }) => (
                  <a key={code} href={`${SG_ORIGIN}/${code}`} className="sgn-menuItem" role="menuitem" lang={code}>
                    <span className={cx("sgn-langBadge", code !== "es" && "sgn-langBadgeInactive")}>{code.toUpperCase()}</span>
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <a href={sg.login} className="sgn-login sgn-desktopOnly">
            Iniciar sesión
          </a>
          <div className="sgn-menuAnchor">
            <button type="button" className={cx("sgn-burger", open === "tools" && "sgn-burgerOpen")} aria-haspopup="menu" aria-expanded={open === "tools"} aria-controls="sgn-tools-menu" aria-label="Herramientas" onClick={() => toggle("tools")}>
              <span className="sgn-burgerLine" />
              <span className="sgn-burgerLine" />
              <span className="sgn-burgerLine" />
            </button>
            {open === "tools" && (
              <div id="sgn-tools-menu" className="sgn-menu sgn-toolsMenu" role="menu">
                <div className="sgn-mobileOnly">
                  <p className="sgn-menuTitle">Navegación</p>
                  {primaryLinks.map((l) => (
                    <MenuItem key={l.href} {...l} />
                  ))}
                  <span className="sgn-divider" />
                </div>
                <p className="sgn-menuTitle">Herramientas</p>
                {toolLinks.map((l) => (
                  <MenuItem key={l.href} {...l} />
                ))}
                <div className="sgn-mobileOnly">
                  <span className="sgn-divider" />
                  <p className="sgn-menuTitle">Idioma</p>
                  <div className="sgn-langInline">
                    {sgLanguages.map(({ code }) => (
                      <a key={code} href={`${SG_ORIGIN}/${code}`} className={cx("sgn-langBadge", code !== "es" && "sgn-langBadgeInactive")} lang={code}>
                        {code.toUpperCase()}
                      </a>
                    ))}
                  </div>
                  <a href={sg.login} className="sgn-login sgn-loginBlock">
                    Iniciar sesión
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
