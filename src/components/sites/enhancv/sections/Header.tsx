"use client";

import { useEffect, useState } from "react";
import { cx } from "../cx";
import "../topbar.css";

type MenuKey = "resume" | "tools";

/** Sticky header: dropdowns open on hover (desktop) or tap (mobile menu); burger toggles the mobile nav. */
export function Header() {
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // The source locks page scroll while the mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const isDesktop = () => typeof window !== "undefined" && window.matchMedia("(min-width: 993px)").matches;
  const hoverOpen = (k: MenuKey) => {
    if (isDesktop()) setOpenMenu(k);
  };
  const hoverClose = (k: MenuKey) => {
    if (isDesktop()) setOpenMenu((cur) => (cur === k ? null : cur));
  };

  return (
    <header className="_3SyHWa_header">
      <div className="sge-top sg-homeTop">
        <div className="sge-topLeft">
          <a href="/es" className="sge-home" aria-label="Inicio de SerenGPT">
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG mark, same as the editor bar */}
            <img src="/sites/serengpt/serengpt-mark.svg" alt="" width="26" height="26" />
            <span>Inicio</span>
          </a>
          <span className="sge-sep" aria-hidden="true" />
          <nav className={cx("_3SyHWa_nav", mobileOpen && "_3SyHWa_navOpen")} aria-label="Navegación principal">
            <div className="flex _3SyHWa_navItem" onMouseEnter={() => hoverOpen("resume")} onMouseLeave={() => hoverClose("resume")}>
              <button type="button" className={cx("flex-align-center font-weight-medium cursor-pointer _3SyHWa_navLink", openMenu === "resume" && "_3SyHWa_navLinkActive")} aria-expanded={openMenu === "resume"} aria-controls="header-menu-resume" onClick={() => setOpenMenu(openMenu === "resume" ? null : "resume")}>
                CV
                <svg className="_3SyHWa_chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6.38862 3.1266L10.839 7.577C11.0537 7.79164 11.0537 8.13962 10.839 8.35424L10.32 8.87331C10.1057 9.08758 9.75841 9.08799 9.54363 8.87422L5.99999 5.34721L2.45637 8.87424C2.24159 9.08801 1.89432 9.0876 1.68005 8.87333L1.16098 8.35426C0.94634 8.13962 0.94634 7.79164 1.16098 7.57702L5.61138 3.12662C5.826 2.91198 6.17398 2.91198 6.38862 3.1266Z" fill="currentColor" />
                </svg>
              </button>
              <div id="header-menu-resume" className={cx("OA73xG_dropdown", openMenu === "resume" && "OA73xG_open")} aria-hidden={openMenu !== "resume"}>
                <div className="flex flex-direction-column flex-align-start gap-8 OA73xG_col OA73xG_colResume">
                  <p className="Text-module__text--BrHx7 p-inline-8 OA73xG_label m-bottom-8" data-variant="body-m" data-weight="medium">Herramientas</p>
                  <ul className="flex flex-direction-column flex-align-start OA73xG_list">
                    <li>
                      <a href="https://serengpt.ai/es/app-make-cv" className="flex flex-nowrap flex-align-center gap-8 p-8 OA73xG_link">
                        <span className="OA73xG_icon">
                          <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-box OA73xG_iconGlyph" />
                        </span>
                        <span className="flex flex-direction-column flex-align-start flex-justify-center OA73xG_text">
                          <span className="font-weight-medium OA73xG_title">Crea tu CV personal</span>
                          <span className="font-weight-regular OA73xG_subtitle">Con ayuda de la IA</span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="https://serengpt.ai/es/my-cv" className="flex flex-nowrap flex-align-center gap-8 p-8 OA73xG_link">
                        <span className="OA73xG_icon">
                          <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check-circle OA73xG_iconGlyph" />
                        </span>
                        <span className="flex flex-direction-column flex-align-start flex-justify-center OA73xG_text">
                          <span className="font-weight-medium OA73xG_title">Mis perfiles / CV</span>
                          <span className="font-weight-regular OA73xG_subtitle">Tus perfiles guardados</span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/es/exportar" className="flex flex-nowrap flex-align-center gap-8 p-8 OA73xG_link">
                        <span className="OA73xG_icon">
                          <svg className="OA73xG_iconSvg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.75" />
                            <circle cx="9" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M13 7h4M13 10h3M7 14h10M7 17h7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                          </svg>
                        </span>
                        <span className="flex flex-direction-column flex-align-start flex-justify-center OA73xG_text">
                          <span className="font-weight-medium OA73xG_title">Plantillas de CV</span>
                          <span className="font-weight-regular OA73xG_subtitle">Elige una y descárgala en .docx</span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/es/exportar?muestra=larga" className="flex flex-nowrap flex-align-center gap-8 p-8 OA73xG_link">
                        <span className="OA73xG_icon">
                          <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-file OA73xG_iconGlyph" />
                        </span>
                        <span className="flex flex-direction-column flex-align-start flex-justify-center OA73xG_text">
                          <span className="font-weight-medium OA73xG_title">Ejemplos de CV</span>
                          <span className="font-weight-regular OA73xG_subtitle">Genera o explora</span>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex _3SyHWa_navItem" onMouseEnter={() => hoverOpen("tools")} onMouseLeave={() => hoverClose("tools")}>
              <button type="button" className={cx("flex-align-center font-weight-medium cursor-pointer _3SyHWa_navLink", openMenu === "tools" && "_3SyHWa_navLinkActive")} aria-expanded={openMenu === "tools"} aria-controls="header-menu-tools" onClick={() => setOpenMenu(openMenu === "tools" ? null : "tools")}>
                Herramientas
                <svg className="_3SyHWa_chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6.38862 3.1266L10.839 7.577C11.0537 7.79164 11.0537 8.13962 10.839 8.35424L10.32 8.87331C10.1057 9.08758 9.75841 9.08799 9.54363 8.87422L5.99999 5.34721L2.45637 8.87424C2.24159 9.08801 1.89432 9.0876 1.68005 8.87333L1.16098 8.35426C0.94634 8.13962 0.94634 7.79164 1.16098 7.57702L5.61138 3.12662C5.826 2.91198 6.17398 2.91198 6.38862 3.1266Z" fill="currentColor" />
                </svg>
              </button>
              <div id="header-menu-tools" className={cx("OA73xG_dropdown", openMenu === "tools" && "OA73xG_open")} aria-hidden={openMenu !== "tools"}>
                <div className="flex flex-direction-column flex-align-start gap-8 OA73xG_col OA73xG_colCoverletter">
                  <p className="Text-module__text--BrHx7 p-inline-8 OA73xG_label m-bottom-8" data-variant="body-m" data-weight="medium">Carta de presentación</p>
                  <ul className="flex flex-direction-column flex-align-start OA73xG_list">
                    <li>
                      <a href="https://serengpt.ai/es/cover-letter" className="flex flex-nowrap flex-align-center gap-8 p-8 OA73xG_link">
                        <span className="OA73xG_icon">
                          <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-cover-letter OA73xG_iconGlyph" />
                        </span>
                        <span className="flex flex-direction-column flex-align-start flex-justify-center OA73xG_text">
                          <span className="font-weight-medium OA73xG_title">Escribir mi carta de presentación</span>
                          <span className="font-weight-regular OA73xG_subtitle">A partir de tu CV y la oferta</span>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-direction-column flex-align-start gap-8 OA73xG_col">
                  <p className="Text-module__text--BrHx7 p-inline-8 OA73xG_label m-bottom-8" data-variant="body-m" data-weight="medium">Recursos</p>
                  <ul className="flex flex-direction-column flex-align-start OA73xG_list">
                    <li>
                      <a href="https://serengpt.ai/es/news" className="flex flex-align-center p-8 OA73xG_plainLink">
                        <span className="font-weight-medium OA73xG_plainTitle">Noticias</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://serengpt.ai/es/blog" className="flex flex-align-center p-8 OA73xG_plainLink">
                        <span className="font-weight-medium OA73xG_plainTitle">Blog</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex _3SyHWa_navItem">
              <a href="https://serengpt.ai/es/recruiter-zone" className="flex-align-center font-weight-medium cursor-pointer _3SyHWa_navLink">Zona del reclutador</a>
            </div>
            <div className="flex _3SyHWa_navItem">
              <a href="https://serengpt.ai/es/job-search" className="flex-align-center font-weight-medium cursor-pointer _3SyHWa_navLink">Oportunidades</a>
            </div>
            <div className="AWftFq_footer">
              <ul className="AWftFq_list">
                <li>
                  <a href="https://serengpt.ai/es/blog" className="AWftFq_link">Blog</a>
                </li>
                <li>
                  <a href="https://serengpt.ai/es/resources" className="AWftFq_link">Recursos</a>
                </li>
                <li>
                  <a href="https://serengpt.ai/es/contacts" className="AWftFq_link">Contacto</a>
                </li>
              </ul>
              <div className="AWftFq_buttons">
                <a rel="noopener" href="https://serengpt.ai/es/login" className="Button-module__button--bJF6M AWftFq_button" data-button-color="neutral" data-size="md" data-type="secondary">
                  <span className="Button-module__label--V1tZC">Iniciar sesión</span>
                </a>
                <a href="https://serengpt.ai/es/app-make-cv" className="Button-module__button--bJF6M AWftFq_button" data-button-color="brand" data-size="md" data-type="primary">
                  <span className="Button-module__label--V1tZC">Empezar</span>
                </a>
              </div>
              <p className="AWftFq_tagline">Diseñado para la empleabilidad de por vida.</p>
            </div>
          </nav>
        </div>
        <div className="sge-topRight">
          <a rel="noopener" href="https://serengpt.ai/es/login" className="sge-secondary sign-in _3SyHWa_btnDesktop">
            <span>Iniciar sesión</span>
          </a>
          <a href="https://serengpt.ai/es/app-make-cv" className="sge-primary _3SyHWa_btnDesktop">
            <span>Empezar</span>
          </a>
          <button type="button" className={cx("flex-align-center flex-justify-center cursor-pointer _3SyHWa_menuToggle", mobileOpen && "_3SyHWa_menuToggleActive")} aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="_3SyHWa_menuToggleIcon _3SyHWa_menuToggleIconOpen" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <svg className="_3SyHWa_menuToggleIcon _3SyHWa_menuToggleIconClose" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
