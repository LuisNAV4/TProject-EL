
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, MessageCircle, Truck, CheckCircle, TicketIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '../components/Header';
import { usarCarrito } from '../contexts/CartContext';
import { WhatsAppFloat } from "@/components/ui/whatsapp";

const ProductTracking = () => {
  const navigate = useNavigate();
  const { contadorArticulosCarrito, establecerCarritoAbierto } = usarCarrito();
  const [mensajeChat, establecerMensajeChat] = useState('');
  const [mensajesChat, establecerMensajesChat] = useState([
    {
      id: 1,
      remitente: 'vendedor',
      mensaje: '¡Hola! Tu pedido ha sido confirmado. ¿En qué puedo ayudarte?',
      timestamp: new Date(Date.now() - 300000).toLocaleTimeString()
    }
  ]);

  const enviarMensaje = () => {
    if (mensajeChat.trim()) {
      const nuevoMensaje = {
        id: mensajesChat.length + 1,
        remitente: 'usuario',
        mensaje: mensajeChat,
        timestamp: new Date().toLocaleTimeString()
      };
      establecerMensajesChat([...mensajesChat, nuevoMensaje]);
      establecerMensajeChat('');
      
      // Simular respuesta del vendedor
      setTimeout(() => {
        const respuestaVendedor = {
          id: mensajesChat.length + 2,
          remitente: 'vendedor',
          mensaje: 'Gracias por tu mensaje. Te responderé lo antes posible.',
          timestamp: new Date().toLocaleTimeString()
        };
        establecerMensajesChat(prev => [...prev, respuestaVendedor]);
      }, 2000);
    }
  };

  const estadosPedido = [
    { icono: CheckCircle, estado: 'Pedido Confirmado', completado: true },
    { icono: Package, estado: 'Preparando Envío', completado: true },
    { icono: Truck, estado: 'En Camino', completado: false },
    { icono: CheckCircle, estado: 'Entregado', completado: false }
  ];

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
            <h2 className="text-2xl font-semibold mb-6">Estado de tu Pedido</h2>
            
            <div className="space-y-6">
              {estadosPedido.map((paso, index) => {
                const Icono = paso.icono;
                return (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${
                      paso.completado 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Icono className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        paso.completado ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {paso.estado}
                      </h3>
                      {paso.completado && (
                        <p className="text-sm text-gray-600">Completado</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Información de Envío</h3>
              <p className="text-blue-700 text-sm">
                Número de seguimiento: <strong>TRK123456789</strong>
              </p>
              <p className="text-blue-700 text-sm">
                Tiempo estimado de entrega: 2-3 días hábiles
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
                        {mensaje.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
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
