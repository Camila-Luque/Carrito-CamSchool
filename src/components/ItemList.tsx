import { products } from "@/lib/products";
import { Item } from "./Item";

export function ItemList() {
	return (
		<section>
			<header className="list-header">
				<h1>
					Vuelta a clases con <span className="hl">CamSchool</span>
				</h1>
				<p>Todo lo que necesitas para empezar el año, en un solo lugar.</p>
			</header>

			<div className="items-list">
				{products.map((product) => (
					<Item key={product.id} product={product} />
				))}
			</div>
		</section>
	);
}
