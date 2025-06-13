
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
import { useCart } from "../contexts/CartContext";
import { productNameToSlug } from "../utils/urlUtils";

const Index = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    cartItemCount,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const handleProductClick = (product: Product) => {
    const slug = productNameToSlug(product.name);
    navigate(`/product/${slug}`);
  };

  // Featured products (first 4 from sample)
  const featuredProducts = sampleProducts.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      <WhatsAppFloat />
      <HeroSection />

      <ProductGrid
        products={featuredProducts}
        onAddToCart={addToCart}
        onProductClick={handleProductClick}
        title="Productos Destacados"
      />
      <CategorySection />

      <div className="bg-gray-50">
        <ProductGrid
          products={sampleProducts.slice(4)}
          onAddToCart={addToCart}
          onProductClick={handleProductClick}
          title="Más Productos"
        />
      </div>
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />

      <Footer />
    </div>
  );
};

export default Index;
