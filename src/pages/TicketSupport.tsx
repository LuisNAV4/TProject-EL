
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '../components/Header';
import { usarCarrito } from '../contexts/CartContext';

const TicketSupport = () => {
  const navigate = useNavigate();
  const { contadorArticulosCarrito, establecerCarritoAbierto } = usarCarrito();
  const [mensaje, establecerMensaje] = useState('');
  const [imagenSeleccionada, establecerImagenSeleccionada] = useState<File | null>(null);
  const [previsualizacionImagen, establecerPrevisualizacionImagen] = useState<string>('');

  const manejarSeleccionImagen = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = evento.target.files?.[0];
    if (archivo) {
      establecerImagenSeleccionada(archivo);
      const lector = new FileReader();
      lector.onload = (e) => {
        establecerPrevisualizacionImagen(e.target?.result as string);
      };
      lector.readAsDataURL(archivo);
    }
  };

  const enviarTicket = () => {
    if (mensaje.trim()) {
      // Simular envío del ticket
      alert('Ticket enviado correctamente. Te contactaremos pronto.');
      establecerMensaje('');
      establecerImagenSeleccionada(null);
      establecerPrevisualizacionImagen('');
      navigate('/tracking');
    }
  };

  return (
    <div className="min-h-screen bg-color-primary">
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
          <h1 className="text-3xl font-bold">Reportar Problema</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Cuéntanos qué ha pasado</h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="mensaje" className="text-base font-medium">
                  Describe el problema *
                </Label>
                <textarea
                  id="mensaje"
                  value={mensaje}
                  onChange={(e) => establecerMensaje(e.target.value)}
                  placeholder="Describe detalladamente el problema que has experimentado..."
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={6}
                  required
                />
              </div>

              <div>
                <Label className="text-base font-medium">
                  Adjuntar imagen (opcional)
                </Label>
                <div className="mt-2">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click para subir</span> o arrastra una imagen
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={manejarSeleccionImagen}
                      />
                    </label>
                  </div>
                </div>

                {previsualizacionImagen && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Vista previa:</p>
                    <div className="relative inline-block">
                      <img
                        src={previsualizacionImagen}
                        alt="Vista previa"
                        className="max-w-xs h-48 object-cover rounded-lg border"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          establecerImagenSeleccionada(null);
                          establecerPrevisualizacionImagen('');
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white hover:bg-red-600"
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Información importante:</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Responderemos a tu ticket en un plazo de 24 horas.</li>
                  <li>• Incluye toda la información relevante para una mejor asistencia.</li>
                  <li>• Si tienes fotos del problema, súbelas para agilizar el proceso.</li>
                </ul>
              </div>

              <Button
                onClick={enviarTicket}
                disabled={!mensaje.trim()}
                className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:brightness-110 flex items-center justify-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar Ticket
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSupport;
