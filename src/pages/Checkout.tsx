
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usarCarrito } from '../contexts/CartContext';
import { CreditCard, Smartphone, Building2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';
import { WhatsAppFloat } from "@/components/ui/whatsapp";

const Checkout = () => {
  const navigate = useNavigate();
  const { articulosCarrito, contadorArticulosCarrito, establecerCarritoAbierto } = usarCarrito();
  const [metodoSeleccionado, establecerMetodoSeleccionado] = useState('');

  const total = articulosCarrito.reduce((suma, articulo) => suma + (articulo.precio * articulo.cantidad), 0);

  const manejarProcesarPago = () => {
    if (metodoSeleccionado === 'transferencia' || metodoSeleccionado === 'pago-movil') {
      // Redirigir a la página de confirmación de pago
      navigate('/payment-confirmation', {
        state: { metodoSeleccionado }
      });
    } else {
      // Para PayPal y Stripe se puede implementar la lógica correspondiente
      alert(`Procesando pago con ${metodoSeleccionado}`);
    }
  };

  const metodosPago = [
    {
      id: 'stripe',
      nombre: 'Tarjeta de Crédito/Débito',
      icono: CreditCard,
      descripcion: 'Visa, MasterCard, American Express'
    },
    {
      id: 'paypal',
      nombre: 'PayPal',
      icono: CreditCard,
      descripcion: 'Paga con tu cuenta PayPal'
    },
    {
      id: 'pago-movil',
      nombre: 'Pago Móvil',
      icono: Smartphone,
      descripcion: 'Transferencia desde tu banco móvil'
    },
    {
      id: 'transferencia',
      nombre: 'Transferencia Bancaria',
      icono: Building2,
      descripcion: 'Transferencia directa a nuestra cuenta'
    }
  ];

  return (
    <div className="min-h-screen bg-color-primary">
      <WhatsAppFloat />
      <Header
        cartItemCount={contadorArticulosCarrito}
        onCartClick={() => establecerCarritoAbierto(true)}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resumen del Carrito */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Resumen de tu Compra</h2>
            
            {articulosCarrito.length === 0 ? (
              <p className="text-gray-500">Tu carrito está vacío</p>
            ) : (
              <div className="space-y-4">
                {articulosCarrito.map((articulo) => (
                  <div key={articulo.id} className="flex items-center space-x-4 border-b pb-4">
                    <img
                      src={articulo.imagen_url}
                      alt={articulo.nombre}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{articulo.nombre}</h3>
                      <p className="text-gray-600">
                        ${articulo.precio.toLocaleString()} x {articulo.cantidad}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${(articulo.precio * articulo.cantidad).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span>REF {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Métodos de Pago */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Métodos de Pago</h2>
            
            <div className="space-y-3">
              {metodosPago.map((metodo) => {
                const Icono = metodo.icono;
                return (
                  <div
                    key={metodo.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      metodoSeleccionado === metodo.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => establecerMetodoSeleccionado(metodo.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Icono className="h-6 w-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{metodo.nombre}</h3>
                        <p className="text-sm text-gray-600">{metodo.descripcion}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          metodoSeleccionado === metodo.id
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {metodoSeleccionado === metodo.id && (
                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              onClick={manejarProcesarPago}
              disabled={!metodoSeleccionado || articulosCarrito.length === 0}
              className="w-full mt-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:brightness-110"
            >
              Procesar Pago
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
