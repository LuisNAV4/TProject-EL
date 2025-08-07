
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Upload, User, CreditCard, Building2, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '../components/Header';
import { usarCarrito } from '../contexts/CartContext';
import { WhatsAppFloat } from "@/components/ui/whatsapp";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PaymentConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { contadorArticulosCarrito, establecerCarritoAbierto } = usarCarrito();
  const { toast } = useToast();
  
  const metodoSeleccionado = location.state?.metodoSeleccionado || '';
  const orderData = location.state?.orderData || null;
  
  const [numeroReferencia, establecerNumeroReferencia] = useState('');
  const [imagenPago, establecerImagenPago] = useState<File | null>(null);
  const [previsualizacionImagen, establecerPrevisualizacionImagen] = useState<string>('');
  const [procesando, setProcesando] = useState(false);

  // Datos del vendedor (en un proyecto real estos vendrían de una API)
  const datosVendedor = {
    nombre: 'Comercio Los Andes',
    cedula: 'V-12.345.678',
    telefono: '+58 412-7750241',
    email: 'ventas@losandes.com',
    cuentaBancaria: {
      banco: 'Banco de Venezuela',
      numeroCuenta: '0102-0123-4567890123456',
      tipoCuenta: 'Cuenta Corriente',
      cedula: 'V-12.345.678'
    },
    pagoMovil: {
      telefono: '0412-7750241',
      cedula: 'V-12.345.678',
      banco: 'Banco de Venezuela'
    }
  };

  const manejarCambioImagen = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = evento.target.files?.[0];
    if (archivo) {
      establecerImagenPago(archivo);
      const lector = new FileReader();
      lector.onload = (e) => {
        establecerPrevisualizacionImagen(e.target?.result as string);
      };
      lector.readAsDataURL(archivo);
    }
  };

  const confirmarPago = async () => {
    if (!numeroReferencia.trim() || !imagenPago || !orderData) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    setProcesando(true);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error de autenticación",
          description: "Debes estar registrado e iniciar sesión para confirmar el pago",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }

      // Verify that the order belongs to the current user
      const { data: pedido, error: pedidoError } = await supabase
        .from('pedidos')
        .select('id, usuario_id')
        .eq('id', orderData.orderId)
        .single();

      if (pedidoError) {
        throw new Error('No se pudo verificar la orden');
      }

      if (!pedido) {
        throw new Error('La orden no existe');
      }

      // Check if the order belongs to the current user
      if (pedido.usuario_id !== user.id) {
        toast({
          title: "Error de autorización",
          description: "Esta orden no pertenece a tu cuenta",
          variant: "destructive",
        });
        return;
      }

      // Upload image to storage
      const fileExt = imagenPago.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('comprobantes-pago')
        .upload(filePath, imagenPago);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('comprobantes-pago')
        .getPublicUrl(filePath);

      // Update the order with payment information - RLS will ensure only the owner can update
      const { error: updateError } = await supabase
        .from('pedidos')
        .update({
          numero_referencia_pago: numeroReferencia,
          url_comprobante_pago: publicUrl,
          fecha_pago: new Date().toISOString(),
          estado_pago: 'pendiente'
        })
        .eq('id', orderData.orderId)
        .eq('usuario_id', user.id);

      if (updateError) {
        throw updateError;
      }

      toast({
        title: "Pago confirmado",
        description: "Tu comprobante ha sido enviado correctamente. Verificaremos el pago en las próximas horas.",
      });

      // Redirect to tracking
      navigate('/tracking', {
        state: {
          numeroReferencia,
          metodoSeleccionado,
          fechaPago: new Date().toISOString(),
          orderId: orderData.orderId
        }
      });

    } catch (error) {
      console.error('Error confirming payment:', error);
      toast({
        title: "Error",
        description: error.message || "Hubo un problema al confirmar el pago. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setProcesando(false);
    }
  };

  const puedeConfirmar = numeroReferencia.trim() && imagenPago;

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
          <h1 className="text-3xl font-bold">Confirmación de Pago</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Datos del Vendedor */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <User className="h-6 w-6 mr-2" />
              Datos del Vendedor
            </h2>

            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg text-gray-800">{datosVendedor.nombre}</h3>
                <p className="text-gray-600">Cédula: {datosVendedor.cedula}</p>
                <p className="text-gray-600">Teléfono: {datosVendedor.telefono}</p>
                <p className="text-gray-600">Email: {datosVendedor.email}</p>
              </div>

              {metodoSeleccionado === 'transferencia' && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <Building2 className="h-5 w-5 mr-2" />
                    Datos para Transferencia Bancaria
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Banco:</strong> {datosVendedor.cuentaBancaria.banco}</p>
                    <p><strong>Número de Cuenta:</strong> {datosVendedor.cuentaBancaria.numeroCuenta}</p>
                    <p><strong>Tipo:</strong> {datosVendedor.cuentaBancaria.tipoCuenta}</p>
                    <p><strong>Cédula:</strong> {datosVendedor.cuentaBancaria.cedula}</p>
                  </div>
                </div>
              )}

              {metodoSeleccionado === 'pago-movil' && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Datos para Pago Móvil
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Teléfono:</strong> {datosVendedor.pagoMovil.telefono}</p>
                    <p><strong>Cédula:</strong> {datosVendedor.pagoMovil.cedula}</p>
                    <p><strong>Banco:</strong> {datosVendedor.pagoMovil.banco}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Confirmación de Pago */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Hash className="h-6 w-6 mr-2" />
              Confirmar Pago
            </h2>

            <div className="space-y-6">
              <div>
                <Label htmlFor="referencia" className="text-base font-medium">
                  Número de Referencia *
                </Label>
                <Input
                  id="referencia"
                  type="text"
                  value={numeroReferencia}
                  onChange={(e) => establecerNumeroReferencia(e.target.value)}
                  placeholder="Ingresa el número de referencia del pago"
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Número que aparece en tu comprobante de pago
                </p>
              </div>

              <div>
                <Label htmlFor="comprobante" className="text-base font-medium">
                  Comprobante de Pago *
                </Label>
                <div className="mt-2">
                  <label
                    htmlFor="comprobante"
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 block text-center cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <span className="text-gray-600">
                      Haz clic para subir tu comprobante
                    </span>
                    <input
                      id="comprobante"
                      type="file"
                      accept="image/*"
                      onChange={manejarCambioImagen}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {previsualizacionImagen && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Vista previa:</p>
                    <img
                      src={previsualizacionImagen}
                      alt="Comprobante de pago"
                      className="max-w-full h-auto max-h-40 rounded-lg border"
                    />
                  </div>
                )}
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Importante:</strong> Una vez que confirmes el pago, 
                  nuestro equipo verificará la información en un plazo de 2-4 horas hábiles.
                </p>
              </div>

              <Button
                onClick={confirmarPago}
                disabled={!puedeConfirmar || procesando}
                className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:brightness-110"
              >
                {procesando ? 'Procesando...' : 'Confirmar Pago y Continuar'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
