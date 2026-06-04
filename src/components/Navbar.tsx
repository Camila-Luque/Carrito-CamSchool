"use client";

import Link from "next/link";
import { useCart } from "./CartContext";
import { totalQuantity } from "@/lib/cart";

export function Navbar() {
	const { cart } = useCart();
	const quantity = totalQuantity(cart);

	return (
		<nav className="navbar">
			<Link href="/" className="brand">
				<span className="brand-mark">✎</span>
				<span className="brand-name">
					Cam<span className="brand-accent">School</span>
				</span>
				<span className="brand-tag">Útiles escolares</span>
			</Link>

			<Link href="/cart" className="cart-link" aria-label="Ver carrito">
				<span className="cart-icon">🛒</span>
				<span className="cart-text">Carrito</span>
				{quantity > 0 && <span className="cart-count">{quantity}</span>}
			</Link>
		</nav>
	);
}
