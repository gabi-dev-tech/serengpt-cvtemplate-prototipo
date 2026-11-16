import type { ResumeData } from "./types";

/** Fictional example CV used by the export page. */
export const sampleResume: ResumeData = {
  name: "Lucía Martín Herrera",
  title: "Diseñadora de Producto Senior",
  photo: "/sites/enhancv/export/avatar-lm.png",
  contact: [
    { label: "Ubicación", value: "Madrid, España" },
    { label: "Email", value: "lucia.martin@correo.es" },
    { label: "Teléfono", value: "+34 600 123 456" },
    { label: "LinkedIn", value: "linkedin.com/in/luciamartin" },
  ],
  summary:
    "Diseñadora de producto con 8 años de experiencia creando aplicaciones web y móviles para fintech y salud digital. Combino investigación con usuarios, prototipado rápido y sistemas de diseño para lanzar funcionalidades que mejoran la conversión y la retención.",
  experience: [
    {
      role: "Diseñadora de Producto Senior",
      company: "Finaria",
      location: "Madrid",
      period: "2022 – Actualidad",
      bullets: [
        "Lideré el rediseño del onboarding y reduje el abandono un 27 % en tres meses.",
        "Creé y mantengo el sistema de diseño que usan 4 equipos y más de 30 personas.",
        "Coordino pruebas de usabilidad mensuales con clientes de 5 países.",
      ],
    },
    {
      role: "Diseñadora UX/UI",
      company: "Saludo Digital",
      location: "Barcelona",
      period: "2019 – 2022",
      bullets: [
        "Diseñé la app de citas médicas, con más de 200.000 descargas el primer año.",
        "Definí las métricas de experiencia junto a los equipos de producto y datos.",
        "Reduje un 40 % las llamadas a soporte con un nuevo flujo de cambios de cita.",
      ],
    },
    {
      role: "Diseñadora Visual",
      company: "Estudio Brío",
      location: "Valencia",
      period: "2016 – 2019",
      bullets: [
        "Desarrollé identidades visuales y sitios web para más de 40 clientes.",
        "Preparé guías de marca y plantillas reutilizables para redes sociales.",
      ],
    },
  ],
  education: [
    { degree: "Máster en Diseño de Interacción", school: "Universidad Europea", period: "2015 – 2016" },
    { degree: "Grado en Bellas Artes", school: "Universitat de València", period: "2011 – 2015" },
  ],
  skills: [
    "Investigación con usuarios",
    "Prototipado en Figma",
    "Sistemas de diseño",
    "Accesibilidad (WCAG 2.2)",
    "Diseño de interacción",
    "HTML y CSS",
  ],
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Inglés", level: "C1" },
    { name: "Francés", level: "B1" },
  ],
  certifications: [
    { name: "Google UX Design", year: "2021" },
    { name: "Professional Scrum Product Owner", year: "2020" },
  ],
};

/** Longer variant (two pages) to check pagination: `/es/exportar?muestra=larga`. */
export const sampleResumeLong: ResumeData = {
  ...sampleResume,
  experience: [
    ...sampleResume.experience,
    {
      role: "Diseñadora Gráfica Junior",
      company: "Agencia Nube",
      location: "Valencia",
      period: "2014 – 2016",
      bullets: [
        "Maqueté catálogos, carteles y piezas digitales para clientes del sector cultural.",
        "Apoyé al equipo de cuentas en propuestas visuales para concursos públicos.",
        "Organicé el archivo de recursos gráficos y tipografías de la agencia.",
      ],
    },
    {
      role: "Ilustradora Freelance",
      company: "Proyectos propios",
      location: "Remoto",
      period: "2012 – 2014",
      bullets: [
        "Ilustré dos libros infantiles para editoriales independientes.",
        "Diseñé portadas y material promocional para músicos locales.",
      ],
    },
    {
      role: "Prácticas de Diseño",
      company: "Museo de Arte Contemporáneo",
      location: "Valencia",
      period: "2013",
      bullets: [
        "Diseñé la señalética de dos exposiciones temporales.",
        "Colaboré en la web del museo y en sus campañas de redes sociales.",
      ],
    },
    {
      role: "Monitora de Talleres de Dibujo",
      company: "Escuela Municipal de Arte",
      location: "Valencia",
      period: "2011 – 2013",
      bullets: [
        "Impartí talleres semanales de dibujo y color para grupos de 12 alumnos.",
        "Preparé materiales didácticos y la exposición de fin de curso.",
        "Coordiné visitas guiadas a museos con familias del barrio.",
      ],
    },
    {
      role: "Voluntaria de Comunicación",
      company: "Asociación Barrio Vivo",
      location: "Valencia",
      period: "2010 – 2012",
      bullets: [
        "Diseñé carteles y folletos para las fiestas y campañas del barrio.",
        "Gestioné las redes sociales de la asociación y su boletín mensual.",
        "Fotografié actividades y organicé el archivo de imágenes.",
      ],
    },
  ],
};
