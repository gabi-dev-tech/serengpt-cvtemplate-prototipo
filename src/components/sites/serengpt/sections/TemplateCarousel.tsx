"use client";

import { useCallback, useEffect, useRef, useState, type TransitionEvent } from "react";
import { cx } from "../cx";
import { templates } from "../export/templates";
import { TemplateThumb } from "./TemplateThumb";

const TRANSITION_MS = 600;
const TRANSITION = `transform ${TRANSITION_MS}ms ease-in-out`;
const AUTO_SCROLL_MS = 4000;

/** Same breakpoints as the source carousel: 1 card < 768px, 3 cards < 1024px, otherwise 5. */
function itemsPerLine(width: number) {
  if (width === 0) return 5;
  if (width < 768) return 1;
  if (width < 1024) return 3;
  return 5;
}

function useWindowWidth() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return width;
}

export function TemplateCarousel() {
  const width = useWindowWidth();
  const perLine = itemsPerLine(width);
  const slideWidth = 100 / perLine;

  // order[0] is the first rendered slide; the source marks that one as the active dot.
  const [order, setOrder] = useState(() => templates.map((_, i) => i));
  const [offset, setOffset] = useState(0); // in slides, 0 or -1
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchEnd = useRef<{ x: number; y: number } | null>(null);

  const next = useCallback(
    (fromTimer = false) => {
      if (animating) return;
      if (!fromTimer) setAutoScroll(false);
      setDirection("next");
      setAnimating(true);
      setOffset(-1);
    },
    [animating],
  );

  const prev = useCallback(() => {
    if (animating) return;
    setAutoScroll(false);
    setDirection("prev");
    setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
    setOffset(-1);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setAnimating(true);
        setOffset(0);
      }),
    );
  }, [animating]);

  const finish = () => {
    if (!animating) return;
    if (direction === "next") {
      setOrder((o) => [...o.slice(1), o[0]]);
      setOffset(0);
    }
    setAnimating(false);
    setDirection(null);
  };

  // transitionend bubbles: the cards' own transitions (hover background) must not end the slide.
  const onTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
    finish();
  };

  // Safety net: if the browser never delivers transitionend (Safari can drop it when the transition is
  // throttled or cancelled, e.g. offscreen or in a background tab), `animating` would stay true and every
  // later step, the autoplay included, would be ignored.
  const finishRef = useRef(finish);
  useEffect(() => {
    finishRef.current = finish;
  });
  useEffect(() => {
    if (!animating) return;
    const id = setTimeout(() => finishRef.current(), TRANSITION_MS + 150);
    return () => clearTimeout(id);
  }, [animating]);

  const nextRef = useRef(next);
  useEffect(() => {
    nextRef.current = next;
  });

  useEffect(() => {
    if (!autoScroll) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => nextRef.current(true), AUTO_SCROLL_MS);
    return () => clearInterval(id);
  }, [autoScroll]);

  const onTouchEnd = () => {
    if (touchStart.current === null || touchEnd.current === null) return;
    const delta = touchStart.current.x - touchEnd.current.x;
    // Only a horizontal swipe counts: scrolling the page with a finger over the carousel (iOS) drifts
    // sideways too, and treating that as a swipe used to switch the autoplay off for good.
    if (Math.abs(delta) <= Math.abs(touchStart.current.y - touchEnd.current.y)) return;
    if (delta > 30) next();
    else if (delta < -30) prev();
  };

  const activeKey = order[0];

  return (
    <div data-section="Template carousel" style={{ display: "contents" }}>
      <div>
        <div className="_7rSP3G_carouselContainer">
          <div className="container flex flex-justify-center">
            <h2
              className="Text-module__text--BrHx7 col-12 m-top-96 m-top-40-lg m-top-80-xsm m-top-32-md m-bottom-48 m-bottom-40-xsm text-align-center"
              data-variant="heading-xl"
            >
              ¡Elige una plantilla y crea tu CV en minutos!
            </h2>
          </div>
          <div className="animation-slide-fade-in-up">
            <div className="relative">
              <div className="_7rSP3G_carouselSlider">
                <div
                  onTransitionEnd={onTransitionEnd}
                  onTouchStart={(e) => {
                    touchEnd.current = null;
                    touchStart.current = { x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY };
                  }}
                  onTouchMove={(e) => {
                    touchEnd.current = { x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY };
                  }}
                  onTouchEnd={onTouchEnd}
                  style={{
                    transform: `translateX(${offset * slideWidth}%)`,
                    ...(animating ? { transition: TRANSITION } : {}),
                  }}
                >
                  {order.map((i) => {
                    const t = templates[i];
                    return (
                      <div key={t.id} className="_7rSP3G_slide" style={{ width: `${slideWidth}%` }}>
                        <a
                          href={`/es/crear-cv?plantilla=${t.id}`}
                          className="B4068q_sliderCard"
                          aria-label={`Crear CV con la plantilla ${t.name}`}
                        >
                          <TemplateThumb template={t} />
                          <div className="B4068q_sliderCardButton full-width animation-slide-fade-in-up">
                            <span
                              className="Button-module__button--bJF6M m-auto B4068q_slideButton"
                              data-button-color="brand"
                              data-size="md"
                              data-type="primary"
                            >
                              <span className="Button-module__label--V1tZC">Empieza con esta plantilla</span>
                            </span>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="_7rSP3G_prevArrow" role="button" aria-label="Plantilla anterior" onClick={prev}>
                <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-chevron-left" style={{ fontSize: "20px" }} />
              </div>
              <div className="_7rSP3G_nextArrow" role="button" aria-label="Plantilla siguiente" onClick={() => next()}>
                <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-chevron-right" style={{ fontSize: "20px" }} />
              </div>
              <div className="_7rSP3G_dots flex flex-justify-center flex-align-end p-8 m-top-16">
                {templates.map((t, n) => (
                  <div
                    key={t.id}
                    className={cx(
                      "_7rSP3G_dot",
                      activeKey === n && "_7rSP3G_active",
                      (activeKey === n + 1 || activeKey === n - 1) && "_7rSP3G_surround",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
