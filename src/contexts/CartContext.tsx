
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../components/ProductCard';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

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
  const [usuario, setUsuario] = useState<User | null>(null);

  // Configurar autenticación
  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUsuario(session?.user ?? null);
    });

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const nuevoUsuario = session?.user ?? null;
      setUsuario(nuevoUsuario);
      
      // Cuando el usuario se deslogea, limpiar carrito de DB y mantener localStorage
      if (!nuevoUsuario && usuario) {
        cargarCarritoDesdeLocalStorage();
      }
      // Cuando el usuario se logea, migrar carrito de localStorage a DB
      else if (nuevoUsuario && !usuario) {
        migrarCarritoLocalADB(nuevoUsuario.id);
      }
      // Si hay un usuario logueado, cargar su carrito de la DB
      else if (nuevoUsuario) {
        cargarCarritoDeBD(nuevoUsuario.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [usuario]);

  // Cargar carrito inicial
  useEffect(() => {
    if (usuario) {
      cargarCarritoDeBD(usuario.id);
    } else {
      cargarCarritoDesdeLocalStorage();
    }
  }, []);

  const cargarCarritoDesdeLocalStorage = () => {
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
  };

  const cargarCarritoDeBD = async (usuarioId: string) => {
    try {
      const { data: productos } = await supabase
        .from('productos')
        .select('*');

      const { data: carritoItems } = await supabase
        .from('carrito_items')
        .select('*')
        .eq('usuario_id', parseInt(usuarioId));

      if (carritoItems && productos) {
        const articulosCarrito = carritoItems.map(item => {
          const producto = productos.find(p => p.id === item.producto_id);
          if (producto) {
            // Map database fields to Product interface
            return {
              id: producto.id,
              nombre: producto.nombre,
              precio: producto.precio,
              precio_original: producto.precio_original,
              imagen_url: producto.imagen_url,
              calificacion: producto.calificacion || 0,
              categoria_id: producto.categoria_id?.toString() || '',
              cantidad: item.cantidad
            } as ArticuloCarrito;
          }
          return null;
        }).filter(Boolean) as ArticuloCarrito[];

        establecerArticulosCarrito(articulosCarrito);
      }
    } catch (error) {
      console.error('Error al cargar carrito desde BD:', error);
    }
  };

  const migrarCarritoLocalADB = async (usuarioId: string) => {
    const carritoLocal = localStorage.getItem(CLAVE_STORAGE_CARRITO);
    if (carritoLocal) {
      try {
        const articulos = JSON.parse(carritoLocal);
        
        // Insertar cada artículo en la BD
        for (const articulo of articulos) {
          await supabase
            .from('carrito_items')
            .upsert({
              usuario_id: parseInt(usuarioId),
              producto_id: articulo.id,
              cantidad: articulo.cantidad
            });
        }
        
        // Limpiar localStorage después de migrar
        localStorage.removeItem(CLAVE_STORAGE_CARRITO);
        
        // Recargar carrito desde BD
        cargarCarritoDeBD(usuarioId);
      } catch (error) {
        console.error('Error al migrar carrito:', error);
      }
    }
  };

  const guardarCarrito = async (nuevosArticulos: ArticuloCarrito[]) => {
    if (usuario) {
      // Guardar en base de datos
      try {
        // Limpiar carrito actual del usuario
        await supabase
          .from('carrito_items')
          .delete()
          .eq('usuario_id', parseInt(usuario.id));

        // Insertar nuevos artículos
        if (nuevosArticulos.length > 0) {
          const itemsParaInsertar = nuevosArticulos.map(articulo => ({
            usuario_id: parseInt(usuario.id),
            producto_id: articulo.id,
            cantidad: articulo.cantidad
          }));

          await supabase
            .from('carrito_items')
            .insert(itemsParaInsertar);
        }
      } catch (error) {
        console.error('Error al guardar carrito en BD:', error);
      }
    } else {
      // Guardar en localStorage
      if (nuevosArticulos.length > 0) {
        localStorage.setItem(CLAVE_STORAGE_CARRITO, JSON.stringify(nuevosArticulos));
      } else {
        localStorage.removeItem(CLAVE_STORAGE_CARRITO);
      }
    }
  };

  const agregarAlCarrito = async (producto: Product) => {
    const nuevosArticulos = [...articulosCarrito];
    const articuloExistente = nuevosArticulos.find((articulo) => articulo.id === producto.id);
    
    if (articuloExistente) {
      articuloExistente.cantidad += 1;
    } else {
      nuevosArticulos.push({ ...producto, cantidad: 1 });
    }
    
    establecerArticulosCarrito(nuevosArticulos);
    await guardarCarrito(nuevosArticulos);
  };

  const actualizarCantidad = async (id: number, cantidad: number) => {
    if (cantidad === 0) {
      await eliminarArticulo(id);
    } else {
      const nuevosArticulos = articulosCarrito.map((articulo) => 
        articulo.id === id ? { ...articulo, cantidad } : articulo
      );
      establecerArticulosCarrito(nuevosArticulos);
      await guardarCarrito(nuevosArticulos);
    }
  };

  const eliminarArticulo = async (id: number) => {
    const nuevosArticulos = articulosCarrito.filter((articulo) => articulo.id !== id);
    establecerArticulosCarrito(nuevosArticulos);
    await guardarCarrito(nuevosArticulos);
  };

  const limpiarCarrito = async () => {
    establecerArticulosCarrito([]);
    await guardarCarrito([]);
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

