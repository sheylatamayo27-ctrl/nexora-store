import type { FaqGroupRecord } from "./types";

/**
 * "Base de datos" simulada: preguntas frecuentes por categoría, para /faq. Las
 * respuestas aceptan enlaces `[texto](/ruta)` (ver `ContentBlock`).
 */
export const faqGroups: FaqGroupRecord[] = [
  {
    title: { es: "Pedidos y envíos", en: "Orders and shipping" },
    items: [
      {
        question: { es: "¿Cuánto tarda en llegar mi pedido?", en: "How long will my order take to arrive?" },
        answer: {
          es: "Depende del método que elijas al pagar: estándar en 3–5 días hábiles (gratis), exprés en 1–2 días hábiles y el mismo día en la Ciudad de México si pagas antes de las 2:00 PM. Consulta los detalles en [Información de envíos](/shipping).",
          en: "It depends on the method you choose at checkout: standard in 3–5 business days (free), express in 1–2 business days, and same-day in Mexico City if you pay before 2:00 PM. See [Shipping information](/shipping) for details.",
        },
      },
      {
        question: { es: "¿Cómo rastreo mi pedido?", en: "How do I track my order?" },
        answer: {
          es: "Cuando tu pedido sale del almacén te enviamos un correo con el número de guía. También puedes consultar su estado en [Rastrear pedido](/track-order) con tu número de pedido y tu correo.",
          en: "When your order leaves our warehouse we email you the tracking number. You can also check its status in [Track order](/track-order) with your order number and email.",
        },
      },
      {
        question: { es: "¿Hacen envíos a todo México?", en: "Do you ship anywhere in Mexico?" },
        answer: {
          es: "Sí, enviamos a toda la República. En algunas zonas rurales o de difícil acceso el plazo puede ampliarse uno o dos días; te lo indicamos al confirmar el pedido.",
          en: "Yes, we ship nationwide. In some rural or hard-to-reach areas delivery may take one or two extra days; we'll tell you when we confirm the order.",
        },
      },
      {
        question: { es: "¿Puedo cambiar la dirección de entrega?", en: "Can I change the delivery address?" },
        answer: {
          es: "Sí, mientras el pedido no haya salido del almacén. Escríbenos cuanto antes desde el [formulario de contacto](/contact) con tu número de pedido y la nueva dirección.",
          en: "Yes, as long as the order hasn't left the warehouse. Contact us as soon as possible through the [contact form](/contact) with your order number and the new address.",
        },
      },
    ],
  },
  {
    title: { es: "Pagos", en: "Payments" },
    items: [
      {
        question: { es: "¿Qué métodos de pago aceptan?", en: "Which payment methods do you accept?" },
        answer: {
          es: "Tarjetas de crédito y débito (Visa, Mastercard y American Express), billeteras digitales, transferencia bancaria y pago contra entrega, que tiene un cargo adicional de Rs. 49.",
          en: "Credit and debit cards (Visa, Mastercard and American Express), digital wallets, bank transfer and cash on delivery, which has an extra Rs. 49 fee.",
        },
      },
      {
        question: { es: "¿Es seguro pagar con tarjeta en Nexora?", en: "Is it safe to pay by card at Nexora?" },
        answer: {
          es: "Sí. Los pagos se procesan con cifrado SSL de 256 bits a través de un proveedor certificado, y nunca guardamos los datos completos de tu tarjeta.",
          en: "Yes. Payments are processed with 256-bit SSL encryption through a certified provider, and we never store your full card details.",
        },
      },
      {
        question: { es: "¿Puedo pedir factura?", en: "Can I get an invoice?" },
        answer: {
          es: "Sí. Desde [Mi cuenta](/account) puedes descargar la factura de cada pedido en los 30 días siguientes a la compra.",
          en: "Yes. From [My account](/account) you can download the invoice for each order within 30 days of purchase.",
        },
      },
    ],
  },
  {
    title: { es: "Devoluciones y garantía", en: "Returns and warranty" },
    items: [
      {
        question: { es: "¿Cuánto tiempo tengo para devolver un producto?", en: "How long do I have to return a product?" },
        answer: {
          es: "30 días naturales desde la entrega, con recogida gratuita a domicilio. El producto debe estar sin usar y con su empaque original. Más detalles en [Devoluciones y reembolsos](/returns).",
          en: "30 calendar days from delivery, with free pickup from your door. The product must be unused and in its original packaging. More details in [Returns and refunds](/returns).",
        },
      },
      {
        question: { es: "¿Cuándo recibo mi reembolso?", en: "When will I get my refund?" },
        answer: {
          es: "En 5 a 10 días hábiles después de aprobar la devolución, en el mismo método de pago que usaste. Si pagaste contra entrega, te lo enviamos por transferencia bancaria.",
          en: "Within 5 to 10 business days after the return is approved, to the same payment method you used. If you paid cash on delivery, we send it by bank transfer.",
        },
      },
      {
        question: { es: "¿Qué cubre la garantía?", en: "What does the warranty cover?" },
        answer: {
          es: "Todos los productos tienen 2 años de garantía Nexora contra defectos de fabricación y fallas de hardware en uso normal. No cubre daños por golpes, líquidos o mal uso. Consulta la [Garantía](/warranty).",
          en: "Every product has a 2-year Nexora warranty against manufacturing defects and hardware failures under normal use. It doesn't cover drops, liquids or misuse. See the [Warranty](/warranty).",
        },
      },
    ],
  },
  {
    title: { es: "Cuenta y seguridad", en: "Account and security" },
    items: [
      {
        question: { es: "¿Necesito una cuenta para comprar?", en: "Do I need an account to buy?" },
        answer: {
          es: "No es obligatoria, pero con una [cuenta](/register) guardas tus direcciones, sigues tus pedidos y recibes beneficios de miembro como el envío gratis en tu primer pedido.",
          en: "It's not required, but with an [account](/register) you save your addresses, track your orders and get member perks such as free shipping on your first order.",
        },
      },
      {
        question: { es: "Olvidé mi contraseña, ¿qué hago?", en: "I forgot my password. What should I do?" },
        answer: {
          es: "Entra en [Recuperar contraseña](/forgot-password), escribe el correo de tu cuenta y te enviaremos un enlace para crear una nueva.",
          en: "Go to [Reset password](/forgot-password), enter your account email and we'll send you a link to create a new one.",
        },
      },
      {
        question: { es: "¿Cómo protegen mis datos personales?", en: "How do you protect my personal data?" },
        answer: {
          es: "Usamos cifrado, accesos restringidos y no vendemos tus datos a terceros. Puedes consultar, corregir o eliminar tu información cuando quieras; te lo explicamos en la [Política de privacidad](/privacy).",
          en: "We use encryption and restricted access, and we never sell your data. You can view, correct or delete your information at any time; see our [Privacy policy](/privacy).",
        },
      },
    ],
  },
];
