"use client";
/* eslint-disable @next/next/no-img-element -- source images are served as-is from public/sites/enhancv to keep their exact crop and sizing */

import { useEffect, useState } from "react";
import { cx } from "../cx";
import { quotes } from "../data";

/** Testimonials card; the source rotates it every ~4 s and the dots jump to a quote. */
export function Quotes() {
  const [active, setActive] = useState(0);
  const q = quotes[active];

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % quotes.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div data-section="Review sections" style={{"display": "contents"}}>
      <section className="bg-brand-solid p-block-64 p-block-32-xsm relative">
        <div className="container m-top-96 p-top-48 m-top-0-xsm m-top-0-md p-top-0-xsm p-top-0-md relative">
          <div className="_0efZZW_backgroundImage hidden-xsm hidden-md">
            <img alt="" loading="lazy" width="600" height="638" style={{"color": "transparent", "maxWidth": "100%", "height": "auto"}} src="/sites/enhancv/media/background.03q1_80i7q-mk.svg" />
          </div>
          <div className="flex p-64 p-inline-24-xsm p-bottom-96-xsm relative _0efZZW_container _0efZZW_homepageContainer">
            <div className="_0efZZW_ellipse hidden-lg hidden-xl" />
            <div className="col-5 col-12-xsm col-12-md p-right-16 p-0-xsm relative">
              <div className="_0efZZW_cardStack">
                <div key={active} className={cx("relative p-inline-32 p-top-64 e2WTCG_quoteBox e2WTCG_inFlow", q.bg)}>
                  <div className="e2WTCG_avatar animation-fade-in">
                    <img alt="Imagen de perfil" loading="lazy" width="208" height="208" src={q.avatar} style={{ color: "transparent", maxWidth: "100%", height: "auto" }} />
                  </div>
                  <div className="animation-fade-in e2WTCG_content">
                    <img alt="quote left image" loading="lazy" width="14" height="9" src="/sites/enhancv/media/quotesIcon.2e5-seym3s76j.svg" style={{ color: "transparent" }} />
                    <h6 className="Text-module__text--BrHx7" data-variant="heading-s">{q.text}</h6>
                    <div className="flex flex-justify-end m-right-0 m-bottom-16">
                      <img alt="quote right image" loading="lazy" width="14" height="9" src="/sites/enhancv/media/quotesIcon.2e5-seym3s76j.svg" style={{ color: "transparent" }} />
                    </div>
                    <div>{q.name}</div>
                    <div className="font-weight-bold">{q.role}</div>
                    <hr />
                    <div className="display-block relative" style={{ height: "45px" }}>
                      <img alt="Logotipo de la empresa" loading="lazy" src={q.logo} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", objectFit: "contain", objectPosition: "center center", color: "transparent", maxWidth: "100%" }} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-align-center flex-justify-center _0efZZW_dotContainer _0efZZW_dotsUnderCard">
                  {quotes.map((item, i) => (
                    <div
                      key={item.name}
                      role="button"
                      aria-label={`Testimonio ${i + 1}`}
                      className={cx("m-8 cursor-pointer _0efZZW_dot", i === active ? "bg-neutral-solid" : "bg-subtle-inverse")}
                      onClick={() => setActive(i)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="col-7 col-12-xsm col-12-md order-first-xsm order-first-md text-align-center-xsm p-bottom-32 p-left-16-lg p-left-16-md">
              <h2 className="h2 h3-xsm m-top-0 m-bottom-32 m-bottom-16 text-color-inverse">Tu CV es una extensión de ti mismo. Haz uno que realmente sea tú.</h2>
              <div className="flex">
                <a href="https://app.enhancv.com/" className="Button-module__button--bJF6M m-bottom-32 m-inline-auto-xsm" data-button-color="brand" data-size="lg" data-type="primary">
                  <span className="Button-module__label--V1tZC">Crea Tu CV</span>
                </a>
              </div>
              <a href="https://www.reviews.io/company-reviews/store/enhancv-com" target="_blank" rel="noopener noreferrer">
                <div className="BSLg4q_widgetLink">
                  <div className="flex flex-align-center flex-justify-center-xsm text-align-center BSLg4q_reviewsWidget text-white">
                    <div className="Text-module__text--BrHx7 full-width-xsm m-bottom-4-xsm" data-variant="body-m" data-color="inherit" data-weight="bold">Excelente</div>
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
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
