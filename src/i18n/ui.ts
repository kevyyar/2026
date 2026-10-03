import type { Locale } from "./config";

/**
 * UI copy. Conventions:
 *   *word*       → italic serif accent (see accentHtml)
 *   {name}       → interpolated value
 *   a|b|c        → list or explicit line breaks, split by the component
 * Spanish is neutral Latin-American Spanish addressing the reader as "tú".
 */
const es = {
  "meta.home.title": "Kevin Barreto — Páginas web y apps para negocios locales",
  "meta.home.description":
    "Kevin Barreto hace páginas web, tiendas en línea y apps para negocios locales en México. Tú le cuentas qué necesita tu negocio y él lo resuelve con algo fácil de usar. Trato directo, de la primera plática al lanzamiento.",
  "meta.case.title": "{client} — {title} | Caso de estudio de Kevin Barreto",
  "meta.service.name": "Kevin Barreto — Desarrollo de software y consultoría",
  "meta.areaServed": "Todo el mundo",

  "a11y.skip": "Saltar al contenido",
  "a11y.home": "Kevin Barreto — inicio",
  "a11y.newTab": "se abre en una pestaña nueva",

  "nav.status.short": "Disponible",
  "nav.status.rest": " para nuevos proyectos",
  "nav.menu": "Menú",
  "nav.close": "Cerrar",
  "nav.primary": "Principal",
  "nav.siteMenu": "Menú del sitio",
  "nav.footer": "Pie de página",
  "nav.work": "Caso real",
  "nav.services": "Servicios",
  "nav.process": "Proceso",
  "nav.about": "Sobre mí",
  "nav.contact": "Contacto",
  "nav.localTime": "Hora local",
  "nav.channels": "Canales de contacto",
  "nav.email": "Correo",

  "lang.label": "Cambiar idioma",
  "cursor.view": "Ver",

  "cta.start": "Platiquemos",

  "preloader.tagline": "Kevin Barreto|Páginas web y apps para negocios locales",

  "hero.kicker": "Páginas web y apps para negocios locales",
  "hero.origin": "México",
  "hero.est": "(Desde 2019)",
  "hero.title": "Pongo tu negocio|en el celular|*de tus clientes.*",
  "hero.lead":
    "Soy Kevin. Hago páginas web y apps para negocios locales. Tú me cuentas qué te quita tiempo o por qué se te van clientes, y yo lo resuelvo con algo fácil de usar.",
  "hero.seeWork": "Ver un caso real",
  "hero.badgeLabel": "Ir al caso destacado",
  "hero.badgeText": "DISPONIBLE • PARA • PROYECTOS • 2026 • ",

  "marquee.services": "Páginas web|Tiendas en línea|Apps a tu medida|Citas y pedidos|Aparecer en Google|Mantenimiento",
  "marquee.process": "Platicamos|Diseño|Construcción|Lanzamiento|Apoyo después|Un solo responsable",

  "manifesto.label": "Manifiesto",
  "manifesto.srTitle": "Sobre Kevin Barreto",
  "manifesto.text":
    "A casi ningún negocio local le va mal por lo que vende. Le va mal cuando nadie lo encuentra, cuando los pedidos se pierden entre mensajes y cuando la agenda vive en una libreta. *Eso tiene arreglo.*",
  "about.kicker": "(Sobre mí)",
  "about.p1":
    "Soy Kevin Barreto y trabajo desde México. Empecé en 2019 haciendo páginas para negocios locales, y de ahí no me he bajado. Después pasé varios años en equipos grandes de software, así que lo que te entrego está bien hecho: no se cae ni se queda viejo al mes.",
  "about.p2":
    "Hablas directo conmigo de principio a fin, en español o en inglés. Nadie te va a pasar de una persona a otra ni a contestarte con palabras raras. Tú conoces tu negocio, y yo me encargo de que funcione igual de bien en internet.",

  "work.label": "Caso real",
  "work.title": "Un caso *real*",
  "work.intro":
    "Un negocio que hacía muy buen trabajo y casi nadie encontraba en internet. Esto fue lo que hicimos y lo que pasó después.",
  "work.featured": "Caso destacado",
  "work.results": "Resultados",
  "work.stack": "Tecnologías",
  "work.readCase": "Ver el caso completo",

  "services.label": "Servicios",
  "services.title": "Lo que *hago*",
  "services.intro":
    "Seis formas de echarte la mano. Pide una sola o déjame todo el paquete.",
  "services.includes": "{title} incluye",

  "process.label": "Proceso",
  "process.title": "Cómo vamos a *trabajar*",
  "process.intro":
    "Cuatro pasos de la idea al lanzamiento. Siempre vas a saber en cuál vamos, qué sigue y qué recibes en cada uno.",
  "process.step": "Paso {n} de {total}",
  "process.youGet": "Recibes",
  "process.ctaKicker": "(Siguiente paso)",
  "process.ctaText": "Listo *cuando tú digas*",

  "experience.label": "Experiencia",
  "experience.title": "Mi *trayectoria*",
  "experience.count": "2019 → hoy",
  "experience.intro":
    "Años en equipos grandes de software y años llevando proyectos completos por mi cuenta. Hoy trabajo directo con negocios como el tuyo.",
  "experience.technologies": "Tecnologías",

  "principles.label": "Principios",
  "principles.title": "Cómo *trabajo*",

  "contact.label": "Contacto",
  "contact.title": "¿Tienes un negocio? *Platiquemos.*",
  "contact.lead": "Escríbeme como le escribirías a un conocido. Yo mismo leo cada mensaje.",
  "contact.writeDirectly": "Escríbeme directo",
  "contact.copy": "Copiar",
  "contact.copied": "Copiado",
  "contact.copyFailed": "No se pudo copiar: usa el enlace de correo",
  "contact.replyTime": "Te contesto en",
  "contact.replyValue": "Menos de 24 horas",
  "contact.languages": "Idiomas",
  "contact.languagesValue": "Español / English",
  "contact.elsewhere": "También en",

  "form.name": "¿Cómo te llamas?",
  "form.email": "¿A qué correo te contesto?",
  "form.company": "¿Cómo se llama tu negocio?",
  "form.projectType": "¿Qué andas buscando?",
  "form.budget": "¿Cuánto piensas invertir? (USD)",
  "form.optional": "(opcional)",
  "form.notSure": "Todavía no sé",
  "form.type.webApp": "App para mi negocio",
  "form.type.ecommerce": "Tienda en línea",
  "form.type.website": "Página web",
  "form.type.redesign": "Mejorar la que ya tengo",
  "form.type.maintenance": "Que alguien la cuide",
  "form.budget.5k": "$5K – $10K",
  "form.budget.10k": "$10K – $25K",
  "form.budget.25k": "$25K – $50K",
  "form.budget.50k": "$50K+",
  "form.message": "Cuéntame qué te gustaría resolver",
  "form.required": "Obligatorio",
  "form.tooShort": "Muy corto",
  "form.invalidEmail": "Correo no válido",
  "form.messageTooShort": "Muy corto: mínimo {min} caracteres",
  "form.clear": "Empezar de nuevo",
  "form.send": "Enviar mensaje",
  "form.sending": "Enviando…",
  "form.sent": "Enviado",
  "form.status.success": "¡Gracias! Recibí tu mensaje y te responderé en menos de 24 horas.",
  "form.status.validation": "Algunos campos necesitan tu atención. Revísalos e inténtalo de nuevo.",
  "form.status.server": "Algo salió mal de nuestro lado. Inténtalo más tarde o escríbeme directo por correo.",
  "form.status.network": "No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.",

  "footer.pitch": "¿Tu negocio todavía no está en internet?",
  "footer.backToTop": "Volver arriba ↑",

  "case.back": "← Volver al portafolio",
  "case.label": "Caso de estudio",
  "case.visit": "Ver sitio en vivo",
  "case.story": "Historia del proyecto",
  "case.challenge": "El reto",
  "case.solution": "La solución",
  "case.deepDive": "A fondo",
  "case.outcome": "Resultado",
  "case.results": "Los *resultados*",
  "case.techStack": "Tecnologías",
  "case.cta.kicker": "(Lo que sigue)",
  "case.cta.lead": "Tu proyecto puede ser",
  "case.cta.accent": "el siguiente",
} satisfies Record<string, string>;

export type UiKey = keyof typeof es;
export type Dictionary = Record<UiKey, string>;

const en: Dictionary = {
  "meta.home.title": "Kevin Barreto — Independent Software Developer & Consultant",
  "meta.home.description":
    "Kevin Barreto is an independent software developer and consultant in México. A software studio of one: planning, design, engineering and launch of web products for businesses worldwide.",
  "meta.case.title": "{client} — {title} | Case study by Kevin Barreto",
  "meta.service.name": "Kevin Barreto — Software development & consulting",
  "meta.areaServed": "Worldwide",

  "a11y.skip": "Skip to content",
  "a11y.home": "Kevin Barreto — home",
  "a11y.newTab": "opens in a new tab",

  "nav.status.short": "Available",
  "nav.status.rest": " for new projects",
  "nav.menu": "Menu",
  "nav.close": "Close",
  "nav.primary": "Primary",
  "nav.siteMenu": "Site menu",
  "nav.footer": "Footer",
  "nav.work": "Work",
  "nav.services": "Services",
  "nav.process": "Process",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.localTime": "Local time",
  "nav.channels": "Contact channels",
  "nav.email": "Email",

  "lang.label": "Change language",
  "cursor.view": "View",

  "cta.start": "Start a project",

  "preloader.tagline": "Kevin Barreto|Software studio of one",

  "hero.kicker": "Independent developer & consultant",
  "hero.origin": "México → worldwide",
  "hero.est": "(Est. 2019)",
  "hero.title": "Kevin Barreto —|a software|studio *of one.*",
  "hero.lead":
    "I plan, design, build and ship web products for businesses that need them done right. One accountable partner — from the first call to the last deploy.",
  "hero.seeWork": "See the work",
  "hero.badgeLabel": "Scroll to the featured case",
  "hero.badgeText": "AVAILABLE • FOR • PROJECTS • 2026 • ",

  "marquee.services": "Web apps|E-commerce|Product launches|Performance|Automation|Consulting",
  "marquee.process": "Discovery|Design|Engineering|Launch|Support|One partner",

  "manifesto.label": "Manifesto",
  "manifesto.srTitle": "About Kevin Barreto",
  "manifesto.text":
    "Most software projects don’t fail because of code. They fail in the gaps — between what the business needs and what actually gets built. *I close that gap.*",
  "about.kicker": "(About)",
  "about.p1":
    "I’m Kevin — a frontend-heavy full-stack developer working from México with clients anywhere. Since 2019 I’ve shipped websites, online stores and web apps with React, Next.js, Vue and Astro, backed by Node.js and Firebase.",
  "about.p2":
    "You work with me directly, in English or Spanish, from the first call to the last deploy — no account managers, no hand-offs. I use AI tooling every day to move faster, and I review every line it touches. The result is software that is fast, accessible and easy for the next developer to own.",

  "work.label": "Case study",
  "work.title": "Featured *work*",
  "work.intro":
    "One engagement, end to end: strategy, a bilingual build and a launch — with the numbers that followed.",
  "work.featured": "Featured case",
  "work.results": "Results",
  "work.stack": "Stack",
  "work.readCase": "Read case study",

  "services.label": "Services",
  "services.title": "What *I do*",
  "services.intro":
    "Six ways I can help — from a single landing page to a product that runs your business. Pick one, or hand me the whole thing.",
  "services.includes": "{title} includes",

  "process.label": "Process",
  "process.title": "How we’ll *work*",
  "process.intro":
    "Four steps from idea to launch. You always know where we are, what comes next and what you get at the end of each stage.",
  "process.step": "Step {n} of {total}",
  "process.youGet": "You get",
  "process.ctaKicker": "(Next step)",
  "process.ctaText": "Ready when *you are*",

  "experience.label": "Experience",
  "experience.title": "Track *record*",
  "experience.count": "2019 → now",
  "experience.intro":
    "Enterprise discipline and freelance hustle. Years inside large delivery teams, and years running projects end to end on my own. Now: independent.",
  "experience.technologies": "Technologies",

  "principles.label": "Principles",
  "principles.title": "How I *operate*",

  "contact.label": "Contact",
  "contact.title": "Got a project? *Let’s build it.*",
  "contact.lead":
    "Tell me what you’re building, where it stands and what success looks like. I read every message myself.",
  "contact.writeDirectly": "Write directly",
  "contact.copy": "Copy",
  "contact.copied": "Copied",
  "contact.copyFailed": "Couldn’t copy — use the email link",
  "contact.replyTime": "Reply time",
  "contact.replyValue": "Within 24 hours",
  "contact.languages": "Languages",
  "contact.languagesValue": "English / Español",
  "contact.elsewhere": "Elsewhere",

  "form.name": "Name",
  "form.email": "Work email",
  "form.company": "Company",
  "form.projectType": "Project type",
  "form.budget": "Budget range",
  "form.optional": "(optional)",
  "form.notSure": "Not sure yet",
  "form.type.webApp": "Web Application",
  "form.type.ecommerce": "E-commerce",
  "form.type.website": "Website / Landing Page",
  "form.type.redesign": "Redesign / Optimization",
  "form.type.maintenance": "Maintenance / Support",
  "form.budget.5k": "$5K - $10K",
  "form.budget.10k": "$10K - $25K",
  "form.budget.25k": "$25K - $50K",
  "form.budget.50k": "$50K+",
  "form.message": "Tell me about the project",
  "form.required": "Required",
  "form.tooShort": "Too short",
  "form.invalidEmail": "Invalid email",
  "form.messageTooShort": "Too short — at least {min} characters",
  "form.clear": "Clear form",
  "form.send": "Send message",
  "form.sending": "Sending…",
  "form.sent": "Sent",
  "form.status.success": "Thank you! I've received your inquiry and will get back to you within 24 hours.",
  "form.status.validation": "Some fields need attention. Please review them and try again.",
  "form.status.server": "Something went wrong on my end. Please try again later — or email me directly.",
  "form.status.network": "Couldn’t reach the server. Check your connection and try again.",

  "footer.pitch": "Have an idea worth building?",
  "footer.backToTop": "Back to top ↑",

  "case.back": "← Back to work",
  "case.label": "Case study",
  "case.visit": "Visit live site",
  "case.story": "Project story",
  "case.challenge": "The challenge",
  "case.solution": "The solution",
  "case.deepDive": "Deep dive",
  "case.outcome": "Outcome",
  "case.results": "The *results*",
  "case.techStack": "Tech stack",
  "case.cta.kicker": "(Next)",
  "case.cta.lead": "Your project could be",
  "case.cta.accent": "next",
};

export const ui: Record<Locale, Dictionary> = { es, en };

export type Translate = (key: UiKey, vars?: Record<string, string | number>) => string;

export function useTranslations(locale: Locale): Translate {
  const dictionary = ui[locale];
  return (key, vars) => {
    const text = dictionary[key];
    return vars ? text.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? String(vars[name]) : match)) : text;
  };
}
