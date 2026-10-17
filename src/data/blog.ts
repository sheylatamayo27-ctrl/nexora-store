import type { BlogPost } from "./types";

/**
 * Artículos de ejemplo del blog. Más adelante vendrán de un CMS (Sanity,
 * Contentful) o de Markdown/MDX; los componentes no cambian, solo la fuente.
 * Las portadas reutilizan imágenes ya presentes en /public/images.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "como-elegir-auriculares-cancelacion-de-ruido",
    title: "Cómo elegir los auriculares con cancelación de ruido perfectos",
    excerpt:
      "ANC híbrido, modos de transparencia, códecs y autonomía: una guía clara para encontrar los auriculares que de verdad necesitas sin pagar de más.",
    category: "Guías de compra",
    author: { name: "Ana Sánchez", role: "Editora de audio" },
    date: "2026-10-02",
    readingMinutes: 7,
    cover: "earbuds-banner",
    coverFolder: "banners",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "La cancelación activa de ruido dejó de ser una función premium para convertirse en un estándar. Pero no todos los sistemas de ANC son iguales, y entender las diferencias te ahorra dinero y dolores de cabeza.",
      },
      { type: "heading", text: "ANC híbrido vs. feedforward" },
      {
        type: "paragraph",
        text: "El ANC híbrido combina micrófonos internos y externos para cancelar un rango de frecuencias mucho más amplio. Es la opción que recomendamos si viajas en transporte público o trabajas en oficinas abiertas.",
      },
      {
        type: "list",
        items: [
          "Feedforward: bueno para ruido constante y agudo.",
          "Feedback: mejor para graves y voces.",
          "Híbrido: lo mejor de ambos, con calibración adaptativa.",
        ],
      },
      { type: "heading", text: "No ignores el modo de transparencia" },
      {
        type: "paragraph",
        text: "Un buen modo de transparencia te deja escuchar el entorno sin quitarte los auriculares. Es clave para cruzar la calle o pedir un café sin perder el hilo de tu música.",
      },
      {
        type: "quote",
        text: "La mejor cancelación de ruido es la que olvidas que está encendida.",
        cite: "Equipo de audio Nexora",
      },
      {
        type: "paragraph",
        text: "Antes de decidir, revisa la autonomía con ANC activado (no la cifra máxima de marketing) y confirma que soporten carga rápida por USB-C. Esos dos datos definen la experiencia diaria.",
      },
    ],
  },
  {
    slug: "5-accesorios-imprescindibles-para-tu-laptop",
    title: "5 accesorios imprescindibles para tu nueva laptop",
    excerpt:
      "Protección, ergonomía y productividad: los complementos que marcan la diferencia desde el primer día con tu equipo.",
    category: "Productividad",
    author: { name: "Roberto Cano", role: "Redactor tech" },
    date: "2026-09-24",
    readingMinutes: 5,
    cover: "laptopcase",
    coverFolder: "products",
    content: [
      {
        type: "paragraph",
        text: "Estrenar laptop es emocionante, pero el equipo solo da el 100% cuando lo acompañas de los accesorios correctos. Estos son los cinco que más usamos en la redacción.",
      },
      { type: "heading", text: "1. Una funda rígida" },
      {
        type: "paragraph",
        text: "La primera línea de defensa contra golpes y rayones. Busca una funda mate con interior afelpado que no añada demasiado grosor a tu mochila.",
      },
      { type: "heading", text: "2. Un hub USB-C" },
      {
        type: "paragraph",
        text: "Recupera los puertos que los equipos ultrafinos sacrifican: HDMI, lector SD y USB-A clásicos en un solo accesorio compacto.",
      },
      {
        type: "list",
        items: [
          "Power bank de 10 000 mAh para jornadas largas.",
          "Teclado y mouse inalámbricos para una postura cómoda.",
          "Disco externo para respaldos automáticos.",
        ],
      },
    ],
  },
  {
    slug: "nexora-x12-primeras-impresiones",
    title: "Nexora X12: primeras impresiones del nuevo flagship",
    excerpt:
      "Pantalla, cámara y rendimiento: pasamos una semana con el X12 y estas son las conclusiones que importan.",
    category: "Novedades",
    author: { name: "María Pérez", role: "Analista de dispositivos" },
    date: "2026-09-15",
    readingMinutes: 6,
    cover: "phone-banner",
    coverFolder: "banners",
    content: [
      {
        type: "paragraph",
        text: "El Nexora X12 llega con la promesa de competir en la gama alta sin un precio estratosférico. Tras una semana de uso intenso, el equilibrio es notable.",
      },
      { type: "heading", text: "Una pantalla que enamora" },
      {
        type: "paragraph",
        text: "El panel AMOLED de 120 Hz es fluido y brillante incluso bajo el sol. Los negros profundos y los colores calibrados hacen que ver contenido sea un placer.",
      },
      {
        type: "quote",
        text: "Es el teléfono que recomendaríamos a alguien que no quiere pensar en especificaciones, solo disfrutar.",
      },
      {
        type: "paragraph",
        text: "La batería supera cómodamente el día y medio, y la carga rápida recupera lo esencial en minutos. La cámara principal destaca de día; de noche cumple sin sorpresas.",
      },
    ],
  },
  {
    slug: "audio-sin-cables-guia-definitiva-2026",
    title: "Audio sin cables: la guía definitiva de 2026",
    excerpt:
      "Bluetooth 5.3, LDAC, multipunto y latencia: todo lo que cambió este año en el audio inalámbrico y por qué te conviene.",
    category: "Audio",
    author: { name: "Ana Sánchez", role: "Editora de audio" },
    date: "2026-08-30",
    readingMinutes: 8,
    cover: "headphones",
    coverFolder: "products",
    content: [
      {
        type: "paragraph",
        text: "El audio inalámbrico de 2026 es casi indistinguible del cableado para la mayoría de la gente. Estos son los avances que lo hicieron posible.",
      },
      { type: "heading", text: "Códecs que importan" },
      {
        type: "list",
        items: [
          "LDAC: alta resolución para quienes valoran el detalle.",
          "aptX Adaptive: equilibrio entre calidad y baja latencia.",
          "AAC: el estándar fiable para el ecosistema Apple.",
        ],
      },
      {
        type: "paragraph",
        text: "La conexión multipunto, antes exclusiva de modelos caros, ahora es común: cambia entre laptop y teléfono sin volver a emparejar.",
      },
    ],
  },
  {
    slug: "tablets-para-crear-vale-la-pena-el-stylus",
    title: "Tablets para crear: ¿vale la pena el stylus?",
    excerpt:
      "Dibujo, notas y edición: analizamos cuándo un lápiz digital transforma tu tablet en una herramienta de trabajo real.",
    category: "Creatividad",
    author: { name: "Roberto Cano", role: "Redactor tech" },
    date: "2026-08-12",
    readingMinutes: 5,
    cover: "tablet-banner",
    coverFolder: "banners",
    content: [
      {
        type: "paragraph",
        text: "Un stylus puede ser un gadget olvidado en un cajón o el accesorio que más uses. Todo depende de cómo trabajas.",
      },
      { type: "heading", text: "Para quién sí" },
      {
        type: "paragraph",
        text: "Si tomas notas a mano, ilustras o anotas documentos, un lápiz con baja latencia y sensibilidad a la presión cambia por completo la experiencia.",
      },
      {
        type: "quote",
        text: "El mejor stylus es el que te hace olvidar que estás escribiendo sobre vidrio.",
      },
    ],
  },
  {
    slug: "como-cuidar-la-bateria-de-tus-gadgets",
    title: "Cómo cuidar la batería de tus gadgets (y que duren años)",
    excerpt:
      "Hábitos simples de carga y temperatura que extienden la vida útil de teléfonos, laptops y audífonos.",
    category: "Mantenimiento",
    author: { name: "María Pérez", role: "Analista de dispositivos" },
    date: "2026-07-28",
    readingMinutes: 4,
    cover: "powerbank",
    coverFolder: "products",
    content: [
      {
        type: "paragraph",
        text: "Las baterías de litio se degradan con el tiempo, pero unos cuantos hábitos ralentizan ese desgaste de forma notable.",
      },
      {
        type: "list",
        items: [
          "Mantén la carga entre el 20% y el 80% siempre que puedas.",
          "Evita el calor extremo: es el peor enemigo de la batería.",
          "Usa cargadores certificados para la potencia de tu equipo.",
        ],
      },
      {
        type: "paragraph",
        text: "Activar la carga optimizada, si tu dispositivo la ofrece, es la forma más sencilla de cuidar la batería sin pensar en ello.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** Artículo destacado para la cabecera del blog. */
export const featuredPost = blogPosts.find((p) => p.featured) ?? blogPosts[0];

/** Artículos relacionados: misma categoría primero, luego los más recientes. */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return blogPosts.slice(0, limit);
  const sameCategory = blogPosts.filter((p) => p.slug !== slug && p.category === current.category);
  const rest = blogPosts.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
