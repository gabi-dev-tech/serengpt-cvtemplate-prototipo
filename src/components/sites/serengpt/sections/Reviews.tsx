/* eslint-disable @next/next/no-img-element -- images are served as-is from public/sites/serengpt to keep their exact crop and sizing */
import { cx } from "../cx";
import { sg } from "../serengpt-links";

const values = [
  { title: "Transparencia del mercado", text: "Te mostramos cómo se mueve el mercado laboral y dónde te sitúas en él." },
  { title: "Equidad de oportunidades", text: "Herramientas gratuitas para el público general, en cinco idiomas." },
  { title: "Confidencialidad de datos", text: "Tus datos se alojan en Suiza y nunca se comparten con empleadores ni terceros sin tu consentimiento." },
  { title: "Formación continua", text: "La empleabilidad no se piensa solo cuando falta el trabajo: se cultiva a lo largo de toda la vida." },
  { title: "Movilidad profesional", text: "Anticipa los cambios de tu sector para moverte por elección, no por necesidad." },
  { title: "Inclusión activa", text: "Cualquier persona puede usar SerenGPT, desde el aprendizaje temprano hasta el desarrollo profesional avanzado." },
  { title: "IA ética", text: "La tecnología debe servir a las personas, no sustituirlas." },
  { title: "Autonomía duradera", text: "Te ayudamos a ganar autonomía, confianza y claridad en un mundo en constante cambio." },
];

function ValueCard({ title, text, offset }: { title: string; text: string; offset?: boolean }) {
  return (
    <div className={cx("bg-neutral-solid border-rounded-0 p-inline-24 p-top-16 p-bottom-24 shadow-default m-bottom-40 m-bottom-24-xsm", offset && "m-left-32 m-left-0-sm m-left-0-xs")}>
      <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check-circle text-color-brand m-top-8" style={{"fontSize": "22px"}} />
      <div className="Text-module__text--BrHx7 m-top-8" data-variant="heading-s" data-weight="semibold">{title}</div>
      <div className="Text-module__text--BrHx7 m-top-8" data-variant="body-m">{text}</div>
    </div>
  );
}

/** SerenGPT values (about_us.value1-8), laid out in three staggered columns. */
export function Reviews() {
  return (
    <div data-section="Values" style={{"display": "contents"}}>
      <section>
        <div className="relative container p-top-64 p-bottom-64 p-top-32-xs p-top-16-sm p-bottom-24-xs p-bottom-16-sm BSLg4q_userReviews">
          <img alt="" loading="lazy" width="1440" height="898" className="BSLg4q_userReviewsBg" style={{"color": "transparent"}} src="/sites/serengpt/static_media_reviews-background.22jnn3-_ase_0.webp" />
          <div className="BSLg4q_container">
            <h3 className="h2-xs m-top-32 m-top-24-xsm m-bottom-16 font-weight-bold font-weight-medium-xs col-7-xl col-auto p-right-96-xl">
              {"Lo que nos guía "}
              <br className="hidden-xsm" />
              {" en cada herramienta"}
            </h3>
            <div className="flex">
              <div className="col-4 col-12-xs col-12-sm p-right-40 p-0-xs p-0-sm m-top-64 m-top-0-xs m-top-0-sm">
                <ValueCard {...values[0]} />
                <ValueCard {...values[1]} offset />
                <ValueCard {...values[2]} />
              </div>
              <div className="col-4 col-12-xs col-12-sm m-top-40 order-first-xs order-first-sm">
                <div className="border-rounded-0 p-16 p-24-xs m-bottom-96 m-bottom-24-xsm m-right-96 m-right-0-xs m-right-0-sm m-right-0-md BSLg4q_ratingOpacity">
                  <div className="Text-module__text--BrHx7" data-variant="heading-s" data-weight="semibold">Desarrollado en Ginebra, Suiza</div>
                  <div className="Text-module__text--BrHx7 m-top-16 m-bottom-16" data-variant="body-m">Un equipo multidisciplinar de Declix que combina innovación digital, experiencia en empleabilidad y compromiso humano.</div>
                  <a href={sg.contacts} className="Button-module__button--bJF6M BSLg4q_reviewButtonLink p-0" data-button-color="awake" data-size="md" data-type="link">
                    <span className="Button-module__label--V1tZC">Contáctanos</span>
                    <span className="Button-module__icon---bzmi" aria-hidden="true">
                      <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-arrow-right" />
                    </span>
                  </a>
                </div>
                <ValueCard {...values[3]} />
                <ValueCard {...values[4]} />
              </div>
              <div className="col-4 col-12-xs col-12-sm p-left-40 p-0-xs p-0-sm">
                <ValueCard {...values[5]} />
                <ValueCard {...values[6]} />
                <ValueCard {...values[7]} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
