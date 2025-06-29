
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from './ProductCard';

interface ArticuloCarrito extends Product {
  cantidad: number;
}

interface PropiedadesCarrito {
  estaAbierto: boolean;
  alCerrar: () => void;
  articulos: ArticuloCarrito[];
  alActualizarCantidad: (id: number, cantidad: number) => void;
  alEliminarArticulo: (id: number) => void;
}

const Cart = ({ estaAbierto, alCerrar, articulos, alActualizarCantidad, alEliminarArticulo }: PropiedadesCarrito) => {
  const navigate = useNavigate();
  const total = articulos.reduce((suma, articulo) => suma + (articulo.price * articulo.cantidad), 0);

  const irAlCheckout = () => {
    alCerrar();
    navigate('/checkout');
  };

  if (!estaAbierto) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold flex items-center">
            <ShoppingBag className="mr-2 h-6 w-6" />
            Carrito de Compras
          </h2>
          <Button variant="ghost" onClick={alCerrar}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="overflow-y-auto max-h-96 p-6">
          {articulos.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
              <Button onClick={alCerrar} className="mt-4">
                Continuar Comprando
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {articulos.map((articulo) => (
                <div key={articulo.id} className="flex items-center space-x-4 border-b pb-4">
                  <img
                    src={articulo.image}
                    alt={articulo.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{articulo.name}</h3>
                    <p className="text-gray-600">${articulo.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => alActualizarCantidad(articulo.id, Math.max(0, articulo.cantidad - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{articulo.cantidad}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => alActualizarCantidad(articulo.id, articulo.cantidad + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => alEliminarArticulo(articulo.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {articulos.length > 0 && (
          <div className="border-t p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold">Total: REF {total.toLocaleString()}</span>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={alCerrar} className="flex-1">
                Continuar Comprando
              </Button>
              <Button 
                onClick={irAlCheckout}
                className="flex-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:from-[var(--color-primary)] hover:to-[var(--color-secondary)] hover:brightness-110"
              >
                Ir a Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
