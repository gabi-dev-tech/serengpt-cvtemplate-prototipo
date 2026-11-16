/* eslint-disable @next/next/no-img-element -- source images are served as-is from public/sites/enhancv to keep their exact crop and sizing */
import { HeroCard } from "./HeroCard";
import { HeroCardSlot } from "./HeroCardSlot";
import { TemplateCarousel } from "./TemplateCarousel";

export function Hero() {
  return (
    <div data-section="hero" style={{"display": "contents"}}>
      <section className="p-top-40 p-top-0-xs p-top-0-sm p-top-0-md p-bottom-8 bg-neutral-subtle relative">
        <div className="P6Mlfq_backgroundImage">
          <img alt="" className="animation-fade-in" style={{"position": "absolute", "height": "100%", "width": "100%", "left": "0", "top": "0", "right": "0", "bottom": "0", "objectFit": "fill", "objectPosition": "center", "color": "transparent", "paddingBottom": "16%"}} src="/sites/enhancv/media/background.0bl6ibs3h3b3b.svg" />
        </div>
        <div className="container P6Mlfq_container">
          <div className="flex">
            <div className="col-7 col-12-md col-12-xsm m-bottom-96 m-bottom-0-lg p-bottom-80 p-bottom-40-lg m-bottom-0-xsm m-bottom-0-md p-bottom-0-md p-bottom-0-xsm">
              <h1 className="Text-module__text--BrHx7 m-top-32 m-top-24-xsm text-align-center-xsm m-bottom-16" data-variant="display-xl">
                <span className="P6Mlfq_headerGradientHome">Crear CV con IA</span>
                : consigue más entrevistas con Enhancv
              </h1>
              <p className="Text-module__text--BrHx7 m-bottom-40 m-top-24-xsm m-bottom-32-xsm text-align-center-xsm" data-variant="body-m">Crea un CV profesional y compatible con ATS gracias a funciones como Redactor de CV con IA, Verificación ATS y Personalización con un clic. Es la mejor manera de causar una buena impresión.</p>
              <div className="flex gap-24 gap-32-xsm">
                <a href="/es/crear-cv" className="Button-module__button--bJF6M col-12-xsm full-width-xsm" data-button-color="brand" data-size="lg" data-type="primary">
                  <span className="Button-module__label--V1tZC">Crea Tu CV</span>
                </a>
                <a href="https://enhancv.com/es/cv-checker/" className="Button-module__button--bJF6M col-12-xsm full-width-xsm" data-button-color="neutral" data-size="lg" data-type="secondary">
                  <span className="Button-module__label--V1tZC">Obtén Tu Puntuación de CV</span>
                </a>
              </div>
              <HeroCardSlot variant="inline">
                <div className="hidden-lg hidden-xl">
                  <HeroCard />
                </div>
              </HeroCardSlot>
              <div className="m-top-32 m-top-16-xsm flex gap-24 flex-justify-center-xsm">
                <a href="https://www.reviews.io/company-reviews/store/enhancv-com" target="_blank" rel="noreferrer" className="BSLg4q_widgetLink">
                  <div className="flex flex-align-center flex-justify-center-xsm text-align-center BSLg4q_reviewsWidget BSLg4q_hideExcellent">
                    <div className="flex BSLg4q_rating">
                      <span className="BSLg4q_star">
                        <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-star-fill text-white" style={{"fontSize": "18px"}} />
                      </span>
                      <span className="BSLg4q_star">
                        <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-star-fill text-white" style={{"fontSize": "18px"}} />
                      </span>
                      <span className="BSLg4q_star">
                        <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-star-fill text-white" style={{"fontSize": "18px"}} />
                      </span>
                      <span className="BSLg4q_star">
                        <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-star-fill text-white" style={{"fontSize": "18px"}} />
                      </span>
                      <div className="BSLg4q_star BSLg4q_half">
                        <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-star-fill text-white" style={{"fontSize": "18px"}} />
                      </div>
                    </div>
                    <div className="Text-module__text--BrHx7 m-no-left-xsm m-top-4-xsm full-width-xsm" data-variant="body-s" data-color="inherit">
                      <b>5369 reseñas</b>
                    </div>
                  </div>
                </a>
                <div className="flex flex-nowrap gap-8 gap-16-xsm flex-align-center">
                  <img alt="" width="50" height="50" className="hidden-xsm" style={{"color": "transparent"}} src="/sites/enhancv/media/conversationIcon.13uerg4uxalm7.webp" />
                  <p className="Text-module__text--BrHx7" data-variant="body-s">
                    <b>28.452 usuarios</b>
                    {" consiguieron entrevistas el mes pasado"}
                  </p>
                </div>
              </div>
            </div>
            <HeroCardSlot variant="column">
              <HeroCard />
            </HeroCardSlot>
          </div>
        </div>
        <TemplateCarousel />
      </section>
    </div>
  );
}
