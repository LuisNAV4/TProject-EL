-- Crear tabla para métodos de pago móvil
CREATE TABLE public.pago_movil_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  telefono VARCHAR NOT NULL,
  cedula VARCHAR NOT NULL,
  nombre VARCHAR NOT NULL,
  banco VARCHAR NOT NULL,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Crear tabla para datos de transferencia bancaria
CREATE TABLE public.transferencia_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  numero_cuenta VARCHAR NOT NULL,
  cedula VARCHAR NOT NULL,
  nombre VARCHAR NOT NULL,
  banco VARCHAR NOT NULL,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Crear tabla para preguntas y respuestas del chatbot
CREATE TABLE public.chatbot_qa (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pregunta TEXT NOT NULL,
  respuesta TEXT NOT NULL,
  categoria VARCHAR,
  orden INTEGER DEFAULT 0,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pago_movil_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transferencia_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_qa ENABLE ROW LEVEL SECURITY;

-- Políticas RLS - solo lectura para todos
CREATE POLICY "Anyone can view payment mobile data" 
ON public.pago_movil_data 
FOR SELECT 
USING (activo = true);

CREATE POLICY "Anyone can view transfer data" 
ON public.transferencia_data 
FOR SELECT 
USING (activo = true);

CREATE POLICY "Anyone can view chatbot QA" 
ON public.chatbot_qa 
FOR SELECT 
USING (activo = true);

-- Insertar datos de ejemplo para pago móvil
INSERT INTO public.pago_movil_data (telefono, cedula, nombre, banco) VALUES
('0424-1234567', '12345678', 'Juan Pérez', 'Banesco'),
('0414-9876543', '87654321', 'María González', 'Mercantil');

-- Insertar datos de ejemplo para transferencia bancaria
INSERT INTO public.transferencia_data (numero_cuenta, cedula, nombre, banco) VALUES
('01020123456789012345', '12345678', 'Juan Pérez', 'Banesco'),
('01050987654321098765', '87654321', 'María González', 'Mercantil');

-- Insertar preguntas y respuestas de ejemplo para el chatbot
INSERT INTO public.chatbot_qa (pregunta, respuesta, categoria, orden) VALUES
('¿Cuáles son los métodos de pago?', 'Aceptamos Pago Móvil, Transferencia Bancaria, PayPal y Stripe.', 'pagos', 1),
('¿Cuánto tiempo tarda el envío?', 'El envío tarda entre 2-5 días hábiles dependiendo de tu ubicación.', 'envios', 2),
('¿Puedo devolver un producto?', 'Sí, tienes 30 días para devolver cualquier producto en perfecto estado.', 'devoluciones', 3),
('¿Cómo puedo rastrear mi pedido?', 'Puedes rastrear tu pedido desde la sección "Seguimiento" en tu cuenta.', 'seguimiento', 4),
('¿Tienen garantía los productos?', 'Todos nuestros productos tienen garantía de 1 año por defectos de fábrica.', 'garantia', 5);

-- Triggers para updated_at
CREATE TRIGGER update_pago_movil_data_updated_at
BEFORE UPDATE ON public.pago_movil_data
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_transferencia_data_updated_at
BEFORE UPDATE ON public.transferencia_data
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_chatbot_qa_updated_at
BEFORE UPDATE ON public.chatbot_qa
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();