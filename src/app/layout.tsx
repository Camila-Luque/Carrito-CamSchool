import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
	title: "CamSchool — Útiles escolares",
	description: "Carrito de compras de útiles escolares.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es">
			<body>
				<CartProvider>
					<Navbar />
					<main className="page">{children}</main>
				</CartProvider>
			</body>
		</html>
	);
}
