"use client";
/* eslint-disable @next/next/no-img-element -- images are served as-is from public/sites/serengpt to keep their exact crop and sizing */

import { useState } from "react";
import { cx } from "../cx";

const P = "/sites/serengpt/product";

const audiences = [
  {
    title: "Si buscas empleo",
    image: `${P}/profession-image-4.png`,
    text: "SerenGPT te ayuda a entender tu posición en el mercado laboral, reforzar tu perfil y preparar tus entrevistas, para que cada candidatura cuente.",
    points: ["Entiende tu posición", "Refuerza tu perfil y tu CV", "Prepara tus entrevistas"],
  },
  {
    title: "Si ya trabajas",
    image: `${P}/profession-image-2.png`,
    text: "Anticipa los cambios de tu sector y mantente alineado con lo que pide el mercado, para moverte por elección y no por necesidad.",
    points: ["Sigue las tendencias de tu sector", "Detecta las competencias que ganan peso", "Mantén tu perfil al día"],
  },
  {
    title: "En cualquier etapa profesional",
    image: `${P}/profession-image-3.png`,
    text: "Cualquier persona puede usar SerenGPT. Algunas funciones serán más relevantes según tu etapa, desde el aprendizaje temprano hasta el desarrollo profesional avanzado.",
    points: ["Aprendices y primeros empleos", "Cambios de carrera", "Desarrollo profesional avanzado"],
  },
];

/** "Pensado para cada momento de tu carrera": one panel open at a time (click to switch). */
export function ForApplicants() {
  const [active, setActive] = useState(0);
  return (
    <div data-section="Audience accordion" style={{"display": "contents"}}>
      <section className="for-applicants-section p-block-64 p-block-32-xsm relative tUzjhG_forApplicantsSection">
        <div className="container flex flex-justify-center">
          <div className="col-8 col-12-md col-12-xsm m-bottom-16 relative">
            <img alt="" loading="lazy" width="100" height="368" className="tUzjhG_constellation1 hidden-xsm" style={{"color": "transparent"}} src="/sites/serengpt/for-applicants-section_constellation1.webp" />
            <img alt="" loading="lazy" width="293" height="311" className="tUzjhG_constellation2 hidden-xsm" style={{"color": "transparent"}} src="/sites/serengpt/for-applicants-section_constellation2.webp" />
            <img alt="" loading="lazy" width="496" height="450" className="tUzjhG_gradient" style={{"color": "transparent"}} src="/sites/serengpt/for-applicants-section_gradient.webp" />
            <h3 className="Text-module__text--BrHx7 p-bottom-32 m-top-32 m-top-24-xsm m-bottom-16" data-variant="heading-xl">Pensado para cada momento de tu carrera</h3>
            <div className="flex">
              <div className="col-12 border-rounded-4 m-top-24 tUzjhG_menu">
                {audiences.map((audience, i) => (
                  <div key={audience.title}>
                    <div className={cx("tUzjhG_menuItem full-width p-24 flex flex-nowrap cursor-pointer", active === i && "tUzjhG_active")} onClick={() => setActive(i)}>
                      <div>
                        {active === i ? (
                          <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-disc text-color-accent m-right-8" style={{ fontSize: "22px" }} />
                        ) : (
                          <div className="tUzjhG_icon bg-accent-solid m-right-8">
                            <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-plus text-color-inverse" />
                          </div>
                        )}
                      </div>
                      <h6 className="Text-module__text--BrHx7" data-variant="heading-s">{audience.title}</h6>
                    </div>
                    <div className={cx("border-rounded-4 p-inline-32 tUzjhG_card", active === i && "tUzjhG_active")}>
                      <div className="flex full-width flex-wrap">
                        <div className="col-6 col-12-xsm flex flex-align-bottom flex-justify-center tUzjhG_imageWrapper">
                          <img alt={audience.title} loading="lazy" width="200" height="200" style={{"color": "transparent", "width": "200px", "maxWidth": "100%", "height": "auto", "objectFit": "contain", "marginBottom": "24px"}} src={audience.image} />
                        </div>
                        <div className="col-6 col-12-xsm p-left-24 p-left-0-xsm relative">
                          <div>
                            <p className="Text-module__text--BrHx7 m-block-16-xsm m-bottom-8" data-variant="body-s">{audience.text}</p>
                            <div className="m-bottom-40 m-bottom-24-xsm">
                              {audience.points.map((point) => (
                                <div key={point} className="flex flex-nowrap">
                                  <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check text-color-brand" style={{"fontSize": "24px"}} />
                                  <p className="Text-module__text--BrHx7 m-left-8" data-variant="body-m" data-weight="bold">{point}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
