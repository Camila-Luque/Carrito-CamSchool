import { describe, it, expect } from "vitest";
import {
	calcSubtotal,
	calcDescuento,
	calcIGV,
	calcTotal,
	calcResumen,
	totalQuantity,
	round2,
	type CartItem,
} from "./cart";

const item = (price: number, quantity: number): CartItem => ({
	id: 1,
	name: "x",
	category: "x",
	imgUrl: "",
	price,
	quantity,
});

describe("round2", () => {
	it("redondea a 2 decimales y corrige el error de punto flotante", () => {
		expect(round2(2835 * 0.18)).toBe(510.3);
	});
});

describe("calcSubtotal", () => {
	it("suma precio * cantidad de cada producto", () => {
		const items = [item(2.5, 2), item(13.5, 1)];
		expect(calcSubtotal(items)).toBe(18.5);
	});

	it("devuelve 0 con el carrito vacío", () => {
		expect(calcSubtotal([])).toBe(0);
	});
});

describe("calcDescuento", () => {
	it("NO aplica descuento justo debajo del umbral (mata <= vs <)", () => {
		expect(calcDescuento(49.99)).toBe(0);
	});

	it("aplica 10% exactamente en el umbral (mata > vs >=)", () => {
		expect(calcDescuento(50)).toBe(5);
	});
});

describe("calcIGV", () => {
	it("calcula 18% sobre (subtotal - descuento)", () => {
		expect(calcIGV(100, 10)).toBe(16.2);
	});
});

describe("calcTotal", () => {
	it("suma subtotal - descuento + igv", () => {
		expect(calcTotal(100, 10, 16.2)).toBe(106.2);
	});
});

describe("totalQuantity", () => {
	it("suma todas las cantidades", () => {
		expect(totalQuantity([item(2.5, 2), item(13.5, 3)])).toBe(5);
	});
});

describe("calcResumen", () => {
	it("arma el resumen completo", () => {
		const items = [item(50, 1)];
		expect(calcResumen(items)).toEqual({
			subtotal: 50,
			descuento: 5,
			igv: 8.1,
			total: 53.1,
		});
	});
});
