
import { sampleProducts } from '../data/products';

// Convierte un nombre de producto a un slug URL-friendly
export const productNameToSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remueve caracteres especiales
    .replace(/\s+/g, '-') // Reemplaza espacios con guiones
    .trim();
};

// Convierte un slug de vuelta al nombre original del producto
export const slugToProductName = (slug: string): string => {
  return slug
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Encuentra un producto por su slug
export const findProductBySlug = (slug: string) => {
  return sampleProducts.find(product => 
    productNameToSlug(product.name) === slug
  );
};

// Encuentra un producto por ID (para compatibilidad)
export const findProductById = (id: number) => {
  return sampleProducts.find(product => product.id === id);
};
