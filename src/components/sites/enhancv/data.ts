/** Content captured from https://enhancv.com/es/ (Nov 12, 2026). Images live in public/sites/enhancv/. */

const A = "/sites/enhancv";

/** "Con Enhancv creas el currículum adecuado…" picker. */
export const jobExamples = [
  { title: "Atención al Cliente", icon: "icon-ui-support-agent", slug: "atencion-al-cliente", image: `${A}/templates/dfT8ygIERC.png` },
  { title: "Diseñador Gráfico", icon: "icon-ui-design", slug: "disenador-grafico", image: `${A}/jobs/disenador.png` },
  { title: "Enfermera", icon: "icon-ui-healthcare", slug: "enfermera", image: `${A}/jobs/enfermera.png` },
  { title: "Informático", icon: "icon-ui-monitor", slug: "informatica", image: `${A}/jobs/informatica.png` },
  { title: "Ingeniero", icon: "icon-ui-design", slug: "ingeniero", image: `${A}/jobs/ingeniero.png` },
  { title: "Marketing", icon: "icon-ui-megaphone", slug: "marketing-curriculum", image: `${A}/jobs/marketing.png` },
  { title: "Médico", icon: "icon-ui-healthcare", slug: "medico", image: `${A}/jobs/medico.png` },
  { title: "Programador", icon: "icon-ui-code", slug: "programador", image: `${A}/jobs/programador.png` },
];

/** Testimonial card (rotates every ~4 s on the source). */
export const quotes = [
  {
    text: "Enhancv Executive ha cambiado mi vida: Una semana y cuatro entrevistas después, estaré ganando un 150% más haciendo el trabajo que elegí.",
    name: "JENICA",
    role: "INGENIERO DE SOLUCIONES",
    avatar: `${A}/quotes/quoteOne.webp`,
    logo: `${A}/quotes/quoteOneCompany.webp`,
    bg: "bg-danger-cc",
  },
  {
    text: "Ya he recomendado Enhancv a todos mis amigos. Sigo utilizando su servicio para actualizar mi currículum, incluso después de encontrar trabajo. Aconsejaría a cualquiera que necesite tal servicio elegir Enhancv.",
    name: "AMIN",
    role: "DIRECTOR DE PRODUCTO",
    avatar: `${A}/quotes/quoteTwo.webp`,
    logo: `${A}/quotes/quoteTwoCompany.webp`,
    bg: "bg-primary-cc",
  },
  {
    text: "Confía en el proceso de permitir que alguien más que ofrece esta experiencia te ayude. Ellos saben lo que están haciendo.",
    name: "BRAD",
    role: "CONSULTOR DE SERVICIOS GESTIONADOS",
    avatar: `${A}/quotes/quoteThree.webp`,
    logo: `${A}/quotes/quoteThreeCompany.webp`,
    bg: "bg-info-cc",
  },
];

/** Footer language switcher: the SerenGPT locales (only /es lives in this repo, the rest open serengpt.ai). */
export const languages = [
  { label: "Español (ES)", href: "/es" },
  { label: "Alemán (DE)", href: "https://serengpt.ai/de" },
  { label: "Francés (FR)", href: "https://serengpt.ai/fr" },
  { label: "Inglés (EN)", href: "https://serengpt.ai/en" },
  { label: "Italiano (IT)", href: "https://serengpt.ai/it" },
];
