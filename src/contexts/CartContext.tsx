
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../components/ProductCard';

interface ArticuloCarrito extends Product {
  cantidad: number;
}

interface TipoContextoCarrito {
  articulosCarrito: ArticuloCarrito[];
  agregarAlCarrito: (producto: Product) => void;
  actualizarCantidad: (id: number, cantidad: number) => void;
  eliminarArticulo: (id: number) => void;
  contadorArticulosCarrito: number;
  carritoAbierto: boolean;
  establecerCarritoAbierto: (abierto: boolean) => void;
  limpiarCarrito: () => void;
}

const ContextoCarrito = createContext<TipoContextoCarrito | undefined>(undefined);

const CLAVE_STORAGE_CARRITO = 'techstore_carrito';

export const ProveedorCarrito = ({ children }: { children: ReactNode }) => {
  const [articulosCarrito, establecerArticulosCarrito] = useState<ArticuloCarrito[]>([]);
  const [carritoAbierto, establecerCarritoAbierto] = useState(false);

  // Cargar carrito desde localStorage al inicializar
  useEffect(() => {
    const carritoGuardado = localStorage.getItem(CLAVE_STORAGE_CARRITO);
    if (carritoGuardado) {
      try {
        const articulosParseados = JSON.parse(carritoGuardado);
        establecerArticulosCarrito(articulosParseados);
      } catch (error) {
        console.error('Error al parsear el carrito desde localStorage:', error);
        localStorage.removeItem(CLAVE_STORAGE_CARRITO);
      }
    }
  }, []);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    if (articulosCarrito.length > 0) {
      localStorage.setItem(CLAVE_STORAGE_CARRITO, JSON.stringify(articulosCarrito));
    } else {
      localStorage.removeItem(CLAVE_STORAGE_CARRITO);
    }
  }, [articulosCarrito]);

  const agregarAlCarrito = (producto: Product) => {
    establecerArticulosCarrito((articulosAnteriores) => {
      const articuloExistente = articulosAnteriores.find((articulo) => articulo.id === producto.id);
      if (articuloExistente) {
        return articulosAnteriores.map((articulo) =>
          articulo.id === producto.id
            ? { ...articulo, cantidad: articulo.cantidad + 1 }
            : articulo
        );
      } else {
        return [...articulosAnteriores, { ...producto, cantidad: 1 }];
      }
    });
  };

  const actualizarCantidad = (id: number, cantidad: number) => {
    if (cantidad === 0) {
      eliminarArticulo(id);
    } else {
      establecerArticulosCarrito((articulosAnteriores) =>
        articulosAnteriores.map((articulo) => 
          articulo.id === id ? { ...articulo, cantidad } : articulo
        )
      );
    }
  };

  const eliminarArticulo = (id: number) => {
    establecerArticulosCarrito((articulosAnteriores) => 
      articulosAnteriores.filter((articulo) => articulo.id !== id)
    );
  };

  const limpiarCarrito = () => {
    establecerArticulosCarrito([]);
    localStorage.removeItem(CLAVE_STORAGE_CARRITO);
  };

  const contadorArticulosCarrito = articulosCarrito.reduce(
    (total, articulo) => total + articulo.cantidad,
    0
  );

  return (
    <ContextoCarrito.Provider
      value={{
        articulosCarrito,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarArticulo,
        contadorArticulosCarrito,
        carritoAbierto,
        establecerCarritoAbierto,
        limpiarCarrito,
      }}
    >
      {children}
    </ContextoCarrito.Provider>
  );
};

export const usarCarrito = () => {
  const contexto = useContext(ContextoCarrito);
  if (contexto === undefined) {
    throw new Error('usarCarrito debe ser usado dentro de un ProveedorCarrito');
  }
  return contexto;
};

// Mantener compatibilidad con el nombre anterior
export const useCart = usarCarrito;

