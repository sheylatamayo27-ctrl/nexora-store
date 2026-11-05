import type { ContentPageRecord } from "./types";

/**
 * "Base de datos" simulada: páginas legales e informativas. Más adelante vendrán
 * de un CMS a través de `src/server/pages.ts`; las páginas no cambian, solo la
 * fuente. Textos de ejemplo de una tienda de electrónica en México: revísalos con
 * tu asesor legal antes de publicar. Los datos de contacto son los del footer.
 */
export const contentPages: ContentPageRecord[] = [
  {
    slug: "terms",
    title: { es: "Términos y condiciones", en: "Terms and conditions" },
    subtitle: {
      es: "Las reglas que aplican cuando compras o navegas en Nexora.",
      en: "The rules that apply when you shop or browse at Nexora.",
    },
    description: {
      es: "Términos y condiciones de uso y compra en Nexora: precios, pagos, envíos, devoluciones y responsabilidad.",
      en: "Nexora's terms of use and sale: prices, payments, shipping, returns and liability.",
    },
    updated: "2026-11-01",
    blocks: {
      es: [
        { type: "heading", text: "Aceptación de los términos" },
        {
          type: "paragraph",
          text: "Estos términos regulan el uso de nexora.store y las compras que realices en él, operado por Nexora Electronics con domicilio en Parque Tecnológico 221B, Ciudad de México.",
        },
        {
          type: "paragraph",
          text: "Al navegar por el sitio, crear una cuenta o hacer un pedido aceptas estos términos y nuestra [Política de privacidad](/privacy). Si no estás de acuerdo con alguna parte, te pedimos no utilizar el sitio.",
        },
        { type: "heading", text: "Uso del sitio" },
        {
          type: "paragraph",
          text: "Puedes usar el sitio para consultar productos, comprar para uso personal y gestionar tus pedidos. Eres responsable de mantener la confidencialidad de tu contraseña y de la actividad de tu cuenta.",
        },
        {
          type: "paragraph",
          text: "No está permitido usar el sitio con fines fraudulentos, intentar acceder a áreas restringidas, extraer contenido de forma automatizada ni revender productos adquiridos con promociones de uso personal.",
        },
        { type: "heading", text: "Productos y precios" },
        {
          type: "paragraph",
          text: "Mostramos las características, imágenes y existencias de cada producto con el mayor cuidado posible. Los colores pueden variar ligeramente según tu pantalla.",
        },
        {
          type: "paragraph",
          text: "Los precios son referenciales y pueden cambiar sin previo aviso. El precio que pagas es el que aparece en el resumen del pedido al confirmar la compra, con los impuestos y el envío desglosados.",
        },
        {
          type: "paragraph",
          text: "Si un producto se publica con un precio claramente erróneo, te avisaremos y podrás confirmar el pedido con el precio correcto o cancelarlo con el reembolso completo.",
        },
        { type: "heading", text: "Proceso de compra y pago" },
        {
          type: "paragraph",
          text: "El pedido queda confirmado cuando recibes el correo de confirmación con tu número de pedido. Antes de esa confirmación podemos rechazar un pedido si no hay existencias o si el pago no se autoriza.",
        },
        {
          type: "paragraph",
          text: "Aceptamos tarjetas de crédito y débito, billeteras digitales, transferencia bancaria y pago contra entrega. Los pagos con tarjeta se procesan con cifrado SSL de 256 bits; Nexora no almacena los datos completos de tu tarjeta.",
        },
        { type: "heading", text: "Envíos y entregas" },
        {
          type: "paragraph",
          text: "Enviamos a todo México. Los métodos, plazos y costos disponibles se muestran en el checkout y se detallan en [Información de envíos](/shipping).",
        },
        {
          type: "paragraph",
          text: "Los plazos de entrega son estimados y cuentan a partir de la confirmación del pago. Si un pedido se retrasa, te escribiremos con la nueva fecha estimada.",
        },
        { type: "heading", text: "Devoluciones y reembolsos" },
        {
          type: "paragraph",
          text: "Tienes 30 días naturales desde la entrega para devolver un producto. Las condiciones, el proceso y los plazos de reembolso se explican en [Devoluciones y reembolsos](/returns).",
        },
        {
          type: "paragraph",
          text: "Las fallas de fabricación posteriores a ese plazo se atienden con la [Garantía](/warranty) del producto.",
        },
        { type: "heading", text: "Propiedad intelectual" },
        {
          type: "paragraph",
          text: "La marca Nexora, el logotipo, los textos, las fotografías y el diseño del sitio son propiedad de Nexora Electronics o de sus licenciantes. No puedes copiarlos, modificarlos ni distribuirlos sin autorización por escrito.",
        },
        {
          type: "paragraph",
          text: "Las marcas de terceros que aparecen en el sitio pertenecen a sus respectivos titulares y se usan solo para identificar sus productos.",
        },
        { type: "heading", text: "Limitación de responsabilidad" },
        {
          type: "paragraph",
          text: "Nexora responde por los productos que vende conforme a la Ley Federal de Protección al Consumidor. No somos responsables de daños derivados de un uso del producto distinto al indicado por el fabricante.",
        },
        {
          type: "paragraph",
          text: "Hacemos lo posible por mantener el sitio disponible y libre de errores, pero puede haber interrupciones por mantenimiento o causas ajenas a nosotros.",
        },
        { type: "heading", text: "Modificaciones a los términos" },
        {
          type: "paragraph",
          text: "Podemos actualizar estos términos para reflejar cambios en el servicio o en la ley. La fecha de la última actualización aparece al inicio de esta página.",
        },
        {
          type: "paragraph",
          text: "Los pedidos ya confirmados se rigen por los términos vigentes en el momento de la compra.",
        },
        { type: "heading", text: "Contacto" },
        {
          type: "paragraph",
          text: "Si tienes dudas sobre estos términos, escríbenos a [soporte@nexora.store](mailto:soporte@nexora.store), llámanos al +52 55 9876 5432 o usa el [formulario de contacto](/contact).",
        },
      ],
      en: [
        { type: "heading", text: "Acceptance of the terms" },
        {
          type: "paragraph",
          text: "These terms govern the use of nexora.store and the purchases you make on it, operated by Nexora Electronics, Parque Tecnológico 221B, Mexico City.",
        },
        {
          type: "paragraph",
          text: "By browsing the site, creating an account or placing an order you accept these terms and our [Privacy policy](/privacy). If you disagree with any part, please don't use the site.",
        },
        { type: "heading", text: "Use of the site" },
        {
          type: "paragraph",
          text: "You may use the site to browse products, buy for personal use and manage your orders. You're responsible for keeping your password confidential and for the activity on your account.",
        },
        {
          type: "paragraph",
          text: "You may not use the site for fraudulent purposes, try to access restricted areas, scrape content automatically or resell products bought with personal-use promotions.",
        },
        { type: "heading", text: "Products and prices" },
        {
          type: "paragraph",
          text: "We show each product's features, images and stock as carefully as we can. Colors may vary slightly depending on your screen.",
        },
        {
          type: "paragraph",
          text: "Prices are indicative and may change without notice. The price you pay is the one shown in the order summary when you confirm your purchase, with taxes and shipping itemized.",
        },
        {
          type: "paragraph",
          text: "If a product is listed at an obviously wrong price, we'll let you know and you can confirm the order at the correct price or cancel it with a full refund.",
        },
        { type: "heading", text: "Ordering and payment" },
        {
          type: "paragraph",
          text: "Your order is confirmed when you receive the confirmation email with your order number. Before that, we may decline an order if the item is out of stock or the payment isn't authorized.",
        },
        {
          type: "paragraph",
          text: "We accept credit and debit cards, digital wallets, bank transfer and cash on delivery. Card payments are processed with 256-bit SSL encryption; Nexora doesn't store your full card details.",
        },
        { type: "heading", text: "Shipping and delivery" },
        {
          type: "paragraph",
          text: "We ship anywhere in Mexico. Available methods, delivery times and costs are shown at checkout and explained in [Shipping information](/shipping).",
        },
        {
          type: "paragraph",
          text: "Delivery times are estimates and start once the payment is confirmed. If an order is delayed, we'll email you the new estimated date.",
        },
        { type: "heading", text: "Returns and refunds" },
        {
          type: "paragraph",
          text: "You have 30 calendar days from delivery to return a product. Conditions, process and refund times are explained in [Returns and refunds](/returns).",
        },
        {
          type: "paragraph",
          text: "Manufacturing defects that appear after that period are covered by the product's [Warranty](/warranty).",
        },
        { type: "heading", text: "Intellectual property" },
        {
          type: "paragraph",
          text: "The Nexora brand, logo, copy, photos and site design belong to Nexora Electronics or its licensors. You may not copy, modify or distribute them without written permission.",
        },
        {
          type: "paragraph",
          text: "Third-party brands shown on the site belong to their respective owners and are used only to identify their products.",
        },
        { type: "heading", text: "Limitation of liability" },
        {
          type: "paragraph",
          text: "Nexora is responsible for the products it sells under Mexico's Federal Consumer Protection Law. We're not liable for damage caused by using a product other than as the manufacturer intends.",
        },
        {
          type: "paragraph",
          text: "We do our best to keep the site available and error-free, but there may be interruptions for maintenance or reasons beyond our control.",
        },
        { type: "heading", text: "Changes to these terms" },
        {
          type: "paragraph",
          text: "We may update these terms to reflect changes in our service or in the law. The date of the last update appears at the top of this page.",
        },
        {
          type: "paragraph",
          text: "Orders already confirmed are governed by the terms in force at the time of purchase.",
        },
        { type: "heading", text: "Contact" },
        {
          type: "paragraph",
          text: "If you have questions about these terms, email [soporte@nexora.store](mailto:soporte@nexora.store), call +52 55 9876 5432 or use the [contact form](/contact).",
        },
      ],
    },
  },
  {
    slug: "privacy",
    title: { es: "Política de privacidad", en: "Privacy policy" },
    subtitle: {
      es: "Qué datos recopilamos, para qué los usamos y cómo puedes controlarlos.",
      en: "What data we collect, what we use it for and how you can control it.",
    },
    description: {
      es: "Cómo Nexora recopila, usa y protege tus datos personales, y cómo ejercer tus derechos ARCO.",
      en: "How Nexora collects, uses and protects your personal data, and how to exercise your rights.",
    },
    updated: "2026-11-01",
    blocks: {
      es: [
        {
          type: "paragraph",
          text: "Nexora Electronics, con domicilio en Parque Tecnológico 221B, Ciudad de México, es responsable del tratamiento de tus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.",
        },
        { type: "heading", text: "Información que recopilamos" },
        {
          type: "list",
          items: [
            "Datos personales que nos das: nombre, correo electrónico, teléfono y dirección de envío al crear una cuenta o hacer un pedido.",
            "Datos de pago: los procesa nuestro proveedor de pagos; nosotros solo conservamos el tipo de tarjeta y sus últimos cuatro dígitos.",
            "Datos de navegación: páginas visitadas, productos vistos, dispositivo, navegador y dirección IP aproximada.",
            "Cookies y tecnologías similares, descritas más abajo.",
          ],
        },
        { type: "heading", text: "Cómo usamos tu información" },
        {
          type: "list",
          items: [
            "Procesar, enviar y dar seguimiento a tus pedidos, devoluciones y garantías.",
            "Atender tus consultas por correo, teléfono o chat.",
            "Prevenir fraudes y proteger la seguridad de tu cuenta.",
            "Enviarte ofertas y novedades, solo si te suscribiste. Puedes darte de baja desde cualquier correo.",
            "Mejorar el sitio y recomendarte productos según tu actividad.",
          ],
        },
        { type: "heading", text: "Compartición con terceros" },
        {
          type: "paragraph",
          text: "No vendemos tus datos. Solo los compartimos con proveedores que nos ayudan a operar la tienda —procesadores de pago, paqueterías y servicios de correo y alojamiento— y únicamente en la medida necesaria para prestar su servicio.",
        },
        {
          type: "paragraph",
          text: "También podemos entregarlos a autoridades cuando una ley o una orden judicial lo exija.",
        },
        { type: "heading", text: "Seguridad de datos" },
        {
          type: "paragraph",
          text: "Protegemos tu información con cifrado SSL de 256 bits, accesos restringidos al personal autorizado y copias de seguridad periódicas.",
        },
        {
          type: "paragraph",
          text: "Ningún sistema es infalible: si detectamos un incidente que afecte tus datos, te lo notificaremos sin demora junto con las medidas que tomamos.",
        },
        { type: "heading", text: "Tus derechos" },
        {
          type: "paragraph",
          text: "Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, cancelación y oposición (ARCO), así como revocar tu consentimiento:",
        },
        {
          type: "list",
          items: [
            "Acceso: saber qué datos tuyos tenemos y para qué los usamos.",
            "Rectificación: corregir datos inexactos o incompletos.",
            "Cancelación: pedir que eliminemos tus datos cuando ya no sean necesarios.",
            "Oposición: negarte a usos concretos, como el envío de publicidad.",
          ],
        },
        {
          type: "paragraph",
          text: "Envía tu solicitud a [privacidad@nexora.store](mailto:privacidad@nexora.store) con tu nombre y el correo de tu cuenta. Te responderemos en un máximo de 20 días hábiles.",
        },
        { type: "heading", text: "Cookies" },
        {
          type: "list",
          items: [
            "Esenciales: mantienen tu sesión, tu carrito y tu idioma. Sin ellas la tienda no funciona.",
            "De preferencias: recuerdan elecciones como tus favoritos.",
            "De análisis: nos dicen de forma agregada qué páginas se visitan más para mejorar el sitio.",
          ],
        },
        {
          type: "paragraph",
          text: "Puedes borrar o bloquear las cookies desde la configuración de tu navegador; si bloqueas las esenciales, algunas funciones dejarán de estar disponibles.",
        },
        { type: "heading", text: "Cambios a esta política" },
        {
          type: "paragraph",
          text: "Si cambiamos la forma en que tratamos tus datos, actualizaremos esta página y la fecha que aparece al inicio. Si el cambio es importante, también te avisaremos por correo.",
        },
        { type: "heading", text: "Contacto del responsable de datos" },
        {
          type: "paragraph",
          text: "Departamento de Privacidad de Nexora Electronics: [privacidad@nexora.store](mailto:privacidad@nexora.store) · +52 55 9876 5432 · Parque Tecnológico 221B, Ciudad de México.",
        },
      ],
      en: [
        {
          type: "paragraph",
          text: "Nexora Electronics, Parque Tecnológico 221B, Mexico City, is responsible for processing your personal data under Mexico's Federal Law on the Protection of Personal Data Held by Private Parties.",
        },
        { type: "heading", text: "Information we collect" },
        {
          type: "list",
          items: [
            "Personal data you give us: name, email, phone and shipping address when you create an account or place an order.",
            "Payment data: handled by our payment provider; we only keep the card type and its last four digits.",
            "Browsing data: pages visited, products viewed, device, browser and approximate IP address.",
            "Cookies and similar technologies, described below.",
          ],
        },
        { type: "heading", text: "How we use your information" },
        {
          type: "list",
          items: [
            "Process, ship and track your orders, returns and warranty claims.",
            "Answer your questions by email, phone or chat.",
            "Prevent fraud and keep your account secure.",
            "Send you deals and news, only if you subscribed. You can unsubscribe from any email.",
            "Improve the site and recommend products based on your activity.",
          ],
        },
        { type: "heading", text: "Sharing with third parties" },
        {
          type: "paragraph",
          text: "We don't sell your data. We only share it with providers that help us run the store —payment processors, carriers, and email and hosting services— and only as far as they need it to provide their service.",
        },
        {
          type: "paragraph",
          text: "We may also disclose it to authorities when required by law or a court order.",
        },
        { type: "heading", text: "Data security" },
        {
          type: "paragraph",
          text: "We protect your information with 256-bit SSL encryption, access restricted to authorized staff and regular backups.",
        },
        {
          type: "paragraph",
          text: "No system is foolproof: if we detect an incident that affects your data, we'll notify you promptly along with the steps we've taken.",
        },
        { type: "heading", text: "Your rights" },
        {
          type: "paragraph",
          text: "You can exercise your rights of access, rectification, cancellation and objection at any time, and withdraw your consent:",
        },
        {
          type: "list",
          items: [
            "Access: know what data we hold about you and what we use it for.",
            "Rectification: correct inaccurate or incomplete data.",
            "Cancellation: ask us to delete your data when it's no longer needed.",
            "Objection: refuse specific uses, such as marketing emails.",
          ],
        },
        {
          type: "paragraph",
          text: "Send your request to [privacidad@nexora.store](mailto:privacidad@nexora.store) with your name and your account email. We'll reply within 20 business days.",
        },
        { type: "heading", text: "Cookies" },
        {
          type: "list",
          items: [
            "Essential: keep your session, cart and language. The store doesn't work without them.",
            "Preferences: remember choices such as your wishlist.",
            "Analytics: tell us, in aggregate, which pages are visited most so we can improve the site.",
          ],
        },
        {
          type: "paragraph",
          text: "You can delete or block cookies in your browser settings; if you block essential ones, some features will stop working.",
        },
        { type: "heading", text: "Changes to this policy" },
        {
          type: "paragraph",
          text: "If we change how we handle your data, we'll update this page and the date at the top. If the change is significant, we'll also let you know by email.",
        },
        { type: "heading", text: "Data controller contact" },
        {
          type: "paragraph",
          text: "Nexora Electronics Privacy Department: [privacidad@nexora.store](mailto:privacidad@nexora.store) · +52 55 9876 5432 · Parque Tecnológico 221B, Mexico City.",
        },
      ],
    },
  },
  {
    slug: "shipping",
    title: { es: "Información de envíos", en: "Shipping information" },
    subtitle: {
      es: "Métodos, costos y plazos para que sepas cuándo llega tu pedido.",
      en: "Methods, costs and delivery times so you know when your order arrives.",
    },
    description: {
      es: "Métodos de envío de Nexora, costos, cobertura en todo México y seguimiento de pedidos.",
      en: "Nexora shipping methods, costs, coverage across Mexico and order tracking.",
    },
    blocks: {
      es: [
        { type: "heading", text: "Métodos de envío disponibles" },
        {
          type: "paragraph",
          text: "Al pagar eliges el método que prefieras. El envío estándar es gratis en todos los pedidos; los plazos cuentan en días hábiles a partir de la confirmación del pago.",
        },
        { type: "shippingRates" },
        {
          type: "paragraph",
          text: "La entrega el mismo día solo está disponible en la Ciudad de México para pedidos pagados antes de las 2:00 PM. Los pedidos posteriores salen al día hábil siguiente.",
        },
        { type: "heading", text: "Cobertura" },
        {
          type: "paragraph",
          text: "Enviamos a todo México a través de paqueterías nacionales. En algunas zonas rurales o de difícil acceso el plazo puede ampliarse uno o dos días; te lo indicaremos al confirmar el pedido.",
        },
        { type: "heading", text: "Seguimiento del pedido" },
        {
          type: "paragraph",
          text: "Cuando tu pedido sale de nuestro almacén te enviamos un correo con el número de guía. También puedes consultar su estado en [Rastrear pedido](/track-order) o en [Mi cuenta](/account).",
        },
        {
          type: "paragraph",
          text: "Para entregarlo pedimos que alguien mayor de edad reciba el paquete y firme. Si no hay nadie, la paquetería hará un segundo intento al día hábil siguiente.",
        },
        { type: "heading", text: "Problemas con el envío" },
        {
          type: "list",
          items: [
            "Paquete dañado: no lo rechaces; tómale fotos y escríbenos en las 48 horas siguientes a la entrega.",
            "Pedido retrasado: si pasaron dos días hábiles de la fecha estimada, contáctanos con tu número de pedido y lo revisamos con la paquetería.",
            "Dirección incorrecta: avísanos cuanto antes; podemos corregirla mientras el pedido no haya salido del almacén.",
          ],
        },
        {
          type: "paragraph",
          text: "Para cualquiera de estos casos escríbenos a [soporte@nexora.store](mailto:soporte@nexora.store) o usa el [formulario de contacto](/contact).",
        },
      ],
      en: [
        { type: "heading", text: "Available shipping methods" },
        {
          type: "paragraph",
          text: "You choose your preferred method at checkout. Standard shipping is free on every order; delivery times are in business days from payment confirmation.",
        },
        { type: "shippingRates" },
        {
          type: "paragraph",
          text: "Same-day delivery is only available in Mexico City for orders paid before 2:00 PM. Later orders ship the next business day.",
        },
        { type: "heading", text: "Coverage" },
        {
          type: "paragraph",
          text: "We ship anywhere in Mexico through national carriers. In some rural or hard-to-reach areas delivery may take one or two extra days; we'll tell you when we confirm your order.",
        },
        { type: "heading", text: "Order tracking" },
        {
          type: "paragraph",
          text: "When your order leaves our warehouse we email you the tracking number. You can also check its status in [Track order](/track-order) or in [My account](/account).",
        },
        {
          type: "paragraph",
          text: "An adult needs to receive and sign for the package. If nobody is home, the carrier will try again the next business day.",
        },
        { type: "heading", text: "Shipping issues" },
        {
          type: "list",
          items: [
            "Damaged package: don't refuse it; take photos and contact us within 48 hours of delivery.",
            "Delayed order: if it's two business days past the estimated date, contact us with your order number and we'll check with the carrier.",
            "Wrong address: let us know as soon as possible; we can fix it while the order hasn't left the warehouse.",
          ],
        },
        {
          type: "paragraph",
          text: "For any of these, email [soporte@nexora.store](mailto:soporte@nexora.store) or use the [contact form](/contact).",
        },
      ],
    },
  },
  {
    slug: "returns",
    title: { es: "Devoluciones y reembolsos", en: "Returns and refunds" },
    subtitle: {
      es: "30 días para cambiar de opinión, con recogida gratuita a domicilio.",
      en: "30 days to change your mind, with free pickup from your door.",
    },
    description: {
      es: "Política de devoluciones de Nexora: 30 días naturales, recogida gratuita y reembolso al método de pago original.",
      en: "Nexora's returns policy: 30 calendar days, free pickup and refunds to your original payment method.",
    },
    blocks: {
      es: [
        { type: "heading", text: "Plazo de devolución" },
        {
          type: "paragraph",
          text: "Tienes 30 días naturales desde que recibes tu pedido para devolver cualquier producto, sin necesidad de explicar el motivo. La recogida a domicilio es gratuita.",
        },
        { type: "heading", text: "Condiciones para devolver" },
        {
          type: "list",
          items: [
            "El producto está sin usar y en el mismo estado en que lo recibiste.",
            "Conserva su empaque original, manuales, accesorios y regalos promocionales.",
            "Incluyes el ticket o el número de pedido.",
          ],
        },
        { type: "heading", text: "Proceso de devolución" },
        {
          type: "steps",
          items: [
            {
              title: "Contacta a soporte",
              text: "Escríbenos desde el [formulario de contacto](/contact) o a soporte@nexora.store con tu número de pedido y el producto que quieres devolver.",
            },
            {
              title: "Recibe tu etiqueta",
              text: "En menos de 24 horas te enviamos por correo la etiqueta de envío prepagada y la fecha de recogida.",
            },
            {
              title: "Envía el producto",
              text: "Empaca el producto con todos sus accesorios, pega la etiqueta y entrégalo a la paquetería el día acordado.",
            },
            {
              title: "Recibe tu reembolso",
              text: "Revisamos el producto al llegar a nuestro almacén y te confirmamos el reembolso por correo.",
            },
          ],
        },
        { type: "heading", text: "Excepciones" },
        {
          type: "list",
          tone: "cross",
          items: [
            "Productos sellados por higiene o seguridad que se hayan abierto, como audífonos in-ear, software y tarjetas de regalo.",
            "Productos con daño por uso, golpes, líquidos o modificaciones.",
            "Productos a los que les falten piezas, accesorios o el empaque original.",
          ],
        },
        { type: "heading", text: "Reembolsos" },
        {
          type: "paragraph",
          text: "Una vez aprobada la devolución, reembolsamos el importe al mismo método de pago en un plazo de 5 a 10 días hábiles. El tiempo exacto en que se refleja depende de tu banco.",
        },
        {
          type: "paragraph",
          text: "Si pagaste contra entrega, te reembolsamos por transferencia bancaria a la cuenta que nos indiques.",
        },
        { type: "heading", text: "Cambios por defecto de fábrica" },
        {
          type: "paragraph",
          text: "Si tu producto llega con un defecto de fábrica, te lo cambiamos por uno nuevo igual sin costo durante los primeros 30 días. Si no hay existencias, puedes elegir otro producto o el reembolso completo.",
        },
        {
          type: "paragraph",
          text: "Pasado ese plazo, los defectos de fábrica se atienden con la [Garantía Nexora](/warranty).",
        },
      ],
      en: [
        { type: "heading", text: "Return window" },
        {
          type: "paragraph",
          text: "You have 30 calendar days from receiving your order to return any product, no questions asked. Pickup from your door is free.",
        },
        { type: "heading", text: "Return conditions" },
        {
          type: "list",
          items: [
            "The product is unused and in the same condition you received it.",
            "It keeps its original packaging, manuals, accessories and promotional gifts.",
            "You include the receipt or order number.",
          ],
        },
        { type: "heading", text: "How to return" },
        {
          type: "steps",
          items: [
            {
              title: "Contact support",
              text: "Reach us through the [contact form](/contact) or at soporte@nexora.store with your order number and the product you want to return.",
            },
            {
              title: "Get your label",
              text: "Within 24 hours we email you a prepaid shipping label and the pickup date.",
            },
            {
              title: "Send the product",
              text: "Pack the product with all its accessories, stick on the label and hand it to the carrier on the agreed day.",
            },
            {
              title: "Get your refund",
              text: "We inspect the product when it reaches our warehouse and confirm your refund by email.",
            },
          ],
        },
        { type: "heading", text: "Exceptions" },
        {
          type: "list",
          tone: "cross",
          items: [
            "Products sealed for hygiene or safety that have been opened, such as in-ear earbuds, software and gift cards.",
            "Products damaged by use, drops, liquids or modifications.",
            "Products missing parts, accessories or the original packaging.",
          ],
        },
        { type: "heading", text: "Refunds" },
        {
          type: "paragraph",
          text: "Once the return is approved, we refund the amount to the same payment method within 5 to 10 business days. Exactly when it shows up depends on your bank.",
        },
        {
          type: "paragraph",
          text: "If you paid cash on delivery, we refund you by bank transfer to the account you give us.",
        },
        { type: "heading", text: "Exchanges for manufacturing defects" },
        {
          type: "paragraph",
          text: "If your product arrives with a manufacturing defect, we'll replace it with an identical new one at no cost during the first 30 days. If it's out of stock, you can choose another product or a full refund.",
        },
        {
          type: "paragraph",
          text: "After that period, manufacturing defects are covered by the [Nexora Warranty](/warranty).",
        },
      ],
    },
  },
  {
    slug: "warranty",
    title: { es: "Garantía", en: "Warranty" },
    subtitle: {
      es: "Todos nuestros productos incluyen la garantía Nexora de 2 años.",
      en: "Every product includes the 2-year Nexora warranty.",
    },
    description: {
      es: "Garantía Nexora de 2 años: qué cubre, qué no cubre, cómo hacerla válida y garantía extendida.",
      en: "The 2-year Nexora warranty: what it covers, what it doesn't, how to claim it and extended coverage.",
    },
    blocks: {
      es: [
        { type: "heading", text: "Cobertura de garantía" },
        {
          type: "paragraph",
          text: "Todos los productos que vendemos incluyen la garantía Nexora de 2 años (24 meses) a partir de la fecha de entrega, adicional a los derechos que te da la ley.",
        },
        {
          type: "paragraph",
          text: "Durante ese tiempo reparamos o reemplazamos sin costo el producto que presente una falla cubierta, incluidos la mano de obra y el envío.",
        },
        { type: "heading", text: "Qué cubre" },
        {
          type: "list",
          tone: "check",
          items: [
            "Defectos de fabricación en materiales o ensamblaje.",
            "Fallas de hardware en uso normal: pantalla, batería, puertos, botones, altavoces y micrófonos.",
            "Baterías que retengan menos del 80% de su capacidad durante el primer año.",
            "Envío de ida y vuelta al centro de servicio.",
          ],
        },
        { type: "heading", text: "Qué NO cubre" },
        {
          type: "list",
          tone: "cross",
          items: [
            "Daño por uso inadecuado o distinto al indicado por el fabricante.",
            "Daño por líquidos, humedad o exposición a temperaturas extremas.",
            "Caídas, golpes, pantallas rotas y daño estético como rayones.",
            "Reparaciones o modificaciones hechas por terceros no autorizados.",
            "Desgaste normal de piezas como almohadillas, puntas de silicona o cables.",
          ],
        },
        { type: "heading", text: "Cómo hacer válida la garantía" },
        {
          type: "paragraph",
          text: "Contacta a soporte por el [formulario de contacto](/contact), a soporte@nexora.store o al +52 55 9876 5432 con tu número de pedido y una descripción de la falla (si puedes, agrega fotos o un video).",
        },
        {
          type: "paragraph",
          text: "Te enviamos una guía prepagada para recoger el producto. El diagnóstico tarda hasta 5 días hábiles y la reparación o el reemplazo, hasta 15 días hábiles. Si no podemos repararlo, te damos uno nuevo o el reembolso completo.",
        },
        { type: "heading", text: "Garantía extendida" },
        {
          type: "paragraph",
          text: "En laptops, smartphones, tablets y auriculares seleccionados puedes ampliar la cobertura a 36 meses con Nexora Care. Se contrata al comprar el producto o dentro de los 30 días siguientes, y además incluye un reemplazo por daño accidental.",
        },
      ],
      en: [
        { type: "heading", text: "Warranty coverage" },
        {
          type: "paragraph",
          text: "Every product we sell includes the Nexora 2-year (24-month) warranty from the delivery date, on top of your statutory rights.",
        },
        {
          type: "paragraph",
          text: "During that time we repair or replace, at no cost, any product with a covered fault, including labor and shipping.",
        },
        { type: "heading", text: "What it covers" },
        {
          type: "list",
          tone: "check",
          items: [
            "Manufacturing defects in materials or assembly.",
            "Hardware failures under normal use: screen, battery, ports, buttons, speakers and microphones.",
            "Batteries holding less than 80% of their capacity during the first year.",
            "Round-trip shipping to the service center.",
          ],
        },
        { type: "heading", text: "What it does NOT cover" },
        {
          type: "list",
          tone: "cross",
          items: [
            "Damage from misuse or use other than as the manufacturer intends.",
            "Damage from liquids, moisture or extreme temperatures.",
            "Drops, impacts, cracked screens and cosmetic damage such as scratches.",
            "Repairs or modifications by unauthorized third parties.",
            "Normal wear of parts such as ear cushions, silicone tips or cables.",
          ],
        },
        { type: "heading", text: "How to make a claim" },
        {
          type: "paragraph",
          text: "Contact support through the [contact form](/contact), at soporte@nexora.store or +52 55 9876 5432 with your order number and a description of the fault (photos or a video help).",
        },
        {
          type: "paragraph",
          text: "We'll send you a prepaid label to pick up the product. Diagnosis takes up to 5 business days and the repair or replacement up to 15 business days. If we can't repair it, we'll give you a new one or a full refund.",
        },
        { type: "heading", text: "Extended warranty" },
        {
          type: "paragraph",
          text: "On selected laptops, smartphones, tablets and headphones you can extend coverage to 36 months with Nexora Care. Add it when you buy the product or within 30 days, and it also includes one replacement for accidental damage.",
        },
      ],
    },
  },
  {
    slug: "about",
    title: { es: "Sobre nosotros", en: "About us" },
    subtitle: {
      es: "Tecnología que vale la pena, con atención de personas reales.",
      en: "Technology worth having, with support from real people.",
    },
    description: {
      es: "Conoce Nexora: nuestra historia, misión, valores y el equipo detrás de tu tienda de tecnología.",
      en: "Meet Nexora: our story, mission, values and the team behind your tech store.",
    },
    blocks: {
      es: [
        { type: "heading", text: "Nuestra historia" },
        {
          type: "paragraph",
          text: "Nexora nació en 2020 en la Ciudad de México, cuando un pequeño grupo de apasionados por la tecnología se cansó de comprar gadgets sin saber si de verdad valían la pena.",
        },
        {
          type: "paragraph",
          text: "Empezamos con una selección corta de audio y accesorios que probábamos nosotros mismos. Hoy enviamos laptops, smartphones, audio y dispositivos inteligentes a todo México, con el mismo criterio: solo vendemos lo que recomendaríamos a un amigo.",
        },
        { type: "heading", text: "Misión" },
        {
          type: "paragraph",
          text: "Hacer la tecnología accesible: precios justos, información clara para elegir bien y un servicio que te acompaña también después de la compra.",
        },
        { type: "heading", text: "Valores" },
        {
          type: "cards",
          items: [
            {
              icon: "quality",
              title: "Calidad",
              text: "Probamos cada producto antes de sumarlo al catálogo y lo respaldamos con 2 años de garantía.",
            },
            {
              icon: "service",
              title: "Servicio",
              text: "Personas reales te atienden por chat, correo o teléfono, antes y después de comprar.",
            },
            {
              icon: "innovation",
              title: "Innovación",
              text: "Buscamos lo último en tecnología y lo explicamos sin tecnicismos en nuestro blog.",
            },
            {
              icon: "trust",
              title: "Confianza",
              text: "Pagos seguros, precios transparentes y 30 días para devolver lo que no te convenza.",
            },
          ],
        },
        { type: "heading", text: "Equipo" },
        {
          type: "paragraph",
          text: "Somos un equipo de más de 50 personas apasionadas por la tecnología: especialistas de producto, atención al cliente, logística y desarrollo, que trabajan desde la Ciudad de México para que tu pedido llegue rápido y bien.",
        },
        {
          type: "paragraph",
          text: "¿Te gustaría sumarte? Escríbenos a través del [formulario de contacto](/contact) y cuéntanos qué te gustaría hacer en Nexora.",
        },
        { type: "heading", text: "Cifras clave" },
        {
          type: "stats",
          items: [
            { value: "+50,000", label: "clientes en todo México" },
            { value: "98%", label: "de satisfacción" },
            { value: "24 h", label: "de respuesta promedio" },
          ],
        },
      ],
      en: [
        { type: "heading", text: "Our story" },
        {
          type: "paragraph",
          text: "Nexora was born in 2020 in Mexico City, when a small group of tech enthusiasts got tired of buying gadgets without knowing whether they were really worth it.",
        },
        {
          type: "paragraph",
          text: "We started with a short selection of audio and accessories we tested ourselves. Today we ship laptops, smartphones, audio and smart devices across Mexico with the same rule: we only sell what we'd recommend to a friend.",
        },
        { type: "heading", text: "Mission" },
        {
          type: "paragraph",
          text: "Make technology accessible: fair prices, clear information to choose well and service that stays with you after the purchase.",
        },
        { type: "heading", text: "Values" },
        {
          type: "cards",
          items: [
            {
              icon: "quality",
              title: "Quality",
              text: "We test every product before adding it to the catalog and back it with a 2-year warranty.",
            },
            {
              icon: "service",
              title: "Service",
              text: "Real people help you by chat, email or phone, before and after you buy.",
            },
            {
              icon: "innovation",
              title: "Innovation",
              text: "We look for the latest tech and explain it without jargon on our blog.",
            },
            {
              icon: "trust",
              title: "Trust",
              text: "Secure payments, transparent prices and 30 days to return anything you're not happy with.",
            },
          ],
        },
        { type: "heading", text: "Team" },
        {
          type: "paragraph",
          text: "We're a team of more than 50 people passionate about technology: product specialists, customer care, logistics and engineering, working from Mexico City so your order arrives fast and in perfect shape.",
        },
        {
          type: "paragraph",
          text: "Want to join us? Reach out through the [contact form](/contact) and tell us what you'd like to do at Nexora.",
        },
        { type: "heading", text: "Key figures" },
        {
          type: "stats",
          items: [
            { value: "50,000+", label: "customers across Mexico" },
            { value: "98%", label: "satisfaction rate" },
            { value: "24 h", label: "average response time" },
          ],
        },
      ],
    },
  },
];
