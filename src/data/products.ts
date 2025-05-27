
import { Product } from '../components/ProductCard';

export const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Laptop Dell Inspiron 15 3000",
    price: 12999,
    originalPrice: 15999,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    category: "Hardware",
    description: "Laptop ideal para PyMEs con procesador Intel Core i5, 8GB RAM y 256GB SSD",
    inStock: true
  },
  {
    id: 2,
    name: "Router Cisco RV340 VPN",
    price: 8500,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    category: "Networking",
    description: "Router empresarial con VPN integrada para oficinas de hasta 50 empleados",
    inStock: true
  },
  {
    id: 3,
    name: "Microsoft Office 365 Business",
    price: 2400,
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    category: "Software",
    description: "Suite completa de productividad para empresas (licencia anual por usuario)",
    inStock: true
  },
  {
    id: 4,
    name: "Servidor HP ProLiant MicroServer",
    price: 25900,
    originalPrice: 28900,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    category: "Servidores",
    description: "Servidor compacto ideal para pequeñas empresas con almacenamiento de 1TB",
    inStock: true
  },
  {
    id: 5,
    name: "Antivirus Kaspersky Endpoint Security",
    price: 1800,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    category: "Seguridad",
    description: "Protección empresarial avanzada contra malware y amenazas cibernéticas",
    inStock: true
  },
  {
    id: 6,
    name: "Monitor Samsung 24' Curvo",
    price: 3200,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.4,
    category: "Accesorios",
    description: "Monitor curvo Full HD perfecto para trabajo de oficina y diseño",
    inStock: true
  },
  {
    id: 7,
    name: "Impresora HP LaserJet Pro",
    price: 4500,
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.3,
    category: "Accesorios",
    description: "Impresora láser monocromática de alta velocidad para oficinas",
    inStock: false
  },
  {
    id: 8,
    name: "Cámara de Seguridad Hikvision IP",
    price: 2800,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    category: "Seguridad",
    description: "Cámara IP de alta resolución con visión nocturna para vigilancia empresarial",
    inStock: true
  }
];
