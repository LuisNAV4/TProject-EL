// API Service para obtener datos de productos
import { Product } from '../components/ProductCard';
import { sampleProducts } from '../data/products';

// Por ahora usamos datos locales, pero esta estructura permite fácil migración a API externa
export class ProductAPI {
  private static baseUrl = process.env.VITE_API_URL || '';

  // Obtener todos los productos
  static async getProducts(): Promise<Product[]> {
    try {
      // TODO: Reemplazar con llamada real a API externa
      // const response = await fetch(`${this.baseUrl}/api/products`);
      // return response.json();
      
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
        this.nameToSlug(product.name) === slug
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
      // const response = await fetch(`${this.baseUrl}/api/categories`);
      // return response.json();
      
      const products = await this.getProducts();
      const categories = [...new Set(products.map(p => p.category))];
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
    priceRange?: [number, number];
    onSale?: boolean;
    inStock?: boolean;
    sortBy?: 'name' | 'price' | 'rating';
    sortOrder?: 'asc' | 'desc';
  }): Promise<Product[]> {
    try {
      const products = await this.getProducts();
      
      return products.filter(product => {
        // Filtro de búsqueda
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          const matchesSearch = 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm);
          if (!matchesSearch) return false;
        }

        // Filtro de categorías
        if (filters.categories && filters.categories.length > 0) {
          if (!filters.categories.includes(product.category)) return false;
        }

        // Filtro de rango de precio
        if (filters.priceRange) {
          const [min, max] = filters.priceRange;
          if (product.price < min || product.price > max) return false;
        }

        // Filtro de ofertas
        if (filters.onSale) {
          if (!product.originalPrice) return false;
        }

        // Filtro de stock
        if (filters.inStock !== undefined) {
          if (product.inStock !== filters.inStock) return false;
        }

        return true;
      }).sort((a, b) => {
        if (!filters.sortBy) return 0;
        
        let aValue, bValue;
        switch (filters.sortBy) {
          case 'name':
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'rating':
            aValue = a.rating || 0;
            bValue = b.rating || 0;
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
  private static nameToSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  }
}