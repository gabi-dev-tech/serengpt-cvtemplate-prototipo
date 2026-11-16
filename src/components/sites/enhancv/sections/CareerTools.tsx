"use client";
/* eslint-disable @next/next/no-img-element -- source images are served as-is from public/sites/enhancv to keep their exact crop and sizing */

import { useState } from "react";
import { cx } from "../cx";

export function CareerTools() {
  const [active, setActive] = useState(0);
  return (
    <div data-section="Tabs" style={{"display": "contents"}}>
      <section className="iZqDMG_night">
        <div className="qiiXPG_container">
          <div className="iZqDMG_header">
            <h2 className="Text-module__text--BrHx7 iZqDMG_title iZqDMG_onDark m-top-32 m-top-24-xsm m-bottom-16" data-variant="display-l">Toda tu búsqueda de empleo en un solo lugar</h2>
            <p className="Text-module__text--BrHx7 iZqDMG_lead iZqDMG_onDark m-bottom-8" data-variant="body-m">La mayoría de las personas usa tres o cuatro herramientas para postularse. Enhancv lo reúne todo bajo un mismo techo: creación, revisión, adaptación, seguimiento y preparación de entrevistas.</p>
            <div className="iZqDMG_tablist" role="tablist">
              <button type="button" role="tab" aria-selected={active === 0} className={active === 0 ? "iZqDMG_tabActive" : "iZqDMG_tabDark"} onClick={() => setActive(0)}>Creador de CV</button>
              <button type="button" role="tab" aria-selected={active === 1} className={active === 1 ? "iZqDMG_tabActive" : "iZqDMG_tabDark"} onClick={() => setActive(1)}>Comprobador de CV</button>
              <button type="button" role="tab" aria-selected={active === 2} className={active === 2 ? "iZqDMG_tabActive" : "iZqDMG_tabDark"} onClick={() => setActive(2)}>Carta con IA</button>
              <button type="button" role="tab" aria-selected={active === 3} className={active === 3 ? "iZqDMG_tabActive" : "iZqDMG_tabDark"} onClick={() => setActive(3)}>Importar CV</button>
              <button type="button" role="tab" aria-selected={active === 4} className={active === 4 ? "iZqDMG_tabActive" : "iZqDMG_tabDark"} onClick={() => setActive(4)}>Postulaciones</button>
              <button type="button" role="tab" aria-selected={active === 5} className={active === 5 ? "iZqDMG_tabActive" : "iZqDMG_tabDark"} onClick={() => setActive(5)}>Entrevistas</button>
              <button type="button" role="tab" aria-selected={active === 6} className={active === 6 ? "iZqDMG_tabActive" : "iZqDMG_tabDark"} onClick={() => setActive(6)}>Empleos con IA</button>
            </div>
          </div>
          <div role="tabpanel" className={cx("iZqDMG_panel", active !== 0 && "iZqDMG_panelHidden")}>
            <div className="iZqDMG_colTitle">
              <h3 className="Text-module__text--BrHx7 iZqDMG_panelTitle iZqDMG_onDark m-top-32 m-top-24-xsm m-bottom-16" data-variant="heading-xl">Empieza con un CV que te consiga entrevistas</h3>
            </div>
            <div className="iZqDMG_colImage">
              <img alt="Empieza con un CV que te consiga entrevistas" loading="eager" width="648" height="494" className="iZqDMG_image" style={{"color": "transparent"}} src="/sites/enhancv/career-tools_es_resume_builder.webp" />
            </div>
            <div className="iZqDMG_colText">
              <div className="iZqDMG_panelText iZqDMG_text iZqDMG_onDark">
                <div className="_6KASKq_richText">
                  {"Tu búsqueda empieza por el CV. El "}
                  <a href="https://enhancv.com/es/creador-cv-ia/">creador de CV con IA</a>
                  {" de Enhancv redacta y pule cada sección contigo, y luego adapta el CV a cada empleo en minutos."}
                </div>
              </div>
              <ul className="iZqDMG_bullets">
                <li className="iZqDMG_bullet">
                  <div className="iZqDMG_tile iZqDMG_tile-primary">
                    <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-grid-2 iZqDMG_tileIcon" />
                  </div>
                  <p className="Text-module__text--BrHx7 iZqDMG_bulletText iZqDMG_onDark m-bottom-8" data-variant="body-m">Más de 20 secciones de CV diseñadas y revisadas por redactores profesionales de CV certificados.</p>
                </li>
                <li className="iZqDMG_bullet">
                  <div className="iZqDMG_tile iZqDMG_tile-secondary">
                    <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-magic iZqDMG_tileIcon" />
                  </div>
                  <p className="Text-module__text--BrHx7 iZqDMG_bulletText iZqDMG_onDark m-bottom-8" data-variant="body-m">La IA reescribe las viñetas flojas con lenguaje activo y orientado a resultados.</p>
                </li>
                <li className="iZqDMG_bullet">
                  <div className="iZqDMG_tile iZqDMG_tile-info">
                    <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-translate iZqDMG_tileIcon" />
                  </div>
                  <p className="Text-module__text--BrHx7 iZqDMG_bulletText iZqDMG_onDark m-bottom-8" data-variant="body-m">Adapta el mismo CV a cada empleo, en +30 idiomas.</p>
                </li>
              </ul>
            </div>
          </div>
          <div role="tabpanel" className={cx("iZqDMG_panel", active !== 1 && "iZqDMG_panelHidden")}>
            <div className="iZqDMG_colTitle">
              <h3 className="Text-module__text--BrHx7 iZqDMG_panelTitle iZqDMG_onDark m-top-32 m-top-24-xsm m-bottom-16" data-variant="heading-xl">Confirma que tu CV está listo antes de postularte</h3>
            </div>
            <div className="iZqDMG_colImage">
              <img alt="Confirma que tu CV está listo antes de postularte" loading="eager" width="648" height="494" className="iZqDMG_image" style={{"color": "transparent"}} src="/sites/enhancv/page-builder_content_resume_checker.webp" />
            </div>
            <div className="iZqDMG_colText">
              <div className="iZqDMG_panelText iZqDMG_text iZqDMG_onDark">
                <div className="_6KASKq_richText">
                  {"Antes de enviarlo, pásalo por el "}
                  <a href="https://enhancv.com/es/cv-checker/">revisor de CV</a>
                  : un análisis completo del contenido, el formato y la compatibilidad con ATS, con correcciones que puedes aplicar al instante.
                </div>
              </div>
              <ul className="iZqDMG_bullets">
                <li className="iZqDMG_bullet">
                  <div className="iZqDMG_tile iZqDMG_tile-primary">
                    <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check-circle iZqDMG_tileIcon" />
                  </div>
                  <p className="Text-module__text--BrHx7 iZqDMG_bulletText iZqDMG_onDark m-bottom-8" data-variant="body-m">Análisis con 27 verificaciones a fondo: contenido, diseño, gramática y coincidencia de palabras clave.</p>
                </li>
                <li className="iZqDMG_bullet">
                  <div className="iZqDMG_tile iZqDMG_tile-secondary">
                    <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-percent iZqDMG_tileIcon" />
                  </div>
                  <p className="Text-module__text--BrHx7 iZqDMG_bulletText iZqDMG_onDark m-bottom-8" data-variant="body-m">Una puntuación de personalización que te guía en lugar de solo calificarte.</p>
                </li>
                <li className="iZqDMG_bullet">
                  <div className="iZqDMG_tile iZqDMG_tile-info">
                    <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-magic iZqDMG_tileIcon" />
                  </div>
                  <p className="Text-module__text--BrHx7 iZqDMG_bulletText iZqDMG_onDark m-bottom-8" data-variant="body-m">Correcciones en cada viñeta basadas en tu propia experiencia.</p>
                </li>
              </ul>
            </div>
          </div>
          <div role="tabpanel" className={cx("iZqDMG_panel", active !== 2 && "iZqDMG_panelHidden")}>
            <div className="iZqDMG_colTitle">
              <h3 className="Text-module__text--BrHx7 iZqDMG_panelTitle iZqDMG_onDark m-top-32 m-top-24-xsm m-bottom-16" data-variant="heading-xl">Agrega una carta de presentación que aporte valor</h3>
            </div>
            <div className="iZqDMG_colImage">
              <img alt="Agrega una carta de presentación que aporte valor" loading="eager" width="648" height="494" className="iZqDMG_image" style={{"color": "transparent"}} src="/sites/enhancv/career-tools_es_cover_letter.webp" />
            </div>
            <div className="iZqDMG_colText">
              <div className="iZqDMG_panelText iZqDMG_text iZqDMG_onDark">
                <div className="_6KASKq_richText">
                  {"Cuando un puesto la pide, el "}
                  <a href="https://enhancv.com/es/generador-de-cartas-de-presentacion/">generador de cartas de presentación con IA</a>
                  {" escribe una carta adaptada a partir de tu CV y de la oferta de empleo, con un diseño que hace juego."}
                </div>
              </div>
              <ul className="iZqDMG_bullets">
                <li className="iZqDMG_bullet">
                  <div className="iZqDMG_tile iZqDMG_tile-primary">
                    <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-pen-tool iZqDMG_tileIcon" />
                  </div>
                  <p className="Text-module__text--BrHx7 iZqDMG_bulletText iZqDMG_onDark m-bottom-8" data-variant="body-m">La IA parte de tu CV en lugar de repetirlo.</p>
                </li>
                <li className="iZqDMG_bullet">
                  <div className="iZqDMG_tile iZqDMG_tile-secondary">
                    <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-magic iZqDMG_tileIcon" />
                  </div>
                  <p className="Text-module__text--BrHx7 iZqDMG_bulletText iZqDMG_onDark m-bottom-8" data-variant="body-m">Una carta nueva y personalizada para cada postulación.</p>
                </li>
                <li className="iZqDMG_bullet">
                  <div className="iZqDMG_tile iZqDMG_tile-info">
                    <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-templates iZqDMG_tileIcon" />
                  </div>
                  <p className="Text-module__text--BrHx7 iZqDMG_bulletText iZqDMG_onDark m-bottom-8" data-variant="body-m">CV y carta de presentación con el mismo diseño, para una postulación coherente y cuidada.</p>
                </li>
              </ul>
            </div>
          </div>
          <div role="tabpanel" className={cx("iZqDMG_panel", active !== 3 && "iZqDMG_panelHidden")}>
            <div className="iZqDMG_colTitle">
              <h3 className="Text-module__text--BrHx7 iZqDMG_panelTitle iZqDMG_onDark m-top-32 m-top-24-xsm m-bottom-16" data-variant="heading-xl">¿Ya tienes un CV? Empieza por ahí</h3>
            </div>
            <div className="iZqDMG_colImage">
              <img alt="¿Ya tienes un CV? Empieza por ahí" loading="eager" width="648" height="494" className="iZqDMG_image" style={{"color": "transparent"}} src="/sites/enhancv/career-tools_es_linkedin_profile.webp" />
            </div>
            <div className="iZqDMG_colText">
              <div className="iZqDMG_panelText iZqDMG_text iZqDMG_onDark">
                <div className="_6KASKq_richText">
                  {"Olvídate de la página en blanco. Sube tu CV actual o pega tu "}
                  <a href="https://enhancv.com/es/generador-de-curriculum-linkedin/">perfil de LinkedIn</a>
                  {" y Enhancv lo convierte en un borrador listo para los reclutadores."}
                </div>
              </div>
              <ul className="iZqDMG_bullets">
                <li className="iZqDMG_bullet">
                  <div className="iZqDMG_tile iZqDMG_tile-primary">
                    <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-resume iZqDMG_tileIcon" />
                  </div>
                  <p className="Text-module__text--BrHx7 iZqDMG_bulletText iZqDMG_onDark m-bottom-8" data-variant="body-m">Convierte un CV antiguo en un diseño de Enhancv pulido y bien estructurado.</p>
                </li>
                <li className="iZqDMG_bullet">
                  <div className="iZqDMG_tile iZqDMG_tile-info">
                    <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-social-linkedin iZqDMG_tileIcon" />
                  </div>
                  <p className="Text-module__text--BrHx7 iZqDMG_bulletText iZqDMG_onDark m-bottom-8" data-variant="body-m">Crea un CV completo desde tu URL de LinkedIn en segundos.</p>
                </li>
                <li className="iZqDMG_bullet">
                  <div className="iZqDMG_tile iZqDMG_tile-warning">
                    <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-briefcase iZqDMG_tileIcon" />
                  </div>
                  <p className="Text-module__text--BrHx7 iZqDMG_bulletText iZqDMG_onDark m-bottom-8" data-variant="body-m">Conserva intacta tu experiencia laboral, ahora con un mejor diseño.</p>
                </li>
              </ul>
            </div>
          </div>
          <div role="tabpanel" className={cx("iZqDMG_panel", active !== 4 && "iZqDMG_panelHidden")}>
            <div className="iZqDMG_colTitle">
              <h3 className="Text-module__text--BrHx7 iZqDMG_panelTitle iZqDMG_onDark m-top-32 m-top-24-xsm m-bottom-16" data-variant="heading-xl">Controla cada puesto al que te postulas</h3>
            </div>
            <div className="iZqDMG_colImage">
              <img alt="Controla cada puesto al que te postulas" loading="eager" width="648" height="494" className="iZqDMG_image" style={{"color": "transparent"}} src="/sites/enhancv/page-builder_content_job_tracker.webp" />
            </div>
            <div className="iZqDMG_colText">
              <div className="iZqDMG_panelText iZqDMG_text iZqDMG_onDark">
                <div className="_6KASKq_richText">A medida que te postulas a más puestos, el seguimiento de empleos reúne tus CV adaptados, tus notas y los estados en una sola vista, con tu progreso semanal.</div>
              </div>
              <ul className="iZqDMG_bullets">
                <li className="iZqDMG_bullet">
                  <div className="iZqDMG_tile iZqDMG_tile-primary">
                    <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-pen-tool iZqDMG_tileIcon" />
                  </div>
                  <p className="Text-module__text--BrHx7 iZqDMG_bulletText iZqDMG_onDark m-bottom-8" data-variant="body-m">Organiza los CV adaptados y las cartas de presentación de cada postulación.</p>
                </li>
                <li className="iZqDMG_bullet">
                  <div className="iZqDMG_tile iZqDMG_tile-warning">
                    <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check-circle iZqDMG_tileIcon" />
                  </div>
                  <p className="Text-module__text--BrHx7 iZqDMG_bulletText iZqDMG_onDark m-bottom-8" data-variant="body-m">Asigna un estado a cada puesto y agrega tus propios campos personalizados.</p>
                </li>
                <li className="iZqDMG_bullet">
                  <div className="iZqDMG_tile iZqDMG_tile-info">
                    <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-custom-upload iZqDMG_tileIcon" />
                  </div>
                  <p className="Text-module__text--BrHx7 iZqDMG_bulletText iZqDMG_onDark m-bottom-8" data-variant="body-m">Importa tu tracker actual de Sheets o Excel en menos de un minuto.</p>
                </li>
              </ul>
            </div>
          </div>
          <div role="tabpanel" className={cx("iZqDMG_panel", active !== 5 && "iZqDMG_panelHidden")}>
            <div className="iZqDMG_colTitle">
              <h3 className="Text-module__text--BrHx7 iZqDMG_panelTitle iZqDMG_onDark m-top-32 m-top-24-xsm m-bottom-16" data-variant="heading-xl">Convierte tus entrevistas en contrataciones</h3>
            </div>
            <div className="iZqDMG_colImage">
              <img alt="Convierte tus entrevistas en contrataciones" loading="eager" width="648" height="494" className="iZqDMG_image" style={{"color": "transparent"}} src="/sites/enhancv/career-tools_es_interview_prep.webp" />
            </div>
            <div className="iZqDMG_colText">
              <div className="iZqDMG_panelText iZqDMG_text iZqDMG_onDark">
                <div className="_6KASKq_richText">Cuando consigas la entrevista, la ayuda para entrevistas con IA te da las preguntas más probables, respuestas sólidas e información sobre la empresa a partir de la oferta de empleo y tu experiencia.</div>
              </div>
              <ul className="iZqDMG_bullets">
                <li className="iZqDMG_bullet">
                  <div className="iZqDMG_tile iZqDMG_tile-primary">
                    <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-magic iZqDMG_tileIcon" />
                  </div>
                  <p className="Text-module__text--BrHx7 iZqDMG_bulletText iZqDMG_onDark m-bottom-8" data-variant="body-m">Genera preguntas de entrevista, historias STAR y una presentación personal.</p>
                </li>
                <li className="iZqDMG_bullet">
                  <div className="iZqDMG_tile iZqDMG_tile-secondary">
                    <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-light-bulb iZqDMG_tileIcon" />
                  </div>
                  <p className="Text-module__text--BrHx7 iZqDMG_bulletText iZqDMG_onDark m-bottom-8" data-variant="body-m">Conoce las etapas y el formato probables de la entrevista, según información pública sobre la empresa.</p>
                </li>
                <li className="iZqDMG_bullet">
                  <div className="iZqDMG_tile iZqDMG_tile-warning">
                    <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-monitor iZqDMG_tileIcon" />
                  </div>
                  <p className="Text-module__text--BrHx7 iZqDMG_bulletText iZqDMG_onDark m-bottom-8" data-variant="body-m">Obtén una investigación rápida de la empresa: noticias, valores y contexto del sector.</p>
                </li>
              </ul>
            </div>
          </div>
          <div role="tabpanel" className={cx("iZqDMG_panel", active !== 6 && "iZqDMG_panelHidden")}>
            <div className="iZqDMG_colTitle">
              <h3 className="Text-module__text--BrHx7 iZqDMG_panelTitle iZqDMG_onDark m-top-32 m-top-24-xsm m-bottom-16" data-variant="heading-xl">Encuentra los puestos que valen la pena</h3>
            </div>
            <div className="iZqDMG_colImage">
              <img alt="Encuentra los puestos que valen la pena" loading="eager" width="648" height="494" className="iZqDMG_image" style={{"color": "transparent"}} src="/sites/enhancv/career-tools_es_job_search.webp" />
            </div>
            <div className="iZqDMG_colText">
              <div className="iZqDMG_panelText iZqDMG_text iZqDMG_onDark">
                <div className="_6KASKq_richText">¿No sabes dónde postularte? Describe tu empleo ideal con tus propias palabras y la búsqueda de empleo con IA de Enhancv te muestra las mejores coincidencias entre +1 millón de ofertas activas.</div>
              </div>
              <ul className="iZqDMG_bullets">
                <li className="iZqDMG_bullet">
                  <div className="iZqDMG_tile iZqDMG_tile-warning">
                    <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-database iZqDMG_tileIcon" />
                  </div>
                  <p className="Text-module__text--BrHx7 iZqDMG_bulletText iZqDMG_onDark m-bottom-8" data-variant="body-m">Busca entre millones de ofertas de empleo actuales como usuario PRO.</p>
                </li>
                <li className="iZqDMG_bullet">
                  <div className="iZqDMG_tile iZqDMG_tile-primary">
                    <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-percent iZqDMG_tileIcon" />
                  </div>
                  <p className="Text-module__text--BrHx7 iZqDMG_bulletText iZqDMG_onDark m-bottom-8" data-variant="body-m">Consulta de un vistazo la puntuación de coincidencia de tu CV con cada puesto.</p>
                </li>
                <li className="iZqDMG_bullet">
                  <div className="iZqDMG_tile iZqDMG_tile-info">
                    <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-crosshair iZqDMG_tileIcon" />
                  </div>
                  <p className="Text-module__text--BrHx7 iZqDMG_bulletText iZqDMG_onDark m-bottom-8" data-variant="body-m">Olvídate de las postulaciones masivas y enfócate en los puestos que realmente encajan contigo.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
