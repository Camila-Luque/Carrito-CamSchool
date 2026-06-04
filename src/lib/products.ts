import type { Product } from "./cart";

export const products: Product[] = [
	{
		id: 1,
		name: "Lapicero Pilot BP-S Rosa",
		category: "Escritura",
		price: 2.5,
		imgUrl: "/images/lapicero-rosa.png",
	},
	{
		id: 2,
		name: "Lapicero Pilot BP-S Azul",
		category: "Escritura",
		price: 2.5,
		imgUrl: "/images/lapicero-azul.jpg",
	},
	{
		id: 3,
		name: "Portaminas Pilot Super Grip 0.5",
		category: "Escritura",
		price: 8.9,
		imgUrl: "/images/portaminas.png",
	},
	{
		id: 4,
		name: "Cuaderno Minerva A5 Cuadriculado Tapa Dura 150h",
		category: "Cuadernos",
		price: 13.5,
		imgUrl: "/images/cuaderno-verde.png",
	},
	{
		id: 5,
		name: "Cuaderno Minerva Dream A5 150h",
		category: "Cuadernos",
		price: 16.9,
		imgUrl: "/images/cuaderno-dream.png",
	},
];
