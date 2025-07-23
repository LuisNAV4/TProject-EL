
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import ProductGrid from "../components/ProductGrid";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import { ProductAPI } from "../services/api";
import { Product } from "../components/ProductCard";
import { WhatsAppFloat } from "@/components/ui/whatsapp";
import { usarCarrito } from "../contexts/CartContext";
import { productNameToSlug } from "../utils/urlUtils";

const Index = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const {
    articulosCarrito,
    agregarAlCarrito,
    actualizarCantidad,
    eliminarArticulo,
    contadorArticulosCarrito,
    carritoAbierto,
    establecerCarritoAbierto,
  } = usarCarrito();

  // Load products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productosData = await ProductAPI.getProducts();
        setProductos(productosData);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const manejarClicProducto = (producto: Product) => {
    const slug = productNameToSlug(producto.name);
    navigate(`/product/${slug}`);
  };

  // Featured products (first 4 from loaded products)
  const productosDestacados = productos.slice(0, 4);
  const masProductos = productos.slice(4);

  return (
    <div className="min-h-screen bg-color-primary">
      <Header
        cartItemCount={contadorArticulosCarrito}
        onCartClick={() => establecerCarritoAbierto(true)}
      />
      <WhatsAppFloat />
      <HeroSection />

      {!loading && productosDestacados.length > 0 && (
        <ProductGrid
          products={productosDestacados}
          onAddToCart={agregarAlCarrito}
          onProductClick={manejarClicProducto}
          title="Productos Destacados"
        />
      )}
      
      <CategorySection />

      {!loading && masProductos.length > 0 && (
        <div>
          <ProductGrid
            products={masProductos}
            onAddToCart={agregarAlCarrito}
            onProductClick={manejarClicProducto}
            title="Más Productos"
          />
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Cargando productos...</p>
        </div>
      )}
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

