/** Static content shared by the SerenGPT home sections. */

/** Resume picker: each profession previews one of the crear-cv templates. */
export const jobExamples = [
  { title: "Atención al Cliente", icon: "icon-ui-support-agent", slug: "atencion-al-cliente", template: "clasico" },
  { title: "Diseñador Gráfico", icon: "icon-ui-design", slug: "disenador-grafico", template: "creativo" },
  { title: "Enfermera", icon: "icon-ui-healthcare", slug: "enfermera", template: "minimalista" },
  { title: "Informático", icon: "icon-ui-monitor", slug: "informatica", template: "moderno" },
  { title: "Ingeniero", icon: "icon-ui-design", slug: "ingeniero", template: "dos-columnas" },
  { title: "Marketing", icon: "icon-ui-megaphone", slug: "marketing", template: "barra-derecha" },
  { title: "Médico", icon: "icon-ui-healthcare", slug: "medico", template: "academico" },
  { title: "Programador", icon: "icon-ui-code", slug: "programador", template: "linea-de-tiempo" },
];

/** Footer language switcher: the SerenGPT locales (only /es lives in this repo, the rest open serengpt.ai). */
export const languages = [
  { label: "Español (ES)", href: "/es" },
  { label: "Alemán (DE)", href: "https://serengpt.ai/de" },
  { label: "Francés (FR)", href: "https://serengpt.ai/fr" },
  { label: "Inglés (EN)", href: "https://serengpt.ai/en" },
  { label: "Italiano (IT)", href: "https://serengpt.ai/it" },
];
