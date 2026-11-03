import type { BlogPostRecord } from "./types";

/**
 * "Base de datos" simulada: artículos de ejemplo del blog. Más adelante vendrán
 * de un CMS (Sanity, Contentful) o de Markdown/MDX a través de `src/server/blog.ts`;
 * los componentes no cambian, solo la fuente. Las portadas reutilizan imágenes
 * ya presentes en /public/images. Cada idioma tiene su propio cuerpo de artículo.
 */
export const blogPosts: BlogPostRecord[] = [
  {
    slug: "how-to-choose-noise-cancelling-headphones",
    title: {
      es: "Cómo elegir los auriculares con cancelación de ruido perfectos",
      en: "How to choose the perfect noise-cancelling headphones",
    },
    excerpt: {
      es: "ANC híbrido, modos de transparencia, códecs y autonomía: una guía clara para encontrar los auriculares que de verdad necesitas sin pagar de más.",
      en: "Hybrid ANC, transparency modes, codecs and battery life: a clear guide to finding the headphones you actually need without overpaying.",
    },
    category: { es: "Guías de compra", en: "Buying guides" },
    author: { name: "Ana Sánchez", role: { es: "Editora de audio", en: "Audio editor" } },
    date: "2026-10-02",
    readingMinutes: 7,
    cover: "earbuds-banner",
    coverFolder: "banners",
    featured: true,
    content: {
      es: [
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
      en: [
        {
          type: "paragraph",
          text: "Active noise cancellation has gone from a premium feature to a standard one. But not all ANC systems are created equal, and understanding the differences will save you money and headaches.",
        },
        { type: "heading", text: "Hybrid vs. feedforward ANC" },
        {
          type: "paragraph",
          text: "Hybrid ANC combines internal and external microphones to cancel a much wider range of frequencies. It's the option we recommend if you commute on public transport or work in an open-plan office.",
        },
        {
          type: "list",
          items: [
            "Feedforward: good for constant, high-pitched noise.",
            "Feedback: better for low frequencies and voices.",
            "Hybrid: the best of both, with adaptive calibration.",
          ],
        },
        { type: "heading", text: "Don't overlook transparency mode" },
        {
          type: "paragraph",
          text: "A good transparency mode lets you hear your surroundings without taking your headphones off. It's key for crossing the street or ordering a coffee without losing track of your music.",
        },
        {
          type: "quote",
          text: "The best noise cancellation is the kind you forget is switched on.",
          cite: "Nexora audio team",
        },
        {
          type: "paragraph",
          text: "Before you decide, check the battery life with ANC on (not the headline marketing figure) and make sure they support fast USB-C charging. Those two specs define the day-to-day experience.",
        },
      ],
    },
  },
  {
    slug: "5-essential-laptop-accessories",
    title: {
      es: "5 accesorios imprescindibles para tu nueva laptop",
      en: "5 must-have accessories for your new laptop",
    },
    excerpt: {
      es: "Protección, ergonomía y productividad: los complementos que marcan la diferencia desde el primer día con tu equipo.",
      en: "Protection, ergonomics and productivity: the add-ons that make a difference from day one.",
    },
    category: { es: "Productividad", en: "Productivity" },
    author: { name: "Roberto Cano", role: { es: "Redactor tech", en: "Tech writer" } },
    date: "2026-09-24",
    readingMinutes: 5,
    cover: "laptopcase",
    coverFolder: "products",
    content: {
      es: [
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
      en: [
        {
          type: "paragraph",
          text: "Unboxing a new laptop is exciting, but it only performs at its best when you pair it with the right accessories. These are the five we use most in our newsroom.",
        },
        { type: "heading", text: "1. A hard-shell case" },
        {
          type: "paragraph",
          text: "Your first line of defense against bumps and scratches. Look for a matte case with a soft-lined interior that doesn't add much bulk to your backpack.",
        },
        { type: "heading", text: "2. A USB-C hub" },
        {
          type: "paragraph",
          text: "Get back the ports that ultra-thin laptops sacrifice: HDMI, an SD card reader and classic USB-A, all in one compact accessory.",
        },
        {
          type: "list",
          items: [
            "A 10,000 mAh power bank for long days.",
            "A wireless keyboard and mouse for a comfortable posture.",
            "An external drive for automatic backups.",
          ],
        },
      ],
    },
  },
  {
    slug: "nexora-x12-first-impressions",
    title: {
      es: "Nexora X12: primeras impresiones del nuevo flagship",
      en: "Nexora X12: first impressions of the new flagship",
    },
    excerpt: {
      es: "Pantalla, cámara y rendimiento: pasamos una semana con el X12 y estas son las conclusiones que importan.",
      en: "Display, camera and performance: we spent a week with the X12 and these are the takeaways that matter.",
    },
    category: { es: "Novedades", en: "News" },
    author: { name: "María Pérez", role: { es: "Analista de dispositivos", en: "Device analyst" } },
    date: "2026-09-15",
    readingMinutes: 6,
    cover: "phone-banner",
    coverFolder: "banners",
    content: {
      es: [
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
      en: [
        {
          type: "paragraph",
          text: "The Nexora X12 arrives promising to compete at the high end without a sky-high price tag. After a week of heavy use, the balance it strikes is impressive.",
        },
        { type: "heading", text: "A display you'll fall for" },
        {
          type: "paragraph",
          text: "The 120 Hz AMOLED panel is smooth and bright, even in direct sunlight. Deep blacks and calibrated colors make watching anything a pleasure.",
        },
        {
          type: "quote",
          text: "It's the phone we'd recommend to anyone who doesn't want to think about specs and just wants to enjoy it.",
        },
        {
          type: "paragraph",
          text: "The battery comfortably lasts a day and a half, and fast charging tops up the essentials in minutes. The main camera shines in daylight; at night it gets the job done without surprises.",
        },
      ],
    },
  },
  {
    slug: "wireless-audio-ultimate-guide-2026",
    title: {
      es: "Audio sin cables: la guía definitiva de 2026",
      en: "Wireless audio: the ultimate 2026 guide",
    },
    excerpt: {
      es: "Bluetooth 5.3, LDAC, multipunto y latencia: todo lo que cambió este año en el audio inalámbrico y por qué te conviene.",
      en: "Bluetooth 5.3, LDAC, multipoint and latency: everything that changed in wireless audio this year and why it matters to you.",
    },
    category: { es: "Audio", en: "Audio" },
    author: { name: "Ana Sánchez", role: { es: "Editora de audio", en: "Audio editor" } },
    date: "2026-08-30",
    readingMinutes: 8,
    cover: "headphones",
    coverFolder: "products",
    content: {
      es: [
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
      en: [
        {
          type: "paragraph",
          text: "For most people, wireless audio in 2026 is almost indistinguishable from wired. These are the advances that made it possible.",
        },
        { type: "heading", text: "Codecs that matter" },
        {
          type: "list",
          items: [
            "LDAC: high resolution for those who value detail.",
            "aptX Adaptive: a balance between quality and low latency.",
            "AAC: the reliable standard for the Apple ecosystem.",
          ],
        },
        {
          type: "paragraph",
          text: "Multipoint connectivity, once exclusive to expensive models, is now common: switch between your laptop and phone without pairing again.",
        },
      ],
    },
  },
  {
    slug: "tablets-for-creators-is-the-stylus-worth-it",
    title: {
      es: "Tablets para crear: ¿vale la pena el stylus?",
      en: "Tablets for creators: is the stylus worth it?",
    },
    excerpt: {
      es: "Dibujo, notas y edición: analizamos cuándo un lápiz digital transforma tu tablet en una herramienta de trabajo real.",
      en: "Drawing, note-taking and editing: we look at when a digital pen turns your tablet into a real work tool.",
    },
    category: { es: "Creatividad", en: "Creativity" },
    author: { name: "Roberto Cano", role: { es: "Redactor tech", en: "Tech writer" } },
    date: "2026-08-12",
    readingMinutes: 5,
    cover: "tablet-banner",
    coverFolder: "banners",
    content: {
      es: [
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
      en: [
        {
          type: "paragraph",
          text: "A stylus can be a gadget forgotten in a drawer or the accessory you use the most. It all depends on how you work.",
        },
        { type: "heading", text: "Who it's for" },
        {
          type: "paragraph",
          text: "If you take handwritten notes, illustrate or mark up documents, a low-latency, pressure-sensitive pen completely changes the experience.",
        },
        {
          type: "quote",
          text: "The best stylus is the one that makes you forget you're writing on glass.",
        },
      ],
    },
  },
  {
    slug: "how-to-care-for-your-gadget-batteries",
    title: {
      es: "Cómo cuidar la batería de tus gadgets (y que duren años)",
      en: "How to care for your gadgets' batteries (and make them last for years)",
    },
    excerpt: {
      es: "Hábitos simples de carga y temperatura que extienden la vida útil de teléfonos, laptops y audífonos.",
      en: "Simple charging and temperature habits that extend the lifespan of phones, laptops and earbuds.",
    },
    category: { es: "Mantenimiento", en: "Maintenance" },
    author: { name: "María Pérez", role: { es: "Analista de dispositivos", en: "Device analyst" } },
    date: "2026-07-28",
    readingMinutes: 4,
    cover: "powerbank",
    coverFolder: "products",
    content: {
      es: [
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
      en: [
        {
          type: "paragraph",
          text: "Lithium batteries degrade over time, but a few habits slow that wear down considerably.",
        },
        {
          type: "list",
          items: [
            "Keep the charge between 20% and 80% whenever you can.",
            "Avoid extreme heat: it's your battery's worst enemy.",
            "Use certified chargers rated for your device's power.",
          ],
        },
        {
          type: "paragraph",
          text: "Turning on optimized charging, if your device offers it, is the easiest way to look after your battery without giving it a second thought.",
        },
      ],
    },
  },
];
