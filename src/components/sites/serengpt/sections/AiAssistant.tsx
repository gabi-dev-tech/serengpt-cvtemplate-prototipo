"use client";
/* eslint-disable @next/next/no-img-element -- images are served as-is from public/sites/serengpt to keep their exact crop and sizing */

import { useState } from "react";
import { cx } from "../cx";
import { sg } from "../serengpt-links";

const P = "/sites/serengpt/product";

const tools = [
  {
    title: "Análisis de CV",
    image: `${P}/analisis-cv.png`,
    bullets: [
      "Revisa cómo te leen los reclutadores",
      "Descubre tus fortalezas y las posibles mejoras de tu CV",
      "Obtén una puntuación general de tu perfil",
    ],
  },
  {
    title: "IA Chat",
    image: `${P}/ia-chat-v2.png`,
    bullets: [
      "Tu espacio para preguntar y explorar",
      "Resuelve dudas sobre tu CV, tu salario o tu búsqueda de empleo",
    ],
  },
  {
    title: "Insights",
    image: `${P}/insights.png`,
    bullets: [
      "Entiende qué está cambiando en tu sector",
      "Descubre dónde tienes ventaja y qué puedes reforzar",
      "Recibe consejos para destacar en tu próxima candidatura",
    ],
  },
  {
    title: "Elevated Pitch",
    image: `${P}/pitch-destacada.png`,
    bullets: [
      "Genera una presentación con un clic desde tu perfil",
      "O responde algunas preguntas para una presentación a medida",
    ],
  },
];

const imageFill = { position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "contain", color: "transparent" } as const;

export function AiAssistant() {
  const [active, setActive] = useState(0);
  return (
    <div data-section="Feature tabs" style={{"display": "contents"}}>
      <section className="fully-equipped-section p-block-64 p-block-32-xsm relative _7C3zma_fullyEquippedSection">
        <img alt="" loading="lazy" width="1599" height="634" className="_7C3zma_background animation-breath" style={{"color": "transparent"}} src="/sites/serengpt/fully-equipped-section_background.webp" />
        <div className="container flex flex-justify-center _7C3zma_container">
          <div className="col-8 col-12-xsm text-color-inverse text-align-center text-align-start-xsm m-bottom-24">
            <h3 className="Text-module__text--BrHx7 m-top-32 m-top-24-xsm m-bottom-16" data-variant="heading-xl" data-color="inverse">Prepárate como lo vería un reclutador</h3>
            <p className="Text-module__text--BrHx7 m-bottom-8" data-variant="body-m" data-color="inherit">La Zona del Reclutador de SerenGPT reúne herramientas con IA para mejorar tu CV, entender tu mercado y presentarte mejor. Cada recomendación parte de tu perfil real.</p>
          </div>
          <div className="flex flex-justify-space-between flex-nowrap flex-direction-column col-12 bg-neutral-solid p-inline-32 p-top-32 p-bottom-24 p-16-xsm border-rounded-4 _7C3zma_content">
            <div className="col-fluid flex flex-justify-center">
              <div className="col-4 col-12-xsm col-12-md flex flex-direction-column">
                {tools.map((tool, i) => (
                  <div key={tool.title} className={cx("_7C3zma_item", active === i && "col-fluid")}>
                    <h6 className={cx("text-md relative cursor-pointer m-0 p-top-16 p-bottom-8 font-weight-bold _7C3zma_title", active === i && "_7C3zma_active")} onClick={() => setActive(i)}>{tool.title}</h6>
                    <div className={cx("_7C3zma_bullets", active === i && "_7C3zma_active")}>
                      <div>
                        {tool.bullets.map((bullet, j) => (
                          <div key={bullet} className={cx("flex flex-nowrap m-bottom-8", j === 0 && "p-top-24")}>
                            <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check-circle text-color-brand relative m-right-8 m-top-4" />
                            <div className="Text-module__text--BrHx7" data-variant="body-s">{bullet}</div>
                          </div>
                        ))}
                        <div className="_7C3zma_imageBackground relative hidden-lg hidden-xl m-top-16">
                          <img alt={tool.title} loading="lazy" width="242" height="242" style={{"color": "transparent", "width": "100%", "height": "242px", "objectFit": "contain"}} src={tool.image} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="col-auto flex flex-justify-start">
                  <a href={sg.recruiterZone} className="Button-module__button--bJF6M m-top-16" data-button-color="awake" data-size="md" data-type="link">
                    <span className="Button-module__label--V1tZC">Descubre la Zona del Reclutador</span>
                    <span className="Button-module__icon---bzmi" aria-hidden="true">
                      <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-arrow-right" />
                    </span>
                  </a>
                </div>
              </div>
              <div className="col-8 hidden-xsm hidden-md p-left-32">
                <div className="_7C3zma_imageBackground relative">
                  {tools.map((tool, i) => (
                    <img key={tool.title} alt={tool.title} loading="lazy" className={cx("opacity-0", active === i && "animation-fade-in")} style={imageFill} src={tool.image} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
