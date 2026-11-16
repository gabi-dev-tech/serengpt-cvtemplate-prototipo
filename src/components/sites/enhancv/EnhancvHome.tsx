import "./tailwind-isolation.css";
import "./enhancv.css";
import "./serengpt-brand.css";
import { RevealOnScroll } from "./RevealOnScroll";
import { AiAssistant } from "./sections/AiAssistant";
import { AtsSection } from "./sections/AtsSection";
import { Cards } from "./sections/Cards";
import { CareerTools } from "./sections/CareerTools";
import { Faq } from "./sections/Faq";
import { Features } from "./sections/Features";
import { Footer } from "./sections/Footer";
import { ForApplicants } from "./sections/ForApplicants";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Quotes } from "./sections/Quotes";
import { ResumePicker } from "./sections/ResumePicker";
import { Reviews } from "./sections/Reviews";
import { Stats } from "./sections/Stats";
import { Support } from "./sections/Support";

/** Local rebuild of https://enhancv.com/es/ (section order and markup follow the public page). */
export function EnhancvHome() {
  return (
    <div className="font-body">
      <div className="default-layout enhancv-homepage bg-neutral-subtle overflow-x-hidden">
        <Header />
        <div className="_3SyHWa_spacer" aria-hidden="true" />
        <main>
          <Hero />
          <Cards />
          {/*
          <Stats />
          <AtsSection />
          <Reviews />
          <AiAssistant />
          <Features />
          <ResumePicker />
          <CareerTools />
          <ForApplicants />
          <Quotes />
          <Faq />
          <Support />
          */}
        </main>
        {/*<Footer />*/}
      </div>
      <RevealOnScroll />
    </div>
  );
}
