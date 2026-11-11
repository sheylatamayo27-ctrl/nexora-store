/**
 * "Base de datos" simulada: pedidos de ejemplo del usuario, para /account
 * (los sirve `getOrders` de src/services/orders.ts).
 *
 * Los textos (fechas, resumen, productos, colores) son claves de "orders.demo"
 * en los mensajes de next-intl, así se ven en el idioma actual; dirección y
 * medio de pago son datos del cliente y no se traducen. Un backend real
 * devolvería esos textos ya listos.
 */

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export type DemoOrder = "o1" | "o2" | "o3" | "o4";
export type DemoProduct = "auraAnc" | "podsLite" | "soundGo" | "myBook" | "powerBank" | "keyPop" | "openEar" | "projector";
export type DemoColor = "midnightBlack" | "white" | "spaceGray";

export interface OrderItem {
  name: DemoProduct;
  image: string;
  qty: number;
  price: number;
  color?: DemoColor;
}

export interface Order {
  id: string;
  demo: DemoOrder;
  status: OrderStatus;
  items: OrderItem[];
  shipping: number;
  address: string;
  payment: string;
  cta: "trackOrder" | "buyAgain";
}

export type OrderStatKey = "statTotal" | "statInTransit" | "statDelivered" | "statWishlist";

/** Cifras del resumen de /account. `key`: su etiqueta en "orders". */
export const orderStats: { key: OrderStatKey; value: string }[] = [
  { key: "statTotal", value: "12" },
  { key: "statInTransit", value: "2" },
  { key: "statDelivered", value: "9" },
  { key: "statWishlist", value: "8" },
];

export const orders: Order[] = [
  {
    id: "#NX-482913",
    demo: "o1",
    status: "processing",
    items: [
      { name: "auraAnc", image: "headphones", qty: 1, price: 59.99, color: "midnightBlack" },
      { name: "podsLite", image: "earbuds", qty: 2, price: 15.99, color: "white" },
      { name: "soundGo", image: "speaker", qty: 1, price: 41.99 },
    ],
    shipping: 0,
    address: "Parque Tecnológico 221B, CDMX, 01090",
    payment: "VISA ·· 4821",
    cta: "trackOrder",
  },
  {
    id: "#NX-479201",
    demo: "o2",
    status: "shipped",
    items: [{ name: "myBook", image: "laptop", qty: 1, price: 1035.99, color: "spaceGray" }],
    shipping: 0,
    address: "Parque Tecnológico 221B, CDMX, 01090",
    payment: "Mastercard ·· 7390",
    cta: "trackOrder",
  },
  {
    id: "#NX-471188",
    demo: "o3",
    status: "delivered",
    items: [
      { name: "powerBank", image: "powerbank", qty: 1, price: 17.99 },
      { name: "keyPop", image: "keyboard", qty: 1, price: 35.99 },
      { name: "openEar", image: "openear", qty: 1, price: 21.99 },
    ],
    shipping: 0,
    address: "Av. Reforma 88, CDMX, 06600",
    payment: "PayPal · sheyla@nexora.store",
    cta: "buyAgain",
  },
  {
    id: "#NX-462034",
    demo: "o4",
    status: "cancelled",
    items: [{ name: "projector", image: "projector", qty: 1, price: 229.99 }],
    shipping: 0,
    address: "Parque Tecnológico 221B, CDMX, 01090",
    payment: "VISA ·· 4821",
    cta: "buyAgain",
  },
];
