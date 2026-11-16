import type { ReactNode } from "react";
import { sg } from "../serengpt-links";

function FaqItem({ question, open, children }: { question: string; open?: boolean; children: ReactNode }) {
  return (
    <details className="_FGp6a_faqElement p-top-24" open={open}>
      <summary className="_FGp6a_faqSummary">
        <span className="_FGp6a_icon flex flex-align-center flex-justify-center" aria-hidden="true">
          <i aria-hidden="true" className="Icon-module__icon--5oSUz icon-ui-plus _FGp6a_iconPlus" />
          <span className="_FGp6a_iconDot" />
        </span>
        <h3 className="Text-module__text--BrHx7 m-0 p-bottom-16 _FGp6a_faqTitle" data-variant="heading-s">{question}</h3>
      </summary>
      <div className="_FGp6a_faqText m-bottom-16">{children}</div>
    </details>
  );
}

export function Faq() {
  return (
    <div data-section="FAQ" style={{"display": "contents"}}>
      <section className="p-top-24 p-top-16-xsm p-bottom-64 p-bottom-16-xs rtDF2W_theme-page-alt">
        <div data-block="faq" className="container">
          <h2 className="Text-module__text--BrHx7 text-align-center-xs m-top-56 m-bottom-0 p-bottom-0 m-top-32-xs" data-variant="heading-l">Preguntas frecuentes sobre SerenGPT</h2>
          <FaqItem question="¿Qué es un currículum vitae y para qué sirve hoy?" open>
            Un currículum vitae es el documento donde resumes tu experiencia laboral, tu formación académica y tus habilidades profesionales para presentarte como candidato a un empleo.
            <br />
            <br />
            {"Más que enumerar información, el currículum sirve para mostrar qué sabes hacer y cómo puedes aportar valor en el rol al que te postulas. Es lo primero que una empresa ve de ti, por lo que debe ser fácil de leer y estar muy bien organizado. Por eso conviene que aprendas a "}
            <a href={sg.blog}>hacer un buen CV</a>
            , para que quien lo lea entienda rápidamente por qué encajas en el puesto.
          </FaqItem>
          <FaqItem question="¿Cómo hacer un currículum profesional paso a paso?">
            Hacer un CV profesional consiste en decidir qué mostrar (y qué no) y cómo hacerlo fácil de entender en pocos segundos. Un buen currículum debe guiar la lectura, priorizar lo importante y dejar claro tu valor como candidato.
            <br />
            <br />
            Lo más importante es adaptar tu CV a cada oferta. Evita enviar el mismo currículum para varias postulaciones: analiza los requisitos de cada puesto y ajusta el contenido en función de ellos. A partir de ahí, estas son las decisiones clave:
            <ul>
              <li>Selecciona la información relevante: Incluye solo experiencia y formación que le aporten valor al puesto. Evita añadir información irrelevante para la oferta.</li>
              <li>
                {"Redacta un "}
                <a href={sg.blog}>perfil profesional</a>
                : Resume en pocas líneas quién eres, qué haces y qué puedes aportar. Debe ser claro y directo.
              </li>
              <li>
                {"Destaca "}
                <a href={sg.blog}>logros concretos</a>
                : Explica resultados o mejoras que hayas conseguido en trabajos anteriores, para que el empleador vea de qué eres capaz en la práctica.
              </li>
              <li>
                {"Organiza bien la "}
                <a href={sg.blog}>estructura del CV</a>
                : Usa un orden lógico y fácil de leer. La claridad ayuda a que el empleador entienda tu perfil rápido y no sienta que pierde el tiempo.
              </li>
              <li>Incluye habilidades clave: Añade competencias relacionadas con el puesto al que te postulas. Así refuerzas la idea de que eres el candidato ideal.</li>
              <li>Revisa y corrige: Asegúrate de que no haya errores y de que el CV sea claro, coherente y fácil de leer.</li>
              <li>Descarga tu CV: En SerenGPT lo descargas en Word (.docx), así puedes seguir editándolo o guardarlo como PDF desde Word para enviarlo por correo.</li>
            </ul>
          </FaqItem>
          <FaqItem question="¿Qué secciones no pueden faltar en un buen CV?">
            Al crear un currículum, incluye solo lo necesario para encajar en el puesto. Cada sección cumple una función específica: si añades datos innecesarios, tu propuesta de valor se pierde entre tanto contenido.
            <br />
            <br />
            En general, las principales secciones al crear un CV son:
            <ul>
              <li>Información personal y de contacto: Nombre completo, teléfono activo y correo profesional. Evita datos irrelevantes como dirección completa o estado civil.</li>
              <li>Perfil profesional: Párrafo breve que resuma tu especialidad, experiencia, logros principales y fortalezas. Evita frases genéricas sin información concreta o diferenciadora.</li>
              <li>
                <a href={sg.blog}>Objetivo profesional</a>
                : Define qué tipo de puesto quieres, hacia dónde quieres orientar tu carrera y cómo encaja eso con lo que la empresa necesita.
              </li>
              <li>
                <a href={sg.blog}>Experiencia laboral</a>
                : Trabajos recientes con el nombre de la empresa, fechas, funciones que desempeñaste y resultados que conseguiste.
              </li>
              <li>
                <a href={sg.blog}>Formación académica</a>
                : Incluye título obtenido, centro de estudios y fechas. Añade solo estudios relevantes y evita formación que no aporte valor.
              </li>
              <li>
                <a href={sg.blog}>Habilidades</a>
                : Selecciona competencias relacionadas con el puesto. Evita listas extensas y prioriza habilidades demostrables y específicas.
              </li>
              <li>
                <a href={sg.blog}>Otros datos de interés en el CV</a>
                : Según el rol al que te postulas, puedes añadir también:
                <ul>
                  <li>Disponibilidad</li>
                  <li>Idiomas</li>
                  <li>
                    <a href={sg.blog}>Referencias</a>
                  </li>
                </ul>
              </li>
            </ul>
          </FaqItem>
          <FaqItem question="¿Los CV creados con SerenGPT son compatibles con ATS?">
            {"Sí. Las plantillas de SerenGPT ordenan tu información en secciones claras y reconocibles, y se descargan en Word con texto editable, un formato que los sistemas de seguimiento de candidatos (ATS) pueden leer sin perder datos."}
            <br />
            <br />
            {"En "}
            <a href={sg.myCv}>Mi CV</a>
            {" también puedes generar un CV Express de una página en formato ATS, sin inventar información. Y antes de enviarlo, el "}
            <a href={sg.cvAnalysis}>análisis de CV</a>
            {" de la Zona del Reclutador te da una puntuación general, tus fortalezas y las posibles mejoras."}
          </FaqItem>
          <FaqItem question="¿Cada cuánto tiempo debería actualizar mi currículum?">
            {"Lo ideal es "}
            <a href={sg.blog}>actualizar el CV</a>
            {" cada vez que haya un cambio relevante en tu perfil, como un nuevo trabajo, un proyecto importante, una certificación o una habilidad que aporte valor."}
            <br />
            <br />
            No esperes a estar buscando empleo para actualizar tu currículum, ya que en ese momento podrías olvidar datos importantes que te convendría incluir.
            <br />
            <br />
            Como referencia general, te recomendamos revisar tu CV cada tres o seis meses.
            <br />
            <br />
            {"Con SerenGPT puedes mantener tu perfil al día en "}
            <a href={sg.myCv}>Mi CV</a>
            {" y anticipar los cambios de tu sector, aunque no estés buscando empleo."}
          </FaqItem>
          <FaqItem question="¿Qué buscan hoy los reclutadores en un currículum en 2026?">
            Los reclutadores ya no buscan currículums bonitos ni que sean “completos”, con exceso de información sobre el candidato. En 2026, todo reclutador prefiere recibir un CV que sea muy fácil de entender y que demuestre rápidamente el valor del postulante.
            <br />
            <br />
            Por eso, al crear tu CV, asegúrate de que cumple con estas características:
            <ul>
              <li>En pocos segundos, es capaz de transmitir qué haces y cómo aportas valor.</li>
              <li>Prioriza habilidades útiles por encima de títulos académicos.</li>
              <li>Incluye logros concretos con resultados medibles.</li>
              <li>Contiene palabras clave alineadas con el puesto y sus requisitos.</li>
              <li>Tiene una estructura limpia que facilita una lectura rápida y ordenada.</li>
              <li>Combina habilidades técnicas con competencias blandas relevantes.</li>
              <li>Está adaptado a cada oferta en particular, en vez de ser genérico.</li>
            </ul>
          </FaqItem>
          <FaqItem question="¿Cómo crear un CV con SerenGPT?">
            {"Para "}
            <a href="/es/crear-cv">crear un CV con SerenGPT</a>
            , sigue estos pasos:
            <ul>
              <li>Elige una plantilla. Puedes cambiarla en cualquier momento desde el panel Plantillas.</li>
              <li>Completa tus datos: contacto, resumen, experiencia, educación, habilidades, idiomas y certificaciones.</li>
              <li>Ajusta el color y la fuente desde el panel Diseño y Fuente.</li>
              <li>Revisa tu CV en tamaño A4 y descárgalo en Word (.docx) con el mismo diseño.</li>
            </ul>
            Recuerda: solo debes incluir en tu CV cosas que sean relevantes para el puesto que solicitas.
          </FaqItem>
          <FaqItem question="¿Por qué tengo que crear un CV diferente para cada solicitud de empleo?">
            Los responsables de contratación reciben cientos de CV al día. Para filtrar los irrelevantes, muchos utilizan sistemas de seguimiento de candidatos (ATS) que escanean los CV en busca de palabras clave de la descripción del puesto. Incluso sin un ATS, un profesional de Recursos Humanos capacitado distingue fácilmente entre un CV genérico y uno a medida.
            <br />
            <br />
            Por eso, cuando adaptas tu CV, destaca las habilidades y experiencias que responden directamente a los requisitos de la empresa. Cada empresa es diferente, y para conseguir una entrevista necesitas un CV distinto para cada solicitud.
            <br />
            <br />
            {"En "}
            <a href={sg.myCv}>Mi CV</a>
            {" puedes crear varios perfiles y adaptar uno a otra profesión, y acompañar cada candidatura con una "}
            <a href={sg.coverLetter}>carta de presentación</a>
            {" a medida."}
          </FaqItem>
          <FaqItem question="¿Debo utilizar una plantilla de CV en 2026?">
            Las plantillas de CV te dan un punto de partida. Es buena idea empezar con una, siempre que la personalices para cada oferta de empleo.
            <br />
            <br />
            {"En SerenGPT puedes empezar con una plantilla "}
            <a href="/es/crear-cv?plantilla=creativo">creativa</a>
            {", "}
            <a href="/es/crear-cv?plantilla=clasico">clásica</a>
            {", "}
            <a href="/es/crear-cv?plantilla=minimalista">minimalista</a>
            {" o "}
            <a href="/es/crear-cv?plantilla=moderno">moderna</a>
            , entre otras, y personalizar su color y su fuente.
          </FaqItem>
          <FaqItem question="¿Mi CV debe estar en formato PDF o Word?">
            Con SerenGPT descargas tu CV en Word (.docx), con el mismo diseño que ves en la vista previa y el texto editable. Si una oferta pide PDF, puedes abrir el archivo en Word y guardarlo como PDF.
          </FaqItem>
          <FaqItem question="¿El acceso a SerenGPT es gratuito?">
            SerenGPT es accesible de forma gratuita. Es una herramienta puesta a disposición por la empresa que trabaja con las OCE. Es gracias a esta misión de interés general que nuestra herramienta es gratuita para el público en general.
          </FaqItem>
          <FaqItem question="¿Qué vínculo tiene SerenGPT con las OCE?">
            SerenGPT se despliega en colaboración con las oficinas cantonales de empleo (OCE) de Suiza romanda.
          </FaqItem>
          <FaqItem question="¿Cómo se protegen mis datos?">
            {"Tus datos están alojados en Suiza y tratados de conformidad con la LPD (Ley federal de protección de datos). Nunca se comparten con empleadores ni terceros sin tu consentimiento explícito. Para cualquier consulta, revisa nuestra "}
            <a href={sg.privacy}>política de privacidad</a>
            .
          </FaqItem>
        </div>
      </section>
    </div>
  );
}
