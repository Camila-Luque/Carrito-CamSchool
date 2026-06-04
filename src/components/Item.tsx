"use client";

import { useCart } from "./CartContext";
import type { Product } from "@/lib/cart";

export function Item({ product }: { product: Product }) {
	const { cart, addToCart, changeQty } = useCart();
	const quantity = cart.find((item) => item.id === product.id)?.quantity ?? 0;

	return (
		<article className={`item-box ${quantity > 0 ? "in-cart" : ""}`}>
			{quantity > 0 && <div className="item-quantity">{quantity}</div>}

			<span className="item-category">{product.category}</span>

			<div className="item-img-wrap">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={product.imgUrl} alt={product.name} className="item-img" />
			</div>

			<h3 className="item-name">{product.name}</h3>
			<div className="item-price">S/ {product.price.toFixed(2)}</div>

			<div className="item-actions">
				{quantity === 0 ? (
					<button className="btn btn-add" onClick={() => addToCart(product)}>
						Añadir al carrito
					</button>
				) : (
					<div className="stepper">
						<button
							className="step"
							onClick={() => changeQty(product.id, -1)}
							aria-label="Quitar uno"
						>
							−
						</button>
						<span className="step-count">{quantity}</span>
						<button
							className="step"
							onClick={() => changeQty(product.id, 1)}
							aria-label="Agregar uno"
						>
							+
						</button>
					</div>
				)}
			</div>
		</article>
	);
}
