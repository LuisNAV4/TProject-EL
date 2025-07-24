
import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Product {
  id: number;
  nombre: string;
  precio: number;
  precio_original?: number | null;
  imagen_url: string;
  calificacion: number;
  categoria_id?: string | null;
  descripcion?: string;
  en_stock: boolean;
  cantidad_stock: number;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart, onProductClick }: ProductCardProps) => {
  const discount = product.precio_original 
    ? Math.round(((product.precio_original - product.precio) / product.precio_original) * 100)
    : 0;

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se active el click del card
    onAddToCart(product);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
<div className="relative">
  <img
    src={product.imagen_url}
    alt={product.nombre}
    className="w-full h-48 object-cover"
  />
  {discount > 0 && (
    <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
      -{discount}%
    </span>
  )}
  {!product.en_stock && ( // Corrige aquí: asegúrate de que la condición esté dentro de las llaves
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <span className="text-white font-semibold">Agotado</span>
    </div>
  )}
</div>
      
      <div className="p-4">
        <span className="text-sm text-blue-600 font-medium">{product.categoria_id}</span>
        <h3 className="font-semibold text-lg mt-1 mb-2 line-clamp-2">{product.nombre}</h3>
        
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.calificacion)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-2">({product.calificacion})</span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.descripcion}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">
              REF: {product.precio.toLocaleString()}
            </span>
            {product.precio_original && (
              <span className="text-sm text-gray-500 line-through">
                REF: {product.precio_original.toLocaleString()}
              </span>
            )}
          </div>
          
          <Button
            onClick={handleAddToCart}
            disabled={!product.en_stock}
            className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:from-[var(--color-primary)] hover:to-[var(--color-secondary)] hover:brightness-110 text-white"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Agregar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
