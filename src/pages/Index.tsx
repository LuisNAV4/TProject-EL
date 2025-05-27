
import React, { useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import ServicesSection from '../components/ServicesSection';
import ProductGrid from '../components/ProductGrid';
import Cart from '../components/Cart';
import Footer from '../components/Footer';
import { sampleProducts } from '../data/products';
import { Product } from '../components/ProductCard';

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Featured products (first 4 from sample)
  const featuredProducts = sampleProducts.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <HeroSection />
      
      <ServicesSection />
      
      <CategorySection />
      
      <ProductGrid
        products={featuredProducts}
        onAddToCart={handleAddToCart}
        title="Productos Tecnológicos Destacados"
      />
      
      <div className="bg-gray-50">
        <ProductGrid
          products={sampleProducts.slice(4)}
          onAddToCart={handleAddToCart}
          title="Más Productos para tu PyME"
        />
      </div>
      
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
      
      <Footer />
    </div>
  );
};

export default Index;
