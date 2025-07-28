-- Arreglar problemas de seguridad para las nuevas tablas solamente
-- Estas son las tablas que acabamos de crear: pago_movil_data, transferencia_data, chatbot_qa

-- Habilitar RLS en las nuevas tablas (ya estaba habilitado, pero por si acaso)
ALTER TABLE public.pago_movil_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transferencia_data ENABLE ROW LEVEL SECURITY; 
ALTER TABLE public.chatbot_qa ENABLE ROW LEVEL SECURITY;

-- Arreglar la función de trigger para que tenga search_path fijo
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;