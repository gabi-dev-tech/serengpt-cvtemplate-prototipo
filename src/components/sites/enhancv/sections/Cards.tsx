import { sg } from "../serengpt-links";
export function Cards() {
  return (
    <div data-section="Cards" style={{"display": "contents"}}>
      <section className="container p-bottom-64 p-bottom-40-xs">
        <div className="Text-module__text--BrHx7 flex flex-justify-center flex-justify-start-xsm text-align-start-xsm" data-variant="body-xl" data-color="secondary" data-align="center">
          <div className="col-4 col-12-xsm p-16 p-inline-16-xs">
            <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-check-circle text-color-brand m-top-16 m-bottom-8" style={{"fontSize": "26px"}} />
            <div>
              {"CV compatibles con ATS "}
              <br className="hidden-xsm" />
              {" con diseño profesional"}
            </div>
          </div>
          <div className="col-4 col-12-xsm p-16 p-inline-16-xs">
            <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-design text-color-brand m-top-16 m-bottom-8" style={{"fontSize": "26px"}} />
            <div>
              Secciones, fuentes, colores
              <br className="hidden-xsm" />
              {" y fondos personalizables"}
            </div>
          </div>
          <div className="col-4 col-12-xsm p-16 p-inline-16-xs">
            <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-columns text-color-brand m-top-16 m-bottom-8" style={{"fontSize": "26px"}} />
            <div>
              {"Diseños de una o dos columnas "}
              <br className="hidden-xsm" />
              {" y de varias páginas"}
            </div>
          </div>
          <a href={sg.myCv} className="Button-module__button--bJF6M m-left-16-xsm m-top-24-xsm" data-button-color="awake" data-size="md" data-type="link">
            <span className="Button-module__label--V1tZC">Explora plantillas de CV</span>
            <span className="Button-module__icon---bzmi" aria-hidden="true">
              <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-arrow-right" />
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}
