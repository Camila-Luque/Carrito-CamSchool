"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { CartItem, Product } from "@/lib/cart";

interface CartContextValue {
	cart: CartItem[];
	addToCart: (product: Product) => void;
	changeQty: (id: number, delta: number) => void;
	removeAll: (id: number) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
	const [cart, setCart] = useState<CartItem[]>([]);

	// Si ya existe, suma 1 a la cantidad; si no, lo agrega con cantidad 1
	const addToCart = (product: Product) => {
		setCart((items) => {
			const found = items.find((item) => item.id === product.id);
			if (found) {
				return items.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			}
			return [...items, { ...product, quantity: 1 }];
		});
	};

	// Suma o resta cantidad; si llega a 0, elimina el producto
	const changeQty = (id: number, delta: number) => {
		setCart((items) =>
			items
				.map((item) =>
					item.id === id
						? { ...item, quantity: item.quantity + delta }
						: item
				)
				.filter((item) => item.quantity > 0)
		);
	};

	const removeAll = (id: number) => {
		setCart((items) => items.filter((item) => item.id !== id));
	};

	return (
		<CartContext.Provider value={{ cart, addToCart, changeQty, removeAll }}>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const ctx = useContext(CartContext);
	if (!ctx) {
		throw new Error("useCart debe usarse dentro de <CartProvider>");
	}
	return ctx;
}
