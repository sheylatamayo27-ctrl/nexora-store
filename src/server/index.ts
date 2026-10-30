/**
 * Fuente de datos de la tienda: el ÚNICO lugar que sabe de dónde salen los datos.
 * Todas las funciones son async; hoy leen del catálogo local (`./db`) y mañana
 * harán fetch al backend real (`./config`) sin que cambie quien las llama.
 */
export * from "./products";
export * from "./categories";
export * from "./blog";
export * from "./hero";
export * from "./search";
export type * from "./api-types";
