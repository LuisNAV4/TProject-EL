
import { Product } from '../components/ProductCard';

export const sampleProducts: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    price: 28999,
    originalPrice: 31999,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    category: "Smartphones",
    description: "El iPhone más avanzado con chip A17 Pro, cámara de 48MP y titanio",
    inStock: true
  },
  {
    id: 2,
    name: "MacBook Air M2 13' 256GB",
    price: 24999,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    category: "Laptops",
    description: "Ultraligera y potente con chip M2, pantalla Liquid Retina de 13.6'",
    inStock: true
  },
  {
    id: 3,
    name: "AirPods Pro 2da Generación",
    price: 5999,
    image: "https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    category: "Audio",
    description: "Cancelación de ruido activa, audio espacial y hasta 6 horas de batería",
    inStock: true
  },
  {
    id: 4,
    name: "Samsung Galaxy S24 Ultra 512GB",
    price: 28555,
    originalPrice: 35999,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    category: "Smartphones",
    description: "Smartphone premium con S Pen integrado, cámara de 200MP y pantalla de 6.8'",
    inStock: true
  },
  {
    id: 5,
    name: "Apple Watch Series 9 45mm",
    price: 9999,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    category: "Wearables",
    description: "Smartwatch con pantalla Always-On, GPS y monitoreo avanzado de salud",
    inStock: true
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    price: 7999,
    image: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    category: "Audio",
    description: "Audífonos inalámbricos premium con la mejor cancelación de ruido",
    inStock: true
  },
  {
    id: 7,
    name: "PlayStation 5 Digital Edition",
    price: 12999,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    category: "Gaming",
    description: "Consola de nueva generación con SSD ultrarrápido y gráficos 4K",
    inStock: false
  },
  {
    id: 8,
    name: "Canon EOS R6 Mark II",
    price: 45999,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    category: "Fotografía",
    description: "Cámara mirrorless full-frame de 24.2MP con estabilización de 5 ejes",
    inStock: true
  }
];
