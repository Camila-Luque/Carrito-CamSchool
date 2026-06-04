/**
 * Lógica del carrito — POC Mutation Testing.
 * Funciones PURAS, sin UI ni estado global.
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

export interface CartItemWithStock extends CartItem {
	stock: number;
}

export interface CartSummary {
	subtotal: number;
	descuento: number;
	igv: number;
	total: number;
}

export const IGV_RATE = 0.18;
export const DISCOUNT_RATE = 0.1;
export const DISCOUNT_THRESHOLD = 50;

export function round2(value: number): number {
	return Math.round(value * 100) / 100;
}

export function calcSubtotal(items: CartItem[]): number {
	const total = items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);
	return round2(total);
}

export function calcDescuento(subtotal: number): number {
	if (subtotal >= DISCOUNT_THRESHOLD) {
		return round2(subtotal * DISCOUNT_RATE);
	}
	return 0;
}

export function calcIGV(subtotal: number, descuento: number): number {
	const base = subtotal - descuento;
	return round2(base * IGV_RATE);
}

export function calcTotal(
	subtotal: number,
	descuento: number,
	igv: number
): number {
	return round2(subtotal - descuento + igv);
}

export function totalQuantity(items: CartItem[]): number {
	return items.reduce((acc, item) => acc + item.quantity, 0);
}

export function calcResumen(items: CartItem[]): CartSummary {
	const subtotal = calcSubtotal(items);
	const descuento = calcDescuento(subtotal);
	const igv = calcIGV(subtotal, descuento);
	const total = calcTotal(subtotal, descuento, igv);
	return { subtotal, descuento, igv, total };
}

/** true si hay stock suficiente para la cantidad pedida. */
export function haveStock(item: CartItemWithStock, cantidad: number): boolean {
	return cantidad <= item.stock;
}

/** Devuelve el item con el stock descontado (no muta el original). */
export function descontarStock(
	item: CartItemWithStock,
	cantidad: number
): CartItemWithStock {
	return { ...item, stock: item.stock - cantidad };
}