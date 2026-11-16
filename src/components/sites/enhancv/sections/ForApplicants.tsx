"use client";
/* eslint-disable @next/next/no-img-element -- source images are served as-is from public/sites/enhancv to keep their exact crop and sizing */

import { useState } from "react";
import { cx } from "../cx";

/** "Pensado para profesionales de cualquier sector": one panel open at a time (click to switch). */
export function ForApplicants() {
  const [active, setActive] = useState(0);
  return (
    <div data-section="Audience accordion" style={{"display": "contents"}}>
      <section className="for-applicants-section p-block-64 p-block-32-xsm relative tUzjhG_forApplicantsSection">
        <div className="container flex flex-justify-center">
          <div className="col-8 col-12-md col-12-xsm m-bottom-16 relative">
            <img alt="" loading="lazy" width="100" height="368" className="tUzjhG_constellation1 hidden-xsm" style={{"color": "transparent"}} src="/sites/enhancv/for-applicants-section_constellation1.webp" />
            <img alt="" loading="lazy" width="293" height="311" className="tUzjhG_constellation2 hidden-xsm" style={{"color": "transparent"}} src="/sites/enhancv/for-applicants-section_constellation2.webp" />
            <img alt="" loading="lazy" width="496" height="450" className="tUzjhG_gradient" style={{"color": "transparent"}} src="/sites/enhancv/for-applicants-section_gradient.webp" />
            <h3 className="Text-module__text--BrHx7 p-bottom-32 m-top-32 m-top-24-xsm m-bottom-16" data-variant="heading-xl">Pensado para profesionales de cualquier sector</h3>
            <div className="flex">
              <div className="col-12 border-rounded-4 m-top-24 tUzjhG_menu">
                <div>
                  <div className={cx("tUzjhG_menuItem full-width p-24 flex flex-nowrap cursor-pointer", active === 0 && "tUzjhG_active")} onClick={() => setActive(0)}>
                    <div>
                      {active === 0 ? (
      <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-disc text-color-accent m-right-8" style={{ fontSize: "22px" }} />
    ) : (
      <div className="tUzjhG_icon bg-accent-solid m-right-8">
        <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-plus text-color-inverse" />
      </div>
    )}
                    </div>
                    <h6 className="Text-module__text--BrHx7" data-variant="heading-s">Profesionales senior y ejecutivos</h6>
                  </div>
                  <div className={cx("border-rounded-4 p-inline-32 tUzjhG_card", active === 0 && "tUzjhG_active")}>
                    <div className="flex full-width flex-wrap">
                      <div className="col-6 col-12-xsm flex flex-align-bottom tUzjhG_imageWrapper">
                        <img alt="Profesionales senior y ejecutivos" loading="lazy" width="463" height="242" style={{"color": "transparent", "width": "100%", "height": "auto", "objectFit": "contain", "objectPosition": "bottom"}} src="/sites/enhancv/for-applicants-section_es_image1.webp" />
                      </div>
                      <div className="col-6 col-12-xsm p-left-24 p-left-0-xsm relative">
                        <div>
                          <p className="Text-module__text--BrHx7 m-block-16-xsm m-bottom-8" data-variant="body-s">Enhancv está pensado para profesionales con experiencia. Destaca tu liderazgo, el rendimiento de tus equipos, tus premios y tus logros clave. Luego usa funciones como Mejorar texto para corregir frases vagas, palabras de moda y la falta de cifras. Mantén tu CV conciso en un formato de una o dos páginas.</p>
                          <div className="m-bottom-40 m-bottom-24-xsm">
                            <div className="flex flex-nowrap">
                              <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check text-color-brand" style={{"fontSize": "24px"}} />
                              <p className="Text-module__text--BrHx7 m-left-8" data-variant="body-m" data-weight="bold">Gerentes</p>
                            </div>
                            <div className="flex flex-nowrap">
                              <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check text-color-brand" style={{"fontSize": "24px"}} />
                              <p className="Text-module__text--BrHx7 m-left-8" data-variant="body-m" data-weight="bold">Directores y vicepresidentes</p>
                            </div>
                            <div className="flex flex-nowrap">
                              <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check text-color-brand" style={{"fontSize": "24px"}} />
                              <p className="Text-module__text--BrHx7 m-left-8" data-variant="body-m" data-weight="bold">Especialistas senior</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className={cx("tUzjhG_menuItem full-width p-24 flex flex-nowrap cursor-pointer", active === 1 && "tUzjhG_active")} onClick={() => setActive(1)}>
                    <div>
                      {active === 1 ? (
      <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-disc text-color-accent m-right-8" style={{ fontSize: "22px" }} />
    ) : (
      <div className="tUzjhG_icon bg-accent-solid m-right-8">
        <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-plus text-color-inverse" />
      </div>
    )}
                    </div>
                    <h6 className="Text-module__text--BrHx7" data-variant="heading-s">Sectores tradicionales</h6>
                  </div>
                  <div className={cx("border-rounded-4 p-inline-32 tUzjhG_card", active === 1 && "tUzjhG_active")}>
                    <div className="flex full-width flex-wrap">
                      <div className="col-6 col-12-xsm flex flex-align-bottom tUzjhG_imageWrapper">
                        <img alt="Sectores tradicionales" loading="lazy" width="463" height="242" style={{"color": "transparent", "width": "100%", "height": "auto", "objectFit": "contain", "objectPosition": "bottom"}} src="/sites/enhancv/for-applicants-section_es_image3.webp" />
                      </div>
                      <div className="col-6 col-12-xsm p-left-24 p-left-0-xsm relative">
                        <div>
                          <p className="Text-module__text--BrHx7 m-block-16-xsm m-bottom-8" data-variant="body-s">Para finanzas, derecho, sector público, salud e ingeniería, Enhancv ofrece varios diseños sobrios de una columna, como Ivy League, que se ven tal como estos sectores esperan. Si te postulas a muchos puestos a la vez, usa Personalizar para un trabajo y adapta tu CV a cada uno.</p>
                          <div className="m-bottom-40 m-bottom-24-xsm">
                            <div className="flex flex-nowrap">
                              <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check text-color-brand" style={{"fontSize": "24px"}} />
                              <p className="Text-module__text--BrHx7 m-left-8" data-variant="body-m" data-weight="bold">Finanzas y contabilidad</p>
                            </div>
                            <div className="flex flex-nowrap">
                              <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check text-color-brand" style={{"fontSize": "24px"}} />
                              <p className="Text-module__text--BrHx7 m-left-8" data-variant="body-m" data-weight="bold">Derecho</p>
                            </div>
                            <div className="flex flex-nowrap">
                              <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check text-color-brand" style={{"fontSize": "24px"}} />
                              <p className="Text-module__text--BrHx7 m-left-8" data-variant="body-m" data-weight="bold">Sector público</p>
                            </div>
                            <div className="flex flex-nowrap">
                              <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check text-color-brand" style={{"fontSize": "24px"}} />
                              <p className="Text-module__text--BrHx7 m-left-8" data-variant="body-m" data-weight="bold">Salud</p>
                            </div>
                            <div className="flex flex-nowrap">
                              <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check text-color-brand" style={{"fontSize": "24px"}} />
                              <p className="Text-module__text--BrHx7 m-left-8" data-variant="body-m" data-weight="bold">Manufactura e ingeniería</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className={cx("tUzjhG_menuItem full-width p-24 flex flex-nowrap cursor-pointer", active === 2 && "tUzjhG_active")} onClick={() => setActive(2)}>
                    <div>
                      {active === 2 ? (
      <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-disc text-color-accent m-right-8" style={{ fontSize: "22px" }} />
    ) : (
      <div className="tUzjhG_icon bg-accent-solid m-right-8">
        <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-plus text-color-inverse" />
      </div>
    )}
                    </div>
                    <h6 className="Text-module__text--BrHx7" data-variant="heading-s">Tecnología y sectores de alto crecimiento</h6>
                  </div>
                  <div className={cx("border-rounded-4 p-inline-32 tUzjhG_card", active === 2 && "tUzjhG_active")}>
                    <div className="flex full-width flex-wrap">
                      <div className="col-6 col-12-xsm flex flex-align-bottom tUzjhG_imageWrapper">
                        <img alt="Tecnología y sectores de alto crecimiento" loading="lazy" width="463" height="242" style={{"color": "transparent", "width": "100%", "height": "auto", "objectFit": "contain", "objectPosition": "bottom"}} src="/sites/enhancv/for-applicants-section_es_image2.webp" />
                      </div>
                      <div className="col-6 col-12-xsm p-left-24 p-left-0-xsm relative">
                        <div>
                          <p className="Text-module__text--BrHx7 m-block-16-xsm m-bottom-8" data-variant="body-s">Para software, datos, producto, ventas y marketing, el asistente IA te ayuda a escribir un CV en el lenguaje de tu sector. Pídele lo que necesitas con tus propias palabras: pule tus viñetas y saca a la luz los logros que vale la pena destacar, siempre a partir de tu experiencia real.</p>
                          <div className="m-bottom-40 m-bottom-24-xsm">
                            <div className="flex flex-nowrap">
                              <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check text-color-brand" style={{"fontSize": "24px"}} />
                              <p className="Text-module__text--BrHx7 m-left-8" data-variant="body-m" data-weight="bold">Ingenieros de software</p>
                            </div>
                            <div className="flex flex-nowrap">
                              <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check text-color-brand" style={{"fontSize": "24px"}} />
                              <p className="Text-module__text--BrHx7 m-left-8" data-variant="body-m" data-weight="bold">Datos y analítica</p>
                            </div>
                            <div className="flex flex-nowrap">
                              <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check text-color-brand" style={{"fontSize": "24px"}} />
                              <p className="Text-module__text--BrHx7 m-left-8" data-variant="body-m" data-weight="bold">Gerentes de producto y de proyecto</p>
                            </div>
                            <div className="flex flex-nowrap">
                              <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check text-color-brand" style={{"fontSize": "24px"}} />
                              <p className="Text-module__text--BrHx7 m-left-8" data-variant="body-m" data-weight="bold">Ventas</p>
                            </div>
                            <div className="flex flex-nowrap">
                              <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check text-color-brand" style={{"fontSize": "24px"}} />
                              <p className="Text-module__text--BrHx7 m-left-8" data-variant="body-m" data-weight="bold">Marketing</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
