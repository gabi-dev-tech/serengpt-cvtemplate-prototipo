/* eslint-disable @next/next/no-img-element -- source images are served as-is from public/sites/enhancv to keep their exact crop and sizing */
import { HeroCard } from "./HeroCard";
import { HeroCardSlot } from "./HeroCardSlot";
import { TemplateCarousel } from "./TemplateCarousel";
import { sg } from "../serengpt-links";

const benefits = [
  "Formato compatible con ATS",
  "Descarga en Word (.docx)",
  "Pensado para el mercado laboral suizo",
];

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
                : destaca en el mercado laboral suizo con SerenGPT
              </h1>
              <p className="Text-module__text--BrHx7 m-bottom-40 m-top-24-xsm m-bottom-32-xsm text-align-center-xsm" data-variant="body-m">Crea un CV profesional y compatible con ATS a partir de tu perfil. SerenGPT analiza tus competencias y tu experiencia, te muestra cómo te leen los reclutadores y te ayuda a encontrar las ofertas en Suiza que mejor te corresponden.</p>
              <div className="flex gap-24 gap-32-xsm">
                <a href="/es/crear-cv" className="Button-module__button--bJF6M col-12-xsm full-width-xsm" data-button-color="brand" data-size="lg" data-type="primary">
                  <span className="Button-module__label--V1tZC">Crea Tu CV</span>
                </a>
                <a href={sg.cvAnalysis} className="Button-module__button--bJF6M col-12-xsm full-width-xsm" data-button-color="neutral" data-size="lg" data-type="secondary">
                  <span className="Button-module__label--V1tZC">Analiza Tu CV</span>
                </a>
              </div>
              <HeroCardSlot variant="inline">
                <div className="hidden-lg hidden-xl">
                  <HeroCard />
                </div>
              </HeroCardSlot>
              <div className="m-top-32 m-top-16-xsm flex gap-24 flex-justify-center-xsm">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex flex-nowrap flex-align-center">
                    <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check-circle text-color-brand m-right-8" />
                    <span className="Text-module__text--BrHx7" data-variant="body-s">{benefit}</span>
                  </div>
                ))}
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
