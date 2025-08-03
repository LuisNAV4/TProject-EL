import { Product } from "../components/ProductCard";

export const sampleProducts: Product[] = [
  {
    id: 1,
    nombre: "iPhone 15 Pro Max 256GB",
    precio: 28999,
    precio_original: 31999,
    imagen_url:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    calificacion: 4.8,
    categoria_id: 3,
    descripcion:
      "El iPhone más avanzado con chip A17 Pro, cámara de 48MP y titanio",
    en_stock: true,
    cantidad_stock: 50, // Agrega esta propiedad
    fecha_creacion: "2023-01-01", // Agrega esta propiedad
    fecha_actualizacion: "2023-01-10", // Agrega esta propiedad
  },
  {
    id: 2,
    nombre: "MacBook Air M2 13' 256GB",
    precio: 24999,
    imagen_url:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    calificacion: 4.9,
    categoria_id: 1,
    descripcion:
      "Ultraligera y potente con chip M2, pantalla Liquid Retina de 13.6'",
    en_stock: true,
    cantidad_stock: 50, // Agrega esta propiedad
    fecha_creacion: "2023-01-01", // Agrega esta propiedad
    fecha_actualizacion: "2023-01-10", // Agrega esta propiedad
  },
  {
    id: 3,
    nombre: "AirPods Pro 2da Generación",
    precio: 5999,
    imagen_url:
      "https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    calificacion: 4.7,
    categoria_id: 6,
    descripcion:
      "Cancelación de ruido activa, audio espacial y hasta 6 horas de batería",
    en_stock: true,
    cantidad_stock: 50, // Agrega esta propiedad
    fecha_creacion: "2023-01-01", // Agrega esta propiedad
    fecha_actualizacion: "2023-01-10", // Agrega esta propiedad
  },
  {
    id: 4,
    nombre: "Samsung Galaxy S24 Ultra 512GB",
    precio: 28555,
    precio_original: 35999,
    imagen_url:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    calificacion: 4.6,
    categoria_id: 3,
    descripcion:
      "Smartphone premium con S Pen integrado, cámara de 200MP y pantalla de 6.8'",
    en_stock: true,
    cantidad_stock: 50, // Agrega esta propiedad
    fecha_creacion: "2023-01-01", // Agrega esta propiedad
    fecha_actualizacion: "2023-01-10", // Agrega esta propiedad
  },
  {
    id: 5,
    nombre: "Apple Watch Series 9 45mm",
    precio: 9999,
    imagen_url:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    calificacion: 4.5,
    categoria_id: 5,
    descripcion:
      "Smartwatch con pantalla Always-On, GPS y monitoreo avanzado de salud",
    en_stock: true,
    cantidad_stock: 50, // Agrega esta propiedad
    fecha_creacion: "2023-01-01", // Agrega esta propiedad
    fecha_actualizacion: "2023-01-10", // Agrega esta propiedad
  },
  {
    id: 6,
    nombre: "Sony WH-1000XM5",
    precio: 7999,
    imagen_url:
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    calificacion: 4.8,
    categoria_id: 6,
    descripcion:
      "Audífonos inalámbricos premium con la mejor cancelación de ruido",
    en_stock: true,
    cantidad_stock: 50, // Agrega esta propiedad
    fecha_creacion: "2023-01-01", // Agrega esta propiedad
    fecha_actualizacion: "2023-01-10", // Agrega esta propiedad
  },
  {
    id: 7,
    nombre: "PlayStation 5 Digital Edition",
    precio: 12999,
    imagen_url:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    calificacion: 4.7,
    categoria_id: 2,
    descripcion:
      "Consola de nueva generación con SSD ultrarrápido y gráficos 4K",
    en_stock: false,
    cantidad_stock: 50, // Agrega esta propiedad
    fecha_creacion: "2023-01-01", // Agrega esta propiedad
    fecha_actualizacion: "2023-01-10", // Agrega esta propiedad
  },
  {
    id: 8,
    nombre: "Canon EOS R6 Mark II",
    precio: 45999,
    imagen_url:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    calificacion: 4.9,
    categoria_id: 7,
    descripcion:
      "Cámara mirrorless full-frame de 24.2MP con estabilización de 5 ejes",
    en_stock: true,
    cantidad_stock: 50, // Agrega esta propiedad
    fecha_creacion: "2023-01-01", // Agrega esta propiedad
    fecha_actualizacion: "2023-01-10", // Agrega esta propiedad
  },
];
