// API Service para obtener datos de productos
import { Product } from '../components/ProductCard';
import { sampleProducts } from '../data/products';

// Por ahora usamos datos locales, pero esta estructura permite fácil migración a API externa
export class ProductAPI {
   private static baseUrl = import.meta.env.VITE_API_URL || '';

  // Obtener todos los productos
  static async getProducts(): Promise<Product[]> {
    try {
      // TODO: Reemplazar con llamada real a API externa
      //  const response = await fetch(`${this.baseUrl}/api/productos`);
      //  return response.json();
      
      // Por ahora retornamos datos de muestra
      return Promise.resolve(sampleProducts);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      return sampleProducts; // Fallback a datos locales
    }
  }

  // Obtener producto por slug
  static async getProductBySlug(slug: string): Promise<Product | undefined> {
    try {
      // TODO: Reemplazar con llamada real a API externa
      // const response = await fetch(`${this.baseUrl}/api/products/${slug}`);
      // return response.json();
      
      const products = await this.getProducts();
      return products.find(product => 
        this.nombreToSlug(product.nombre) === slug
      );
    } catch (error) {
      console.error('Error al obtener producto por slug:', error);
      return undefined;
    }
  }

  // Obtener categorías disponibles
  static async getCategories(): Promise<string[]> {
    try {
      // TODO: Reemplazar con llamada real a API externa
      // const response = await fetch(`${this.baseUrl}/api/categorias`);
      // return response.json();
      
      const products = await this.getProducts();
      const categories = [...new Set(products.map(p => p.categoria_id))].filter(Boolean);
      return categories;
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      return [];
    }
  }

  // Filtrar productos
  static async getFilteredProducts(filters: {
    search?: string;
    categories?: string[];
    precioRange?: [number, number];
    onSale?: boolean;
    en_stock?: boolean;
    sortBy?: 'nombre' | 'precio' | 'calificacion';
    sortOrder?: 'asc' | 'desc';
  }): Promise<Product[]> {
    try {
      const products = await this.getProducts();
      
      return products.filter(product => {
        // Filtro de búsqueda
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          const matchesSearch = 
            product.nombre.toLowerCase().includes(searchTerm) ||
            product.descripcion.toLowerCase().includes(searchTerm) ||
            product.categoria_id.toLowerCase().includes(searchTerm);
          if (!matchesSearch) return false;
        }

        // Filtro de categorías
        if (filters.categories && filters.categories.length > 0) {
          if (!filters.categories.includes(product.categoria_id)) return false;
        }

        // Filtro de rango de precio
        if (filters.precioRange) {
          const [min, max] = filters.precioRange;
          if (product.precio < min || product.precio > max) return false;
        }

        // Filtro de ofertas
        if (filters.onSale) {
          if (!product.precio_original) return false;
        }

        // Filtro de stock
        if (filters.en_stock !== undefined) {
          if (product.en_stock !== filters.en_stock) return false;
        }

        return true;
      }).sort((a, b) => {
        if (!filters.sortBy) return 0;
        
        let aValue, bValue;
        switch (filters.sortBy) {
          case 'nombre':
            aValue = a.nombre.toLowerCase();
            bValue = b.nombre.toLowerCase();
            break;
          case 'precio':
            aValue = a.precio;
            bValue = b.precio;
            break;
          case 'calificacion':
            aValue = a.calificacion || 0;
            bValue = b.calificacion || 0;
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return filters.sortOrder === 'desc' ? 1 : -1;
        if (aValue > bValue) return filters.sortOrder === 'desc' ? -1 : 1;
        return 0;
      });
    } catch (error) {
      console.error('Error al filtrar productos:', error);
      return [];
    }
  }

  // Utilidad para convertir nombre a slug
  private static nombreToSlug(nombre: string): string {
    return nombre
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  }
}