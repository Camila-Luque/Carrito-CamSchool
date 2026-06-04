/**
 * Lógica del carrito — POC Mutation Testing.
 * Funciones PURAS, sin UI ni estado global, para que StrykerJS las mute
 * y Vitest las pruebe de forma aislada.
 */

export interface Product {
	id: number;
	name: string;
	category: string;
	price: number;
	imgUrl: string;
}

export interface CartItem extends Product {
	quantity: number;
}

export interface CartSummary {
	subtotal: number;
	descuento: number;
	igv: number;
	total: number;
}

/** Tasa del IGV en Perú (18%). */
export const IGV_RATE = 0.18;

/** Porcentaje de descuento (10%). */
export const DISCOUNT_RATE = 0.1;

/** Subtotal mínimo para aplicar descuento. */
export const DISCOUNT_THRESHOLD = 50;

/**
 * Redondea a 2 decimales. Evita el error de punto flotante con dinero.
 * Ej: 2835 * 0.18 = 510.29999999999995  ->  510.3
 */
export function round2(value: number): number {
	return Math.round(value * 100) / 100;
}

/** Suma de (precio * cantidad) de todos los productos. */
export function calcSubtotal(items: CartItem[]): number {
	const total = items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);
	return round2(total);
}

/** Descuento del 10% si el subtotal alcanza el umbral; si no, 0. */
export function calcDescuento(subtotal: number): number {
	if (subtotal >= DISCOUNT_THRESHOLD) {
		return round2(subtotal * DISCOUNT_RATE);
	}
	return 0;
}

/** IGV (18%) calculado sobre el subtotal MENOS el descuento. */
export function calcIGV(subtotal: number, descuento: number): number {
	const base = subtotal - descuento;
	return round2(base * IGV_RATE);
}

/** Total a pagar: (subtotal - descuento) + IGV. */
export function calcTotal(
	subtotal: number,
	descuento: number,
	igv: number
): number {
	return round2(subtotal - descuento + igv);
}

/** Cantidad total de unidades en el carrito. */
export function totalQuantity(items: CartItem[]): number {
	return items.reduce((acc, item) => acc + item.quantity, 0);
}

/** Calcula todo el resumen del carrito de una vez. */
export function calcResumen(items: CartItem[]): CartSummary {
	const subtotal = calcSubtotal(items);
	const descuento = calcDescuento(subtotal);
	const igv = calcIGV(subtotal, descuento);
	const total = calcTotal(subtotal, descuento, igv);
	return { subtotal, descuento, igv, total };
}
