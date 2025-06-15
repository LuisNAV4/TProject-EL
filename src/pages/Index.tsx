
import React from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import ProductGrid from "../components/ProductGrid";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import { sampleProducts } from "../data/products";
import { Product } from "../components/ProductCard";
import { WhatsAppFloat } from "@/components/ui/whatsapp";
import { usarCarrito } from "../contexts/CartContext";
import { productNameToSlug } from "../utils/urlUtils";

const Index = () => {
  const navigate = useNavigate();
  const {
    articulosCarrito,
    agregarAlCarrito,
    actualizarCantidad,
    eliminarArticulo,
    contadorArticulosCarrito,
    carritoAbierto,
    establecerCarritoAbierto,
  } = usarCarrito();

  const manejarClicProducto = (producto: Product) => {
    const slug = productNameToSlug(producto.name);
    navigate(`/product/${slug}`);
  };

  // Featured products (first 4 from sample)
  const productosDestacados = sampleProducts.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <Header
        cartItemCount={contadorArticulosCarrito}
        onCartClick={() => establecerCarritoAbierto(true)}
      />
      <WhatsAppFloat />
      <HeroSection />

      <ProductGrid
        products={productosDestacados}
        onAddToCart={agregarAlCarrito}
        onProductClick={manejarClicProducto}
        title="Productos Destacados"
      />
      <CategorySection />

      <div className="bg-gray-50">
        <ProductGrid
          products={sampleProducts.slice(4)}
          onAddToCart={agregarAlCarrito}
          onProductClick={manejarClicProducto}
          title="Más Productos"
        />
      </div>
      <Cart
        estaAbierto={carritoAbierto}
        alCerrar={() => establecerCarritoAbierto(false)}
        articulos={articulosCarrito}
        alActualizarCantidad={actualizarCantidad}
        alEliminarArticulo={eliminarArticulo}
      />

      <Footer />
    </div>
  );
};

export default Index;

