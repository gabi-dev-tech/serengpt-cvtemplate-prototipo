"use client";
/* eslint-disable @next/next/no-img-element -- images are served as-is from public/sites/serengpt to keep their exact crop and sizing */

import type { ReactNode } from "react";
import { useState } from "react";
import { cx } from "../cx";
import { sg } from "../serengpt-links";

const P = "/sites/serengpt/product";
const TILES = ["iZqDMG_tile-primary", "iZqDMG_tile-secondary", "iZqDMG_tile-info"];

type Tool = {
  tab: string;
  title: string;
  image: string;
  text: ReactNode;
  bullets: { icon: string; text: string }[];
};

const tools: Tool[] = [
  {
    tab: "Mi CV",
    title: "Crea tu perfil profesional y tu CV",
    image: `${P}/profile-builder.svg`,
    text: (
      <>
        {"Tu búsqueda empieza por tu perfil. En "}
        <a href={sg.myCv}>Mi CV</a>
        {" completas tu experiencia, tu educación, tus objetivos y tus competencias, y SerenGPT lo convierte en un CV listo para enviar."}
      </>
    ),
    bullets: [
      { icon: "icon-ui-magic", text: "Genera un CV Express de una página en formato ATS, sin inventar información." },
      { icon: "icon-ui-grid-2", text: "Crea varios perfiles y adapta uno a otra profesión." },
      { icon: "icon-ui-translate", text: "Traduce tu perfil y elige el idioma de tu CV." },
    ],
  },
  {
    tab: "Análisis de CV",
    title: "Revisa cómo te leen los reclutadores",
    image: `${P}/recruiter.svg`,
    text: (
      <>
        {"Antes de enviarlo, pásalo por el "}
        <a href={sg.cvAnalysis}>análisis de CV</a>
        {" de la Zona del Reclutador: una evaluación de tu CV desde el punto de vista de quien lo va a leer."}
      </>
    ),
    bullets: [
      { icon: "icon-ui-percent", text: "Una puntuación general de tu CV." },
      { icon: "icon-ui-check-circle", text: "Tus fortalezas, explicadas una por una." },
      { icon: "icon-ui-light-bulb", text: "Las posibles mejoras que más impacto tendrían." },
    ],
  },
  {
    tab: "Carta",
    title: "Agrega una carta de presentación a medida",
    image: `${P}/cover-letter-generator.svg`,
    text: (
      <>
        {"Genera y revisa una "}
        <a href={sg.coverLetter}>carta de presentación</a>
        {" adaptada a cada candidatura, según las expectativas reales de los reclutadores."}
      </>
    ),
    bullets: [
      { icon: "icon-ui-pen-tool", text: "Parte de tu perfil y de la oferta a la que te postulas." },
      { icon: "icon-ui-translate", text: "Elige el idioma de tu carta." },
      { icon: "icon-ui-check-circle", text: "Revísala y ajústala antes de enviarla." },
    ],
  },
  {
    tab: "Mi foto",
    title: "Cuida tu imagen profesional",
    image: `${P}/photo-placeholder.png`,
    text: (
      <>
        {"Con "}
        <a href={sg.myPhoto}>Mi foto</a>
        {" generas una foto de perfil profesional adaptada a tu sector."}
      </>
    ),
    bullets: [
      { icon: "icon-ui-magic", text: "Crea o actualiza la foto de tu perfil." },
      { icon: "icon-ui-design", text: "Un estilo acorde a tu sector." },
    ],
  },
  {
    tab: "Empleos",
    title: "Encuentra empleos compatibles",
    image: `${P}/job-matching.svg`,
    text: (
      <>
        {"La "}
        <a href={sg.jobSearch}>búsqueda de empleo</a>
        {" te muestra ofertas que coinciden con tu perfil, filtradas para el mercado suizo."}
      </>
    ),
    bullets: [
      { icon: "icon-ui-crosshair", text: "Ofertas relevantes según tus habilidades y tu experiencia." },
      { icon: "icon-ui-percent", text: "Tu perfil mejora las coincidencias y las recomendaciones." },
      { icon: "icon-ui-database", text: "Busca y revisa las ofertas desde un mismo lugar." },
    ],
  },
  {
    tab: "Entrevistas",
    title: "Entrena para tus entrevistas",
    image: `${P}/interview.svg`,
    text: (
      <>
        {"Con "}
        <a href={sg.jobInterview}>Entrevista de trabajo</a>
        {" simulas una entrevista para el puesto que te interesa y recibes feedback personalizado."}
      </>
    ),
    bullets: [
      { icon: "icon-ui-magic", text: "Practica con preguntas de entrevista para tu puesto." },
      { icon: "icon-ui-light-bulb", text: "Recibe consejos desde el punto de vista del reclutador." },
      { icon: "icon-ui-monitor", text: "Recibe feedback personalizado sobre tus respuestas." },
    ],
  },
  {
    tab: "Mercado",
    title: "Descubre dónde estás en el mercado laboral suizo",
    image: `${P}/profession-image-1.png`,
    text: (
      <>
        {"El "}
        <a href={sg.market}>panel del mercado</a>
        {" y tu radar de "}
        <a href={sg.employability}>Job Fitness</a>
        {" muestran cómo tu perfil corresponde a la demanda real del mercado."}
      </>
    ),
    bullets: [
      { icon: "icon-ui-monitor", text: "Explora el mercado laboral sin necesidad de crear un perfil." },
      { icon: "icon-ui-crosshair", text: "Descubre qué juega a tu favor y qué frena tu perfil." },
      { icon: "icon-ui-light-bulb", text: "Anticipa los cambios de tu sector." },
    ],
  },
];

export function CareerTools() {
  const [active, setActive] = useState(0);
  return (
    <div data-section="Tabs" style={{"display": "contents"}}>
      <section className="iZqDMG_night">
        <div className="qiiXPG_container">
          <div className="iZqDMG_header">
            <h2 className="Text-module__text--BrHx7 iZqDMG_title iZqDMG_onDark m-top-32 m-top-24-xsm m-bottom-16" data-variant="display-l">Toda tu búsqueda de empleo en un solo lugar</h2>
            <p className="Text-module__text--BrHx7 iZqDMG_lead iZqDMG_onDark m-bottom-8" data-variant="body-m">SerenGPT reúne en un mismo lugar todo lo que necesitas para postularte: tu perfil y tu CV, el análisis de tu CV, la carta de presentación, la búsqueda de empleo y la preparación de entrevistas.</p>
            <div className="iZqDMG_tablist" role="tablist">
              {tools.map((tool, i) => (
                <button key={tool.tab} type="button" role="tab" aria-selected={active === i} className={active === i ? "iZqDMG_tabActive" : "iZqDMG_tabDark"} onClick={() => setActive(i)}>{tool.tab}</button>
              ))}
            </div>
          </div>
          {tools.map((tool, i) => (
            <div key={tool.tab} role="tabpanel" className={cx("iZqDMG_panel", active !== i && "iZqDMG_panelHidden")}>
              <div className="iZqDMG_colTitle">
                <h3 className="Text-module__text--BrHx7 iZqDMG_panelTitle iZqDMG_onDark m-top-32 m-top-24-xsm m-bottom-16" data-variant="heading-xl">{tool.title}</h3>
              </div>
              <div className="iZqDMG_colImage">
                <img alt={tool.title} loading="eager" width="648" height="320" className="iZqDMG_image" style={{"color": "transparent", "height": "320px", "objectFit": "contain"}} src={tool.image} />
              </div>
              <div className="iZqDMG_colText">
                <div className="iZqDMG_panelText iZqDMG_text iZqDMG_onDark">
                  <div className="_6KASKq_richText">{tool.text}</div>
                </div>
                <ul className="iZqDMG_bullets">
                  {tool.bullets.map((bullet, j) => (
                    <li key={bullet.text} className="iZqDMG_bullet">
                      <div className={cx("iZqDMG_tile", TILES[j % TILES.length])}>
                        <i aria-hidden="true" className={cx("Icon-module__icon--5oSUz iZqDMG_tileIcon", bullet.icon)} />
                      </div>
                      <p className="Text-module__text--BrHx7 iZqDMG_bulletText iZqDMG_onDark m-bottom-8" data-variant="body-m">{bullet.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
