-- Create configuration table
CREATE TABLE public.configuracion (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tasa_del_dolar DECIMAL(10,2) NOT NULL DEFAULT 100.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert initial configuration
INSERT INTO public.configuracion (tasa_del_dolar) VALUES (100.00);

-- Enable Row Level Security
ALTER TABLE public.configuracion ENABLE ROW LEVEL SECURITY;

-- Create policies - everyone can read configuration
CREATE POLICY "Everyone can view configuration" 
ON public.configuracion 
FOR SELECT 
USING (true);

-- Only admins can update configuration
CREATE POLICY "Admins can update configuration" 
ON public.configuracion 
FOR UPDATE 
USING (get_current_user_role() = 'admin');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_configuracion_updated_at
BEFORE UPDATE ON public.configuracion
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();