
import React from 'react';
import ProductCard, { Product } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick?: (product: Product) => void;
  title?: string;
}

const ProductGrid = ({ products, onAddToCart, onProductClick, title }: ProductGridProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
