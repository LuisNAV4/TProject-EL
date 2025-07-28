
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usarCarrito } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { CreditCard, Smartphone, Building2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';
import { WhatsAppFloat } from "@/components/ui/whatsapp";
import { supabase } from '@/integrations/supabase/client';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { articulosCarrito, contadorArticulosCarrito, establecerCarritoAbierto } = usarCarrito();
  const [metodoSeleccionado, establecerMetodoSeleccionado] = useState('');
  const [datosPagoMovil, setDatosPagoMovil] = useState<any[]>([]);
  const [datosTransferencia, setDatosTransferencia] = useState<any[]>([]);

  const total = articulosCarrito.reduce((suma, articulo) => suma + (articulo.precio * articulo.cantidad), 0);

  // Cargar datos de pago desde la base de datos
  useEffect(() => {
    const cargarDatosPago = async () => {
      try {
        const { data: pagoMovil } = await supabase
          .from('pago_movil_data')
          .select('*')
          .eq('activo', true);
          
        const { data: transferencia } = await supabase
          .from('transferencia_data')
          .select('*')
          .eq('activo', true);
          
        setDatosPagoMovil(pagoMovil || []);
        setDatosTransferencia(transferencia || []);
      } catch (error) {
        console.error('Error cargando datos de pago:', error);
      }
    };

    cargarDatosPago();
  }, []);

  const manejarProcesarPago = async () => {
    if (!user) {
      alert('Debes iniciar sesión para realizar una compra');
      return;
    }

    if (metodoSeleccionado === 'transferencia' || metodoSeleccionado === 'pago-movil') {
      // Crear el pedido en la base de datos
      try {
        const numeroPedido = `P${Date.now()}`;
        
        // Insertar el pedido
        const { data: pedido, error: errorPedido } = await supabase
          .from('pedidos')
          .insert({
            numero_pedido: numeroPedido,
            usuario_id: parseInt(user.id) as any, // Temporal fix para tipo
            monto_total: total,
            metodo_pago: metodoSeleccionado === 'pago-movil' ? 'contra_entrega' : 'transferencia_bancaria',
            direccion_envio: 'Por definir',
            direccion_facturacion: 'Por definir',
            estado: 'pendiente',
            estado_pago: 'pendiente'
          } as any)
          .select()
          .single();

        if (errorPedido) throw errorPedido;

        // Insertar items del pedido
        const itemsPedido = articulosCarrito.map(item => ({
          pedido_id: pedido.id,
          producto_id: item.id,
          nombre_producto: item.nombre,
          cantidad: item.cantidad,
          precio_unitario: item.precio,
          subtotal: item.precio * item.cantidad
        }));

        const { error: errorItems } = await supabase
          .from('items_pedido')
          .insert(itemsPedido);

        if (errorItems) throw errorItems;

        // Crear registro de tracking
        await supabase
          .from('seguimiento_pedidos')
          .insert({
            numero_pedido: numeroPedido,
            usuario_id: user.id,
            estado_actual: 'pedido_confirmado',
            detalles: [
              {
                estado: 'pedido_confirmado',
                fecha: new Date().toISOString(),
                descripcion: 'Pedido confirmado y en espera de pago'
              }
            ]
          });

        // Redirigir a la página de confirmación de pago
        navigate('/payment-confirmation', {
          state: { 
            metodoSeleccionado,
            numeroPedido,
            datosPago: metodoSeleccionado === 'pago-movil' ? datosPagoMovil : datosTransferencia
          }
        });
      } catch (error) {
        console.error('Error procesando pedido:', error);
        alert('Error al procesar el pedido. Intenta nuevamente.');
      }
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
      descripcion: `Transferir a: ${datosPagoMovil.length > 0 ? datosPagoMovil[0].telefono : 'Cargando...'}`
    },
    {
      id: 'transferencia',
      nombre: 'Transferencia Bancaria',
      icono: Building2,
      descripcion: `Cuenta: ${datosTransferencia.length > 0 ? datosTransferencia[0].numero_cuenta : 'Cargando...'}`
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
