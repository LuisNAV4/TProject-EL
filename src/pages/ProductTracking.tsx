
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Package, MessageCircle, Truck, CheckCircle, TicketIcon, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import Header from '../components/Header';
import { usarCarrito } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { WhatsAppFloat } from "@/components/ui/whatsapp";
import { supabase } from '@/integrations/supabase/client';

const ProductTracking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { contadorArticulosCarrito, establecerCarritoAbierto } = usarCarrito();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [mensajeChat, establecerMensajeChat] = useState('');
  const [mensajesChat, establecerMensajesChat] = useState([]);
  const [seguimiento, setSeguimiento] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [actualizando, setActualizando] = useState(false);
  const messagesEndRef = useRef(null);

  // Obtener número de pedido de los parámetros de URL o usar uno por defecto
  const numeroPedido = searchParams.get('numero') || 'TRK123456789';

  // Scroll automático al final de los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajesChat]);

  // Cargar datos de seguimiento
  const cargarSeguimiento = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('seguimiento_pedidos')
        .select('*')
        .eq('numero_pedido', numeroPedido)
        .eq('usuario_id', user.id)
        .single();

      if (error) {
        console.error('Error al cargar seguimiento:', error);
        toast({
          title: "Error",
          description: "No se pudo cargar la información del seguimiento",
          variant: "destructive",
        });
        return;
      }

      setSeguimiento(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };

  // Cargar mensajes del chat
  const cargarMensajes = async () => {
    if (!user || !seguimiento) return;

    try {
      const { data, error } = await supabase
        .from('mensajes_seguimiento')
        .select('*')
        .eq('seguimiento_id', seguimiento.id)
        .order('fecha', { ascending: true });

      if (error) {
        console.error('Error al cargar mensajes:', error);
        return;
      }

      establecerMensajesChat(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Refrescar estado del envío
  const refrescarEstado = async () => {
    setActualizando(true);
    await cargarSeguimiento();
    setActualizando(false);
    toast({
      title: "Estado actualizado",
      description: "La información del seguimiento ha sido actualizada",
    });
  };

  // Enviar mensaje
  const enviarMensaje = async () => {
    if (!mensajeChat.trim() || !user || !seguimiento) return;

    try {
      const { error } = await supabase
        .from('mensajes_seguimiento')
        .insert([
          {
            seguimiento_id: seguimiento.id,
            usuario_id: user.id,
            mensaje: mensajeChat,
            remitente: 'usuario'
          }
        ]);

      if (error) {
        console.error('Error al enviar mensaje:', error);
        toast({
          title: "Error",
          description: "No se pudo enviar el mensaje",
          variant: "destructive",
        });
        return;
      }

      establecerMensajeChat('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Configurar suscripciones en tiempo real
  useEffect(() => {
    if (!user) return;

    // Suscripción para cambios en el seguimiento
    const seguimientoChannel = supabase
      .channel('seguimiento-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'seguimiento_pedidos',
          filter: `usuario_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Seguimiento actualizado:', payload);
          setSeguimiento(payload.new);
          toast({
            title: "Estado actualizado",
            description: "El estado de tu pedido ha cambiado",
          });
        }
      )
      .subscribe();

    // Suscripción para nuevos mensajes
    const mensajesChannel = supabase
      .channel('mensajes-tracking-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'mensajes_seguimiento'
        },
        (payload) => {
          console.log('Nuevo mensaje:', payload);
          if (seguimiento && payload.new.seguimiento_id === seguimiento.id) {
            establecerMensajesChat(prev => [...prev, payload.new]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(seguimientoChannel);
      supabase.removeChannel(mensajesChannel);
    };
  }, [user, seguimiento]);

  // Cargar datos inicial
  useEffect(() => {
    if (user) {
      cargarSeguimiento();
    }
  }, [user, numeroPedido]);

  // Cargar mensajes cuando se carga el seguimiento
  useEffect(() => {
    if (seguimiento) {
      cargarMensajes();
    }
  }, [seguimiento]);

  // Si no hay usuario, redirigir al login
  if (!user) {
    return (
      <div className="min-h-screen bg-color-primary flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Inicia sesión para ver tu seguimiento</h2>
          <Button onClick={() => navigate('/')}>
            Ir al inicio
          </Button>
        </div>
      </div>
    );
  }

  if (cargando) {
    return (
      <div className="min-h-screen bg-color-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4">Cargando información del seguimiento...</p>
        </div>
      </div>
    );
  }

  if (!seguimiento) {
    return (
      <div className="min-h-screen bg-color-primary flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Seguimiento no encontrado</h2>
          <p className="mb-4">No se encontró información para el número de seguimiento: {numeroPedido}</p>
          <Button onClick={() => navigate(-1)}>
            Volver
          </Button>
        </div>
      </div>
    );
  }

  // Estados predefinidos del seguimiento
  const estadosPredefinidos = [
    { estado: 'en_espera', descripcion: 'En espera', icono: Package },
    { estado: 'pago_confirmado', descripcion: 'Pago confirmado', icono: CheckCircle },
    { estado: 'preparando_envio', descripcion: 'Preparando envío', icono: Package },
    { estado: 'en_camino', descripcion: 'En camino', icono: Truck },
    { estado: 'entregado', descripcion: 'Entregado', icono: CheckCircle }
  ];

  // Obtener el índice del estado actual
  const estadoActualIndex = estadosPredefinidos.findIndex(e => e.estado === seguimiento.estado_actual);
  
  // Procesar estados del seguimiento desde la base de datos con estados predefinidos
  const estadosDetalles = seguimiento.detalles && seguimiento.detalles.length > 0 
    ? seguimiento.detalles 
    : estadosPredefinidos.map((estado, index) => ({
        estado: estado.estado,
        descripcion: estado.descripcion,
        completado: index <= estadoActualIndex,
        fecha: index <= estadoActualIndex ? new Date().toISOString() : null
      }));

  return (
    <div className="min-h-screen bg-color-primary">
      <WhatsAppFloat />
      <Header
        cartItemCount={contadorArticulosCarrito}
        onCartClick={() => establecerCarritoAbierto(true)}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <h1 className="text-3xl font-bold">Seguimiento de Pedido</h1>
          </div>
          <Button
            onClick={() => navigate('/tickets')}
            variant="outline"
            className="flex items-center"
          >
            <TicketIcon className="h-4 w-4 mr-2" />
            Reportar Problema
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Estado del Pedido */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Estado de tu Pedido</h2>
              <Button
                onClick={refrescarEstado}
                disabled={actualizando}
                variant="outline"
                size="sm"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${actualizando ? 'animate-spin' : ''}`} />
                {actualizando ? 'Actualizando...' : 'Refrescar'}
              </Button>
            </div>
            
            <div className="space-y-6">
              {estadosDetalles.map((paso, index) => {
                const estadoPredefinido = estadosPredefinidos.find(e => e.estado === paso.estado);
                const Icono = estadoPredefinido?.icono || Package;
                const esActual = seguimiento.estado_actual === paso.estado;
                
                return (
                  <div key={index} className="flex items-center space-x-4">
                    {/* Línea conectora */}
                    {index > 0 && (
                      <div className="absolute left-6 -mt-6 w-0.5 h-6 bg-gray-200"></div>
                    )}
                    
                    <div className={`relative p-3 rounded-full transition-all duration-300 ${
                      paso.completado 
                        ? 'bg-green-100 text-green-600 ring-2 ring-green-200' 
                        : esActual
                        ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-200 animate-pulse'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Icono className="h-6 w-6" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-semibold transition-colors duration-300 ${
                        paso.completado 
                          ? 'text-green-600' 
                          : esActual
                          ? 'text-blue-600'
                          : 'text-gray-500'
                      }`}>
                        {paso.descripcion}
                        {esActual && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Actual
                          </span>
                        )}
                      </h3>
                      
                      {paso.completado && paso.fecha && (
                        <p className="text-sm text-green-600 font-medium">
                          ✓ Completado el {new Date(paso.fecha).toLocaleDateString('es-ES')}
                        </p>
                      )}
                      
                      {!paso.completado && !esActual && (
                        <p className="text-sm text-gray-500">Pendiente</p>
                      )}
                      
                      {esActual && !paso.completado && (
                        <p className="text-sm text-blue-600 font-medium">
                          🔄 En proceso...
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Información de Envío</h3>
              <p className="text-blue-700 text-sm">
                Número de seguimiento: <strong>{seguimiento.numero_seguimiento}</strong>
              </p>
              <p className="text-blue-700 text-sm">
                Tiempo estimado de entrega: {seguimiento.tiempo_estimado_entrega}
              </p>
              <p className="text-blue-700 text-sm">
                Estado actual: <strong className="capitalize">{seguimiento.estado_actual.replace('_', ' ')}</strong>
              </p>
            </div>
          </div>

          {/* Chat con Vendedor */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <MessageCircle className="h-6 w-6 mr-2" />
              Chat con el Vendedor
            </h2>
            
            <div className="flex-1 border rounded-lg p-4 mb-4 h-80 overflow-y-auto bg-gray-50">
              <div className="space-y-3">
                {mensajesChat.map((mensaje) => (
                  <div
                    key={mensaje.id}
                    className={`flex ${mensaje.remitente === 'usuario' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      mensaje.remitente === 'usuario'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white border shadow-sm'
                    }`}>
                      <p className="text-sm">{mensaje.mensaje}</p>
                      <p className={`text-xs mt-1 ${
                        mensaje.remitente === 'usuario' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {new Date(mensaje.fecha).toLocaleTimeString('es-ES', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                 ))}
                 <div ref={messagesEndRef} />
               </div>
             </div>
            
            <div className="flex space-x-2">
              <Input
                value={mensajeChat}
                onChange={(e) => establecerMensajeChat(e.target.value)}
                placeholder="Escribe tu mensaje..."
                onKeyPress={(e) => e.key === 'Enter' && enviarMensaje()}
                className="flex-1"
              />
              <Button onClick={enviarMensaje}>
                Enviar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTracking;
