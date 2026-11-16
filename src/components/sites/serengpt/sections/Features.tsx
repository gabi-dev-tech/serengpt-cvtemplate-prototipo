/* eslint-disable @next/next/no-img-element -- images are served as-is from public/sites/serengpt to keep their exact crop and sizing */
import type { ReactNode } from "react";
import { cx } from "../cx";
import { templateById } from "../export/templates";
import { TemplateThumb } from "./TemplateThumb";

const P = "/sites/serengpt/product";
const mediaBox = { height: "420px", objectFit: "contain" } as const;

type Feature = { title: string; text: string; bullets: string[]; media: ReactNode };

const features: Feature[] = [
  {
    title: "Empieza por tu Job Fitness",
    text: "El Job Fitness es una medida de tu alineación con el mercado laboral suizo en un momento dado. Te orienta hacia el primer paso correcto.",
    bullets: [
      "Qué juega a tu favor.",
      "Qué frena tu perfil.",
      "Qué oportunidades están cerca de ti, sin que tengas que buscarlas tú mismo.",
    ],
    media: <img alt="Empieza por tu Job Fitness" loading="lazy" width="648" height="420" className="_4HWzVq_image border-rounded-4" style={{"color": "transparent", ...mediaBox, "objectFit": "cover"}} src={`${P}/job-fitness-promo.webp`} />,
  },
  {
    title: "Fortalece tu perfil",
    text: "Personaliza tu CV y tu carta de presentación según las expectativas reales de los reclutadores, a partir de la información de tu perfil.",
    bullets: [
      "Un CV Express de una página en formato ATS, sin inventar información.",
      "Una carta de presentación adaptada a cada candidatura.",
      "Varios perfiles para adaptarte a otra profesión.",
    ],
    media: <img alt="Fortalece tu perfil" loading="lazy" width="648" height="420" className="_4HWzVq_image" style={{"color": "transparent", ...mediaBox}} src={`${P}/options-woman.webp`} />,
  },
  {
    title: "Plantillas compatibles con ATS, en Word",
    text: "Elige una plantilla, completa tu CV y descárgalo en Word (.docx) con texto editable, para que los sistemas de seguimiento de candidatos lean tu información sin perder datos.",
    bullets: [
      "Secciones claras: Contacto, Resumen, Experiencia, Educación, Habilidades, Idiomas y Certificaciones.",
      "Diseños de una y dos columnas.",
      "Un archivo que puedes seguir editando en Word.",
    ],
    media: (
      <div className="_4HWzVq_image flex flex-nowrap flex-justify-center" style={{ gap: "16px", padding: "24px" }}>
        <div style={{ width: "45%", maxWidth: "260px" }}><TemplateThumb template={templateById("moderno")} /></div>
        <div style={{ width: "45%", maxWidth: "260px", marginTop: "48px" }}><TemplateThumb template={templateById("clasico")} /></div>
      </div>
    ),
  },
  {
    title: "Revisa cómo te leen los reclutadores",
    text: "El análisis de CV de la Zona del Reclutador evalúa tu CV desde el punto de vista de quien lo va a leer, antes de que lo envíes.",
    bullets: [
      "Una puntuación general de tu CV.",
      "Tus fortalezas, explicadas una por una.",
      "Las posibles mejoras que más impacto tendrían.",
    ],
    media: <img alt="Revisa cómo te leen los reclutadores" loading="lazy" width="648" height="420" className="_4HWzVq_image" style={{"color": "transparent", ...mediaBox}} src={`${P}/analisis-cv.png`} />,
  },
];

function FeatureText({ feature, imageFirst }: { feature: Feature; imageFirst: boolean }) {
  return (
    <div className={cx("col-6 col-12-xsm m-top-16-xsm", imageFirst ? "p-left-80 p-left-0-xsm" : "p-right-80 p-right-0-xsm")}>
      <div>
        <div className="opacity-0 Cj4gqG_contentAnimation" data-reveal="animation-slide-fade-in-up">
          <h4 className="Text-module__text--BrHx7 m-top-32 m-top-16-xsm m-bottom-16" data-variant="heading-l">{feature.title}</h4>
          <p className="Text-module__text--BrHx7 m-bottom-16" data-variant="body-m">{feature.text}</p>
          {feature.bullets.map((bullet) => (
            <div key={bullet} className="flex flex-align-top m-bottom-8 flex-nowrap">
              <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check-circle text-color-brand m-right-8" style={{"fontSize": "21px"}} />
              <div className="Text-module__text--BrHx7" data-variant="body-s">{bullet}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureMedia({ feature, index, imageFirst }: { feature: Feature; index: number; imageFirst: boolean }) {
  return (
    <div className={cx("col-6 col-12-xsm relative", !imageFirst && "order-first-xsm")}>
      <div className="_4HWzVq_imageWrapper">
        <div className="opacity-0" data-reveal="animation-fade-in">{feature.media}</div>
      </div>
      <img alt="" loading="lazy" width="648" height="388" className="_4HWzVq_pattern animation-breath" style={{"color": "transparent"}} src="/sites/serengpt/features-section_pattern.webp" />
      <div className={cx("_4HWzVq_gradient", `_4HWzVq_gr${index + 1}`, index === 2 && "animation-breath")} />
    </div>
  );
}

export function Features() {
  return (
    <div data-section="Feature rows" style={{"display": "contents"}}>
      <div>
        <section className="features-section p-block-80 p-top-32-xsm p-bottom-0-xsm bg-neutral-solid">
          <div className="container">
            <div className="text-align-center bg-neutral-subtle border-rounded-3 p-block-32">
              <h3 className="Text-module__text--BrHx7" data-variant="heading-xl">Cómo SerenGPT ayuda a los candidatos de hoy</h3>
            </div>
            {features.map((feature, i) => {
              const imageFirst = i % 2 === 0;
              return (
                <div key={feature.title} className="flex flex-align-center p-block-64 p-block-24-xsm">
                  {imageFirst ? (
                    <>
                      <FeatureMedia feature={feature} index={i} imageFirst />
                      <FeatureText feature={feature} imageFirst />
                    </>
                  ) : (
                    <>
                      <FeatureText feature={feature} imageFirst={false} />
                      <FeatureMedia feature={feature} index={i} imageFirst={false} />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
