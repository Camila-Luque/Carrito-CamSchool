"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { calcResumen, totalQuantity } from "@/lib/cart";

export default function CartPage() {
	const { cart, changeQty, removeAll } = useCart();

	if (cart.length === 0) {
		return (
			<section className="cart-empty">
				<div className="cart-empty-emoji">🎒</div>
				<h2>Tu carrito está vacío</h2>
				<p>Agrega algunos útiles para empezar.</p>
				<Link href="/" className="btn btn-add">
					Ver productos
				</Link>
			</section>
		);
	}

	const { subtotal, descuento, igv, total } = calcResumen(cart);

	return (
		<section className="cart">
			<h1 className="cart-title">Tu carrito</h1>

			<div className="cart-list">
				{cart.map((item) => (
					<div className="cart-row" key={item.id}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={item.imgUrl} alt={item.name} className="cart-thumb" />
						<div className="cart-info">
							<span className="cart-name">{item.name}</span>
							<span className="cart-unit">S/ {item.price.toFixed(2)} c/u</span>
						</div>
						<div className="stepper">
							<button className="step" onClick={() => changeQty(item.id, -1)}>
								−
							</button>
							<span className="step-count">{item.quantity}</span>
							<button className="step" onClick={() => changeQty(item.id, 1)}>
								+
							</button>
						</div>
						<span className="cart-line">
							S/ {(item.price * item.quantity).toFixed(2)}
						</span>
						<button
							className="cart-del"
							onClick={() => removeAll(item.id)}
							aria-label="Eliminar producto"
						>
							✕
						</button>
					</div>
				))}
			</div>

			<div className="cart-summary">
				<div className="cart-summary-row">
					<span>Productos</span>
					<span>{totalQuantity(cart)}</span>
				</div>
				<div className="cart-summary-row">
					<span>Subtotal</span>
					<span>S/ {subtotal.toFixed(2)}</span>
				</div>
				<div className="cart-summary-row">
					<span>Descuento</span>
					<span>− S/ {descuento.toFixed(2)}</span>
				</div>
				<div className="cart-summary-row">
					<span>IGV (18%)</span>
					<span>S/ {igv.toFixed(2)}</span>
				</div>
				<div className="cart-summary-row total">
					<span>Total</span>
					<span>S/ {total.toFixed(2)}</span>
				</div>
				<button className="btn btn-checkout">Pagar</button>
			</div>
		</section>
	);
}
