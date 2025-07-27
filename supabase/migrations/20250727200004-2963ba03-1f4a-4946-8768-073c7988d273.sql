-- Create tracking orders table
CREATE TABLE public.seguimiento_pedidos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  numero_pedido VARCHAR NOT NULL UNIQUE,
  estado_actual VARCHAR NOT NULL DEFAULT 'pedido_confirmado',
  numero_seguimiento VARCHAR,
  fecha_creacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  fecha_actualizacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  tiempo_estimado_entrega VARCHAR DEFAULT '2-3 días hábiles',
  usuario_id UUID REFERENCES auth.users(id),
  detalles JSONB DEFAULT '[]'::jsonb
);

-- Enable RLS
ALTER TABLE public.seguimiento_pedidos ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own tracking" 
ON public.seguimiento_pedidos 
FOR SELECT 
USING (auth.uid() = usuario_id);

CREATE POLICY "Users can create their own tracking" 
ON public.seguimiento_pedidos 
FOR INSERT 
WITH CHECK (auth.uid() = usuario_id);

-- Admin can update any tracking (for admin panel)
CREATE POLICY "Admins can update any tracking" 
ON public.seguimiento_pedidos 
FOR UPDATE 
USING (true); -- This will be refined with admin role check later

-- Create tracking messages table for isolated chat
CREATE TABLE public.mensajes_seguimiento (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seguimiento_id UUID NOT NULL REFERENCES public.seguimiento_pedidos(id) ON DELETE CASCADE,
  usuario_id UUID REFERENCES auth.users(id),
  mensaje TEXT NOT NULL,
  remitente VARCHAR NOT NULL, -- 'usuario' or 'soporte'
  fecha TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  leido BOOLEAN DEFAULT false
);

-- Enable RLS for tracking messages
ALTER TABLE public.mensajes_seguimiento ENABLE ROW LEVEL SECURITY;

-- Policies for tracking messages
CREATE POLICY "Users can view messages from their tracking" 
ON public.mensajes_seguimiento 
FOR SELECT 
USING (
  seguimiento_id IN (
    SELECT id FROM public.seguimiento_pedidos 
    WHERE usuario_id = auth.uid()
  )
);

CREATE POLICY "Users can create messages for their tracking" 
ON public.mensajes_seguimiento 
FOR INSERT 
WITH CHECK (
  seguimiento_id IN (
    SELECT id FROM public.seguimiento_pedidos 
    WHERE usuario_id = auth.uid()
  )
);

-- Support can insert messages (admin role check will be added later)
CREATE POLICY "Support can create messages" 
ON public.mensajes_seguimiento 
FOR INSERT 
WITH CHECK (remitente = 'soporte');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_seguimiento_pedidos_updated_at
BEFORE UPDATE ON public.seguimiento_pedidos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for both tables
ALTER TABLE public.seguimiento_pedidos REPLICA IDENTITY FULL;
ALTER TABLE public.mensajes_seguimiento REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.seguimiento_pedidos;
ALTER PUBLICATION supabase_realtime ADD TABLE public.mensajes_seguimiento;

-- Insert sample tracking data
INSERT INTO public.seguimiento_pedidos (
  numero_pedido, 
  estado_actual, 
  numero_seguimiento, 
  tiempo_estimado_entrega,
  usuario_id,
  detalles
) VALUES (
  'TRK123456789',
  'preparando_envio',
  'TRK123456789',
  '2-3 días hábiles',
  (SELECT id FROM auth.users LIMIT 1), -- This will use the first user, can be updated
  '[
    {
      "estado": "pedido_confirmado",
      "fecha": "2024-01-20T10:00:00Z",
      "completado": true,
      "descripcion": "Tu pedido ha sido confirmado"
    },
    {
      "estado": "preparando_envio", 
      "fecha": "2024-01-20T14:30:00Z",
      "completado": true,
      "descripcion": "Preparando tu pedido para envío"
    },
    {
      "estado": "en_camino",
      "fecha": null,
      "completado": false,
      "descripcion": "Tu pedido está en camino"
    },
    {
      "estado": "entregado",
      "fecha": null,
      "completado": false,
      "descripcion": "Pedido entregado exitosamente"
    }
  ]'::jsonb
);