
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Upload, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Header from '../components/Header';
import { usarCarrito } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { WhatsAppFloat } from "@/components/ui/whatsapp";

const ticketSchema = z.object({
  email: z.string().email('Ingresa un email válido'),
  mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type TicketFormData = z.infer<typeof ticketSchema>;

const TicketSupport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const { contadorArticulosCarrito, establecerCarritoAbierto } = usarCarrito();
  const [imagenSeleccionada, establecerImagenSeleccionada] = useState<File | null>(null);
  const [previsualizacionImagen, establecerPrevisualizacionImagen] = useState<string>('');
  const [enviando, setEnviando] = useState(false);

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      email: user?.email || '',
      mensaje: '',
    },
  });

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

  const onSubmit = async (data: TicketFormData) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debes estar registrado para enviar un ticket",
        variant: "destructive",
      });
      return;
    }

    setEnviando(true);

    try {
      // Crear el ticket en la base de datos
      const { data: ticketData, error: ticketError } = await supabase
        .from('tickets')
        .insert({
          titulo: 'Reporte de problema',
          descripcion: data.mensaje,
          usuario_id: parseInt(user.id) || 0, // Convertir UUID a bigint si es necesario
          estado: 'abierto',
          prioridad: 'media'
        })
        .select()
        .single();

      if (ticketError) throw ticketError;

      // Si hay imagen, subirla al storage
      if (imagenSeleccionada && ticketData) {
        const fileName = `${user.id}/${ticketData.id}_${Date.now()}_${imagenSeleccionada.name}`;
        
        const { error: uploadError } = await supabase.storage
          .from('tickets')
          .upload(fileName, imagenSeleccionada);

        if (uploadError) throw uploadError;

        // Crear registro en archivos_tickets
        const { error: archivoError } = await supabase
          .from('archivos_tickets')
          .insert({
            ticket_id: ticketData.id,
            tipo_archivo: imagenSeleccionada.type,
            url_archivo: fileName
          });

        if (archivoError) throw archivoError;
      }

      toast({
        title: "Ticket enviado",
        description: "Tu ticket ha sido enviado correctamente. Te contactaremos pronto.",
      });

      // Limpiar formulario
      form.reset();
      establecerImagenSeleccionada(null);
      establecerPrevisualizacionImagen('');

      // Determinar a dónde regresar basado en el estado de location
      const returnTo = location.state?.from || '/';
      navigate(returnTo);

    } catch (error) {
      console.error('Error al enviar ticket:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu ticket. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setEnviando(false);
    }
  };

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
          <h1 className="text-3xl font-bold">Reportar Problema</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Cuéntanos qué ha pasado</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {!user && (
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">
                          Correo electrónico *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="tu@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="mensaje"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Describe el problema *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe detalladamente el problema que has experimentado..."
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          type="button"
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
                  type="submit"
                  disabled={enviando}
                  className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:brightness-110 flex items-center justify-center"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {enviando ? 'Enviando...' : 'Enviar Ticket'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSupport;
