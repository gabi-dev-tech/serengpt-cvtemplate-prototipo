"use client";
/* eslint-disable @next/next/no-img-element -- source images are served as-is from public/sites/enhancv to keep their exact crop and sizing */

import { useState } from "react";
import { cx } from "../cx";
import { sg } from "../serengpt-links";

export function AiAssistant() {
  const [active, setActive] = useState(0);
  return (
    <div data-section="Feature tabs" style={{"display": "contents"}}>
      <section className="fully-equipped-section p-block-64 p-block-32-xsm relative _7C3zma_fullyEquippedSection">
        <img alt="" loading="lazy" width="1599" height="634" className="_7C3zma_background animation-breath" style={{"color": "transparent"}} src="/sites/enhancv/fully-equipped-section_background.webp" />
        <div className="container flex flex-justify-center _7C3zma_container">
          <div className="col-8 col-12-xsm text-color-inverse text-align-center text-align-start-xsm m-bottom-24">
            <h3 className="Text-module__text--BrHx7 m-top-32 m-top-24-xsm m-bottom-16" data-variant="heading-xl" data-color="inverse">Escribe un CV más sólido con el asistente IA</h3>
            <p className="Text-module__text--BrHx7 m-bottom-8" data-variant="body-m" data-color="inherit">Chatea en lenguaje sencillo o activa acciones predefinidas para redactar, editar y mejorar tu CV, justo donde estás trabajando. Cada sugerencia se basa en tu experiencia real.</p>
          </div>
          <div className="flex flex-justify-space-between flex-nowrap flex-direction-column col-12 bg-neutral-solid p-inline-32 p-top-32 p-bottom-24 p-16-xsm border-rounded-4 _7C3zma_content">
            <div className="col-fluid flex flex-justify-center">
              <div className="col-4 col-12-xsm col-12-md flex flex-direction-column">
                <div className={cx("_7C3zma_item", active === 0 && "col-fluid")}>
                  <h6 className={cx("text-md relative cursor-pointer m-0 p-top-16 p-bottom-8 font-weight-bold _7C3zma_title", active === 0 && "_7C3zma_active")} onClick={() => setActive(0)}>Generación de contenido con IA</h6>
                  <div className={cx("_7C3zma_bullets", active === 0 && "_7C3zma_active")}>
                    <div>
                      <div className="flex flex-nowrap m-bottom-8 p-top-24">
                        <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check-circle text-color-brand relative m-right-8 m-top-4" />
                        <div className="Text-module__text--BrHx7" data-variant="body-s">Recibe sugerencias de contenido para el puesto que buscas, basadas en tu experiencia real</div>
                      </div>
                      <div className="flex flex-nowrap m-bottom-8">
                        <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check-circle text-color-brand relative m-right-8 m-top-4" />
                        <div className="Text-module__text--BrHx7" data-variant="body-s">Usa el tono y el lenguaje que esperan los reclutadores</div>
                      </div>
                      <div className="flex flex-nowrap m-bottom-8">
                        <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check-circle text-color-brand relative m-right-8 m-top-4" />
                        <div className="Text-module__text--BrHx7" data-variant="body-s">Tú controlas lo que le das, así que el resultado sigue enfocado y relevante</div>
                      </div>
                      <div className="_7C3zma_imageBackground relative hidden-lg hidden-xl m-top-16">
                        <img alt="Generación de contenido con IA" loading="lazy" width="463" height="242" style={{"color": "transparent", "width": "100%", "height": "auto"}} src="/sites/enhancv/fully-equipped-section_es_01.webp" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx("_7C3zma_item", active === 1 && "col-fluid")}>
                  <h6 className={cx("text-md relative cursor-pointer m-0 p-top-16 p-bottom-8 font-weight-bold _7C3zma_title", active === 1 && "_7C3zma_active")} onClick={() => setActive(1)}>Lectura de CV con IA</h6>
                  <div className={cx("_7C3zma_bullets", active === 1 && "_7C3zma_active")}>
                    <div>
                      <div className="flex flex-nowrap m-bottom-8 p-top-24">
                        <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check-circle text-color-brand relative m-right-8 m-top-4" />
                        <div className="Text-module__text--BrHx7" data-variant="body-s">Sube tu CV anterior o tu perfil de LinkedIn</div>
                      </div>
                      <div className="flex flex-nowrap m-bottom-8">
                        <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check-circle text-color-brand relative m-right-8 m-top-4" />
                        <div className="Text-module__text--BrHx7" data-variant="body-s">Separa tu CV en secciones al instante, tal como lo lee un ATS moderno basado en IA</div>
                      </div>
                      <div className="_7C3zma_imageBackground relative hidden-lg hidden-xl m-top-16">
                        <img alt="Lectura de CV con IA" loading="lazy" width="463" height="242" style={{"color": "transparent", "width": "100%", "height": "auto"}} src="/sites/enhancv/fully-equipped-section_es_02.webp" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx("_7C3zma_item", active === 2 && "col-fluid")}>
                  <h6 className={cx("text-md relative cursor-pointer m-0 p-top-16 p-bottom-8 font-weight-bold _7C3zma_title", active === 2 && "_7C3zma_active")} onClick={() => setActive(2)}>Buscador de habilidades con IA</h6>
                  <div className={cx("_7C3zma_bullets", active === 2 && "_7C3zma_active")}>
                    <div>
                      <div className="flex flex-nowrap m-bottom-8 p-top-24">
                        <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check-circle text-color-brand relative m-right-8 m-top-4" />
                        <div className="Text-module__text--BrHx7" data-variant="body-s">Descubre las habilidades que buscan los empleadores</div>
                      </div>
                      <div className="flex flex-nowrap m-bottom-8">
                        <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check-circle text-color-brand relative m-right-8 m-top-4" />
                        <div className="Text-module__text--BrHx7" data-variant="body-s">Genera todas las habilidades relevantes que necesites</div>
                      </div>
                      <div className="_7C3zma_imageBackground relative hidden-lg hidden-xl m-top-16">
                        <img alt="Buscador de habilidades con IA" loading="lazy" width="463" height="242" style={{"color": "transparent", "width": "100%", "height": "auto"}} src="/sites/enhancv/fully-equipped-section_es_03.webp" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx("_7C3zma_item", active === 3 && "col-fluid")}>
                  <h6 className={cx("text-md relative cursor-pointer m-0 p-top-16 p-bottom-8 font-weight-bold _7C3zma_title", active === 3 && "_7C3zma_active")} onClick={() => setActive(3)}>Traduce tu CV con IA</h6>
                  <div className={cx("_7C3zma_bullets", active === 3 && "_7C3zma_active")}>
                    <div>
                      <div className="flex flex-nowrap m-bottom-8 p-top-24">
                        <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check-circle text-color-brand relative m-right-8 m-top-4" />
                        <div className="Text-module__text--BrHx7" data-variant="body-s">Traduce tu CV al instante con un clic</div>
                      </div>
                      <div className="flex flex-nowrap m-bottom-8">
                        <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check-circle text-color-brand relative m-right-8 m-top-4" />
                        <div className="Text-module__text--BrHx7" data-variant="body-s">Conserva el formato original</div>
                      </div>
                      <div className="flex flex-nowrap m-bottom-8">
                        <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check-circle text-color-brand relative m-right-8 m-top-4" />
                        <div className="Text-module__text--BrHx7" data-variant="body-s">Elige entre +30 idiomas disponibles</div>
                      </div>
                      <div className="_7C3zma_imageBackground relative hidden-lg hidden-xl m-top-16">
                        <img alt="Traduce tu CV con IA" loading="lazy" width="463" height="242" style={{"color": "transparent", "width": "100%", "height": "auto"}} src="/sites/enhancv/fully-equipped-section_es_04.webp" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto flex flex-justify-start">
                  <a href={sg.myCv} className="Button-module__button--bJF6M m-top-16" data-button-color="awake" data-size="md" data-type="link">
                    <span className="Button-module__label--V1tZC">Descubre la IA de Enhancv</span>
                    <span className="Button-module__icon---bzmi" aria-hidden="true">
                      <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-arrow-right" />
                    </span>
                  </a>
                </div>
              </div>
              <div className="col-8 hidden-xsm hidden-md p-left-32">
                <div className="_7C3zma_imageBackground relative">
                  <img alt="Generación de contenido con IA" loading="lazy" className={cx("opacity-0", active === 0 && "animation-fade-in")} style={{"position": "absolute", "height": "100%", "width": "100%", "left": "0", "top": "0", "right": "0", "bottom": "0", "color": "transparent"}} src="/sites/enhancv/fully-equipped-section_es_01.webp" />
                  <img alt="Lectura de CV con IA" loading="lazy" className={cx("opacity-0", active === 1 && "animation-fade-in")} style={{"position": "absolute", "height": "100%", "width": "100%", "left": "0", "top": "0", "right": "0", "bottom": "0", "color": "transparent"}} src="/sites/enhancv/fully-equipped-section_es_02.webp" />
                  <img alt="Buscador de habilidades con IA" loading="lazy" className={cx("opacity-0", active === 2 && "animation-fade-in")} style={{"position": "absolute", "height": "100%", "width": "100%", "left": "0", "top": "0", "right": "0", "bottom": "0", "color": "transparent"}} src="/sites/enhancv/fully-equipped-section_es_03.webp" />
                  <img alt="Traduce tu CV con IA" loading="lazy" className={cx("opacity-0", active === 3 && "animation-fade-in")} style={{"position": "absolute", "height": "100%", "width": "100%", "left": "0", "top": "0", "right": "0", "bottom": "0", "color": "transparent"}} src="/sites/enhancv/fully-equipped-section_es_04.webp" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
