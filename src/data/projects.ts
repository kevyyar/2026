import type { Project } from "./types";
import type { Locale, Localized } from "../i18n/config";
import ecsImage from "../assets/work/element-cleaning-systems.png";
import pideloconmigoImage from "../assets/work/pideloconmigo.png";

type TranslatableFields = "industry" | "title" | "imageAlt" | "challenge" | "solution" | "fullDescription";

type ProjectSource = Pick<Project, "slug" | "client" | "image" | "websiteUrl"> & {
  text: Localized<Pick<Project, TranslatableFields>>;
  tags: Localized<string[]>;
  /** Metric values are reported figures and never translated; labels are. */
  results: { value: string; label: Localized }[];
};

const source: ProjectSource[] = [
  {
    slug: "element-cleaning-systems",
    client: "Element Cleaning Systems",
    image: ecsImage,
    tags: {
      es: ["En español e inglés", "Fácil de encontrar", "Cotización en línea", "Avisos por correo"],
      en: ["Next.js", "Tailwind", "Strapi", "Resend"],
    },
    websiteUrl: "https://elementjanitorial.com",
    results: [
      { value: "+340%", label: { es: "Solicitudes de cotización", en: "Quote Requests" } },
      { value: "+45%", label: { es: "Tamaño de los contratos", en: "Contract Size" } },
      { value: "24/7", label: { es: "Cotizaciones en línea", en: "Online Quotes" } },
      { value: "+28%", label: { es: "Licitaciones ganadas", en: "RFP Wins" } },
    ],
    text: {
      es: {
        industry: "Limpieza comercial",
        title: "Vivían de las recomendaciones. Ahora los encuentran solos.",
        imageAlt: "Sitio web de Element Cleaning Systems",
        challenge:
          "Todo su trabajo llegaba de boca en boca. Si nadie los recomendaba ese mes, no había clientes nuevos. Necesitaban que las empresas los encontraran por su cuenta.",
        solution:
          "Desarrollé una plataforma bilingüe de alto rendimiento que posiciona a ECS como líder del mercado, con cotizaciones automatizadas y mapas de cobertura por región.",
        fullDescription:
          "Diseñé y desarrollé un sitio web completamente responsivo. Implementé un sistema de contenido bilingüe en inglés y español en todo el sitio y creé páginas de servicio dinámicas que presentan sus programas de limpieza especializados.",
      },
      en: {
        industry: "Industrial Services",
        title: "Digital Transformation for Janitorial Leader",
        imageAlt: "Element Cleaning Systems Website",
        challenge:
          "A premier janitorial company lacked the digital footprint to compete for enterprise contracts, relying solely on word-of-mouth.",
        solution:
          "I engineered a high-performance, bilingual platform that positions ECS as a market leader, featuring automated quoting and regional mapping.",
        fullDescription:
          "I designed and developed a fully responsive website. I implemented a bilingual content system supporting English and Spanish throughout the entire site, created dynamic service pages showcasing specialized cleaning programs.",
      },
    },
  },
  {
    slug: "pideloconmigo",
    client: "PídeloConmigo",
    image: pideloconmigoImage,
    tags: {
      es: ["Pedidos a WhatsApp", "QR con tu logo", "Se edita desde el celular", "Sin comisiones"],
      en: ["Next.js", "Supabase", "Tailwind", "PWA"],
    },
    websiteUrl: "https://pideloconmigo.com",
    results: [
      { value: "0%", label: { es: "Comisión por pedido", en: "Commission per Order" } },
      { value: "0", label: { es: "Apps que descargar", en: "Apps to Install" } },
      { value: "4", label: { es: "Temas de diseño", en: "Design Themes" } },
      { value: "7", label: { es: "Días de prueba gratis", en: "Free Trial Days" } },
    ],
    text: {
      es: {
        industry: "Producto propio · Catálogos digitales",
        title: "Del “¿precio?” todo el día a pedidos completos por WhatsApp.",
        imageAlt: "Página de inicio de PídeloConmigo",
        challenge:
          "Los negocios pequeños que venden por WhatsApp pasan el día contestando precios, y los pedidos llegan incompletos. Cada cambio de precio obliga a mandar fotos y listas otra vez.",
        solution:
          "Creé y vendo PídeloConmigo: un catálogo o menú en línea con fotos, precios, un QR con el logo del negocio y su propio link. El cliente arma su pedido y le llega completo al WhatsApp del negocio, sin comisiones.",
        fullDescription:
          "Lo diseñé y desarrollé de punta a punta, desde la página de venta hasta el panel del dueño. El negocio edita productos, categorías, precios y promociones desde el celular, elige un tema de diseño y descarga su QR listo para imprimir. Sus clientes no descargan nada: abren el link, arman su carrito y envían el pedido. Lo vendo con 7 días de prueba gratis y un solo pago.",
      },
      en: {
        industry: "Own Product · Digital Catalogs",
        title: "From Endless Price Questions to Complete WhatsApp Orders",
        imageAlt: "PídeloConmigo landing page",
        challenge:
          "Small businesses that sell over WhatsApp spend the day answering price questions, and orders arrive incomplete. Every price change means sending photos and lists again.",
        solution:
          "I built and sell PídeloConmigo: an online catalog or menu with photos, prices, a QR code with the business logo, and its own link. Customers build their order and it arrives complete in the business's WhatsApp, with no commissions.",
        fullDescription:
          "I designed and built it end to end, from the sales landing page to the owner dashboard. Owners edit products, categories, prices, and promotions from their phone, pick a design theme, and download a print-ready QR code. Their customers install nothing: they open the link, fill their cart, and send the order. I sell it with a 7-day free trial and a one-time payment.",
      },
    },
  },
];

export function getProjects(locale: Locale): Project[] {
  return source.map(({ text, results, tags, ...shared }) => ({
    ...shared,
    ...text[locale],
    tags: tags[locale],
    results: results.map((result) => ({ label: result.label[locale], value: result.value })),
  }));
}

export function getProject(slug: string, locale: Locale): Project | undefined {
  return getProjects(locale).find((project) => project.slug === slug);
}

/** Slugs for static paths (locale-independent). */
export const projectSlugs = source.map((project) => project.slug);
