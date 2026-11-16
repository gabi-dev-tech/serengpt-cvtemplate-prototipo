/* eslint-disable @next/next/no-img-element -- images are served as-is from public/sites/serengpt to keep their exact crop and sizing */
import { sg } from "../serengpt-links";

/** Brand band with the SerenGPT people image and the main call to action. */
export function Quotes() {
  return (
    <div data-section="Call to action" style={{"display": "contents"}}>
      <section className="bg-brand-solid p-block-64 p-block-32-xsm relative">
        <div className="container m-top-96 p-top-48 m-top-0-xsm m-top-0-md p-top-0-xsm p-top-0-md relative">
          <div className="_0efZZW_backgroundImage hidden-xsm hidden-md">
            <img alt="" loading="lazy" width="600" height="638" style={{"color": "transparent", "maxWidth": "100%", "height": "auto"}} src="/sites/serengpt/media/background.03q1_80i7q-mk.svg" />
          </div>
          <div className="flex flex-align-center p-64 p-inline-24-xsm p-bottom-96-xsm relative _0efZZW_container _0efZZW_homepageContainer">
            <div className="col-5 col-12-xsm col-12-md p-right-16 p-0-xsm relative">
              <img alt="Personas que usan SerenGPT" loading="lazy" width="560" height="420" style={{"color": "transparent", "width": "100%", "height": "auto", "objectFit": "contain"}} src="/sites/serengpt/product/people-serengpt.webp" />
            </div>
            <div className="col-7 col-12-xsm col-12-md order-first-xsm order-first-md text-align-center-xsm p-bottom-32 p-left-16-lg p-left-16-md">
              <h2 className="h2 h3-xsm m-top-0 m-bottom-32 m-bottom-16 text-color-inverse">Tu CV es una extensión de ti mismo. Haz uno que realmente sea tú.</h2>
              <div className="flex">
                <a href={sg.myCv} className="Button-module__button--bJF6M m-bottom-32 m-inline-auto-xsm" data-button-color="brand" data-size="lg" data-type="primary">
                  <span className="Button-module__label--V1tZC">Crea Tu CV</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
