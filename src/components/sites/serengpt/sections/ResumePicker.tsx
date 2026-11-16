"use client";
/* eslint-disable @next/next/no-img-element -- images are served as-is from public/sites/serengpt to keep their exact crop and sizing */

import { useEffect, useState } from "react";
import { cx } from "../cx";
import { jobExamples } from "../data";
import { templateById } from "../export/templates";
import { sg } from "../serengpt-links";
import { TemplateThumb } from "./TemplateThumb";

/** Same hook as the source: starts as "mobile" (server render) and follows window.innerWidth <= 768. */
function useIsMobile(max = 768) {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= max);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [max]);
  return isMobile;
}

/** Mobile variant: a pill that opens a scrollable list of professions. */
function JobDropdown({ current, onPick }: { current: number; onPick: (i: number) => void }) {
  const [open, setOpen] = useState(false);
  const job = jobExamples[current];
  return (
    <div className="col-12-xsm">
      <div
        className={cx(
          "flex flex-nowrap full-width flex-align-center flex-justify-space-between -_wPyG_link",
          open && "-_wPyG_opened",
        )}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen(!open);
        }}
      >
        <div className="flex flex-nowrap flex-align-center">
          <div className="-_wPyG_iconContainer border-rounded-4">
            <div className="-_wPyG_iconBackground">
              <i aria-hidden="true" className={`Icon-module__icon--5oSUz ${job.icon}`} style={{ fontSize: "20px" }} />
            </div>
          </div>
          <div className="Text-module__text--BrHx7 m-left-16" data-variant="body-l" data-weight="bold">
            {job.title}
          </div>
        </div>
        <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-chevron-down -_wPyG_arrowIcon" style={{ fontSize: "20px" }} />
      </div>
      {open && (
        <div className="relative m-inline-40">
          <div className="card-default animation-slide-fade-in-down p-block-24 p-inline-32 text-align-start -_wPyG_dropdownContainer">
            {jobExamples.map((j, i) => (
              <div
                key={j.slug}
                role="button"
                tabIndex={0}
                className={cx("Text-module__text--BrHx7 m-bottom-24", i === current && "font-weight-bold")}
                data-variant="body-l"
                onClick={() => {
                  onPick(i);
                  setOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onPick(i);
                    setOpen(false);
                  }
                }}
              >
                {j.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ResumePicker() {
  const [active, setActive] = useState(0);
  const isMobile = useIsMobile();
  const job = jobExamples[active];

  return (
    <div data-section="Resume picker" style={{ display: "contents" }}>
      <div>
        <section className="resume-picker-section relative rtDF2W_theme-page-alt">
          <div className="container p-block-64 p-block-32-xsm relative" style={{ zIndex: "1" }}>
            <div className="resume-picker-container flex flex-justify-center">
              <div className="col-4 col-12-xsm col-12-lg col-12-md">
                <div className="relative">
                  <h2 className="Text-module__text--BrHx7 m-top-32 m-top-24-xsm m-bottom-16" data-variant="heading-xl">
                    Con SerenGPT creas el CV adecuado para tu profesión y tu experiencia
                  </h2>
                  <a
                    href={sg.myCv}
                    className="Button-module__button--bJF6M"
                    data-button-color="awake"
                    data-size="md"
                    data-type="link"
                  >
                    <span className="Button-module__label--V1tZC">Crea tu CV en Mi CV</span>
                    <span className="Button-module__icon---bzmi" aria-hidden="true">
                      <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-arrow-right" />
                    </span>
                  </a>
                  <img
                    alt=""
                    loading="lazy"
                    width={165}
                    height={126}
                    className="VKA3na_arrowImage hidden-xs hidden-sm hidden-md hidden-lg"
                    style={{ color: "transparent" }}
                    src="/sites/serengpt/resume-picker-section_arrow.webp"
                  />
                </div>
              </div>
              <div className="col-3 p-top-32 p-left-32 p-left-0-lg col-5-lg col-5-md col-12-xsm">
                {isMobile && <JobDropdown current={active} onPick={setActive} />}
                {!isMobile &&
                  jobExamples.map((j, i) => (
                  <div
                    key={j.slug}
                    className={cx("VKA3na_linkContainer", i === active && "VKA3na_activeLinkContainer")}
                  >
                    <div
                      className={cx(
                        "flex flex-nowrap flex-align-center cursor-pointer VKA3na_link",
                        i === active && "VKA3na_activeLink",
                      )}
                      role="button"
                      tabIndex={0}
                      onClick={() => setActive(i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setActive(i);
                      }}
                    >
                      <div className="VKA3na_iconContainer border-rounded-4">
                        <div className="VKA3na_iconBackground">
                          <i aria-hidden="true" className={`Icon-module__icon--5oSUz ${j.icon}`} style={{ fontSize: "20px" }} />
                        </div>
                      </div>
                      <div
                        className="Text-module__text--BrHx7 VKA3na_exampleTitle"
                        data-variant="body-l"
                        data-weight="bold"
                      >
                        {j.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-5 col-12-xsm p-top-32 col-7-lg col-7-md col-12-xsm">
                <a href={`/es/crear-cv?plantilla=${job.template}`} aria-label={`Crear un CV de ${job.title}`}>
                  <div className="VKA3na_exampleImageContainer m-auto">
                    <TemplateThumb key={job.slug} template={templateById(job.template)} className="VKA3na_exampleImage animation-fade-in" />
                    <div className="VKA3na_exampleImageButton full-width animation-slide-fade-in-up">
                      <span
                        className="Button-module__button--bJF6M m-auto"
                        data-button-color="brand"
                        data-size="sm"
                        data-type="primary"
                      >
                        <span className="Button-module__label--V1tZC">Usar esta plantilla</span>
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
