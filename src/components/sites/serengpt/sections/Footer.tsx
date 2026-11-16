"use client";
/* eslint-disable @next/next/no-img-element -- static logo served as-is from public/sites/serengpt */

import { useEffect, useRef, useState } from "react";
import { cx } from "../cx";
import { languages } from "../data";

/** Language menu: opens upwards above the pill, like the source's top-end dropdown. */
function LanguagePanel({ id, onClose }: { id: string; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Like the source, cap the menu height to the space above the trigger.
    const wrapper = ref.current?.parentElement;
    if (ref.current && wrapper) {
      ref.current.style.setProperty("--_max-block-size", `${Math.max(160, wrapper.getBoundingClientRect().top - 16)}px`);
    }
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const wrapper = ref.current?.parentElement;
      if (wrapper && !wrapper.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      role="menu"
      id={id}
      aria-label="Idiomas"
      data-placement="top-end"
      className="Dropdown-module__panel--3ouib m-0 flex flex-direction-column flex-nowrap"
      data-dropdown-color="default"
      data-dropdown-density="default"
      data-width="auto"
      style={{ position: "absolute", bottom: "calc(100% + 4px)", right: 0, visibility: "visible" }}
    >
      {languages.map((l, i) => (
        <a
          key={l.label}
          href={l.href}
          role="menuitemradio"
          aria-checked={i === 0}
          className="Dropdown-module__item--mqgEp m-0 full-width flex flex-nowrap"
          data-type="radio"
        >
          <span className="Dropdown-module__highlight--Ww3EW col-fluid flex flex-nowrap flex-align-center gap-8">
            <span className="Dropdown-module__label--ivTU1 col-fluid overflow-hidden">{l.label}</span>
            <span className="Dropdown-module__slot--gRqFb Dropdown-module__check--b3EaH flex" aria-hidden="true">
              <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check" />
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}

export function Footer() {
  const [openSections, setOpenSections] = useState<number[]>([]);
  const [langOpen, setLangOpen] = useState<"mobile" | "desktop" | null>(null);
  const toggleSection = (i: number) =>
    setOpenSections((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));

  return (
    <footer className="full-width bg-neutral-solid relative">
      <div className="flex flex-nowrap flex-direction-column m-auto yLBDKa_inner">
        <div className="yLBDKa_langMount">
          <div className="yLBDKa_langWrapper">
            <button id="footer-language-mobile-trigger" aria-haspopup="menu" aria-expanded={langOpen === "mobile"} aria-controls="footer-language-mobile-panel" type="button" onClick={() => setLangOpen(langOpen === "mobile" ? null : "mobile")} className="flex-align-center cursor-pointer p-block-8 p-inline-16 font-weight-semibold text-color-primary font-body text-sm yLBDKa_langPill">
              <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-globe yLBDKa_langGlobe" style={{"fontSize": "20px"}} />
              Español (ES)
              <i aria-hidden="true" className={cx("Icon-module__icon--5oSUz icon-ui-chevron-down yLBDKa_langChevron", langOpen === "mobile" && "yLBDKa_langChevronOpen")} style={{ fontSize: "18px" }} />
            </button>
            {langOpen === "mobile" && <LanguagePanel id="footer-language-mobile-panel" onClose={() => setLangOpen(null)} />}
    
            <ul hidden>
              {languages.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex-align-start full-width yLBDKa_columns">
          <section className={cx("yLBDKa_section", openSections.includes(0) && "yLBDKa_sectionOpen")}>
            <button type="button" className="flex flex-nowrap flex-align-center flex-justify-space-between full-width font-weight-bold text-color-primary text-align-start font-body text-sm yLBDKa_heading" aria-expanded={openSections.includes(0)} aria-controls="footer-panel-getStarted" onClick={() => toggleSection(0)}>
              Empezar
              <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-chevron-down yLBDKa_headingChevron" />
            </button>
            <div id="footer-panel-getStarted" className="yLBDKa_panel">
              <div className="yLBDKa_panelInner">
                <ul className="gap-8 yLBDKa_list">
                  <li>
                    <a href="https://serengpt.ai/es/app-make-cv" className="flex-align-center p-block-4 font-body text-sm yLBDKa_link yLBDKa_linkHighlight">
                      <span>Crear CV</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://serengpt.ai/es/job-search" className="flex-align-center p-block-4 font-body text-sm yLBDKa_link">
                      <span>Oportunidades</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://serengpt.ai/es/contacts" className="flex-align-center p-block-4 font-body text-sm yLBDKa_link">
                      <span>Contacto</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section className={cx("yLBDKa_section", openSections.includes(1) && "yLBDKa_sectionOpen")}>
            <button type="button" className="flex flex-nowrap flex-align-center flex-justify-space-between full-width font-weight-bold text-color-primary text-align-start font-body text-sm yLBDKa_heading" aria-expanded={openSections.includes(1)} aria-controls="footer-panel-templates" onClick={() => toggleSection(1)}>
              Plantillas & Ejemplos
              <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-chevron-down yLBDKa_headingChevron" />
            </button>
            <div id="footer-panel-templates" className="yLBDKa_panel">
              <div className="yLBDKa_panelInner">
                <ul className="gap-8 yLBDKa_list">
                  <li>
                    <a href="/es/exportar" className="flex-align-center p-block-4 font-body text-sm yLBDKa_link">
                      <span>Plantillas de CV</span>
                    </a>
                  </li>
                  <li>
                    <a href="/es/exportar?muestra=larga" className="flex-align-center p-block-4 font-body text-sm yLBDKa_link">
                      <span>Ejemplos de CV</span>
                    </a>
                  </li>
                  <li>
                    <a href="/es/exportar?plantilla=minimalista" className="flex-align-center p-block-4 font-body text-sm yLBDKa_link">
                      <span>Plantilla CV Minimalista</span>
                    </a>
                  </li>
                  <li>
                    <a href="/es/exportar?plantilla=moderno" className="flex-align-center p-block-4 font-body text-sm yLBDKa_link">
                      <span>Plantilla CV Moderno</span>
                    </a>
                  </li>
                  <li>
                    <a href="/es/exportar?plantilla=creativo" className="flex-align-center p-block-4 font-body text-sm yLBDKa_link">
                      <span>Plantilla CV Creativo</span>
                    </a>
                  </li>
                  <li>
                    <a href="/es/exportar?plantilla=ejecutivo" className="flex-align-center p-block-4 font-body text-sm yLBDKa_link">
                      <span>Plantilla CV Ejecutivo</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section className={cx("yLBDKa_section", openSections.includes(2) && "yLBDKa_sectionOpen")}>
            <button type="button" className="flex flex-nowrap flex-align-center flex-justify-space-between full-width font-weight-bold text-color-primary text-align-start font-body text-sm yLBDKa_heading" aria-expanded={openSections.includes(2)} aria-controls="footer-panel-blog" onClick={() => toggleSection(2)}>
              Recursos
              <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-chevron-down yLBDKa_headingChevron" />
            </button>
            <div id="footer-panel-blog" className="yLBDKa_panel">
              <div className="yLBDKa_panelInner">
                <ul className="gap-8 yLBDKa_list">
                  <li>
                    <a href="https://serengpt.ai/es/blog" className="flex-align-center p-block-4 font-body text-sm yLBDKa_link">
                      <span>Blog</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://serengpt.ai/es/news" className="flex-align-center p-block-4 font-body text-sm yLBDKa_link">
                      <span>Noticias</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://serengpt.ai/es/resources" className="flex-align-center p-block-4 font-body text-sm yLBDKa_link">
                      <span>Recursos</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://serengpt.ai/es/about-us" className="flex-align-center p-block-4 font-body text-sm yLBDKa_link">
                      <span>Sobre nosotros</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section className={cx("yLBDKa_section", openSections.includes(3) && "yLBDKa_sectionOpen")}>
            <button type="button" className="flex flex-nowrap flex-align-center flex-justify-space-between full-width font-weight-bold text-color-primary text-align-start font-body text-sm yLBDKa_heading" aria-expanded={openSections.includes(3)} aria-controls="footer-panel-tools" onClick={() => toggleSection(3)}>
              Herramientas
              <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-chevron-down yLBDKa_headingChevron" />
            </button>
            <div id="footer-panel-tools" className="yLBDKa_panel">
              <div className="yLBDKa_panelInner">
                <ul className="gap-8 yLBDKa_list">
                  <li>
                    <a href="https://serengpt.ai/es/app-make-cv" className="flex-align-center p-block-4 font-body text-sm yLBDKa_link">
                      <span>Crea tu CV personal</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://serengpt.ai/es/cover-letter" className="flex-align-center p-block-4 font-body text-sm yLBDKa_link">
                      <span>Escribir mi carta de presentación</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://serengpt.ai/es/my-photo" className="flex-align-center p-block-4 font-body text-sm yLBDKa_link">
                      <span>Mi foto de perfil</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://serengpt.ai/es/job-interview" className="flex-align-center p-block-4 font-body text-sm yLBDKa_link">
                      <span>Mis entrevistas de trabajo</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://serengpt.ai/es/recruiter-zone" className="flex-align-center p-block-4 font-body text-sm yLBDKa_link">
                      <span>Zona del reclutador</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
        <div className="flex flex-nowrap flex-direction-column full-width yLBDKa_bottom">
          <div className="flex flex-nowrap flex-direction-column full-width yLBDKa_bottomTop">
            <div className="full-width yLBDKa_reviewsRow">
              <div className="sg-footerBrand">
                <img src="/sites/serengpt/logo-SerenGPT-ink.png" alt="SerenGPT" width="95" height="48" />
                <p className="Text-module__text--BrHx7" data-variant="body-s">
                  <strong>Basado en datos reales del mercado laboral.</strong> Diseñado para la empleabilidad de por vida.
                </p>
              </div>
              <div className="yLBDKa_langWrapper yLBDKa_langPillReviews">
                <button id="footer-language-desktop-trigger" aria-haspopup="menu" aria-expanded={langOpen === "desktop"} aria-controls="footer-language-desktop-panel" type="button" onClick={() => setLangOpen(langOpen === "desktop" ? null : "desktop")} className="flex-align-center cursor-pointer p-block-8 p-inline-16 font-weight-semibold text-color-primary font-body text-sm yLBDKa_langPill">
                  <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-globe yLBDKa_langGlobe" style={{"fontSize": "20px"}} />
                  Español (ES)
                  <i aria-hidden="true" className={cx("Icon-module__icon--5oSUz icon-ui-chevron-down yLBDKa_langChevron", langOpen === "desktop" && "yLBDKa_langChevronOpen")} style={{ fontSize: "18px" }} />
                </button>
                {langOpen === "desktop" && <LanguagePanel id="footer-language-desktop-panel" onClose={() => setLangOpen(null)} />}
    
                <ul hidden>
                  {languages.map((l) => (
                    <li key={l.label}>
                      <a href={l.href}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="full-width bg-subtle-solid yLBDKa_divider" />
            <div className="full-width flex-align-center yLBDKa_legalRow">
              <nav className="gap-16 yLBDKa_legal yLBDKa_legalEnd" aria-label="Información legal">
                <a href="https://serengpt.ai/es/setup-cookies" className="font-weight-500 text-heading cursor-pointer font-body text-sm yLBDKa_legalItem">Configuración de cookies</a>
                <a href="https://serengpt.ai/es/privacy-policy" className="font-weight-500 text-heading cursor-pointer font-body text-sm yLBDKa_legalItem">Política de privacidad</a>
                <a href="https://serengpt.ai/es/contacts" className="font-weight-500 text-heading cursor-pointer font-body text-sm yLBDKa_legalItem">Contacto</a>
              </nav>
            </div>
          </div>
          <div className="full-width flex-align-center yLBDKa_bottomBar">
            <div className="Text-module__text--BrHx7 flex flex-align-center gap-8 yLBDKa_copyright" data-variant="body-xs">
              <span>© Derechos reservados 2026. SerenGPT</span>
              <span className="sg-footerContact">
                <a href="mailto:support@serengpt.ai">support@serengpt.ai</a>
              </span>
            </div>
            <div className="flex flex-nowrap flex-align-center gap-24 yLBDKa_social">
              <div className="flex flex-nowrap flex-align-center gap-8 yLBDKa_socialLinks">
                <a className="flex-align-center flex-justify-center text-color-secondary bg-subtle-solid yLBDKa_socialBtn" href="https://www.linkedin.com/company/serengpt" aria-label="LinkedIn de SerenGPT" rel="noopener">
                  <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-social-linkedin yLBDKa_socialGlyph" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
