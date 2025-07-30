-- Create storage bucket for payment receipts
INSERT INTO storage.buckets (id, name, public) VALUES ('comprobantes-pago', 'comprobantes-pago', false);

-- Create policies for payment receipt uploads
CREATE POLICY "Users can upload their payment receipts" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'comprobantes-pago' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their payment receipts" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'comprobantes-pago' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add payment reference and receipt URL columns to pedidos table
ALTER TABLE public.pedidos 
ADD COLUMN numero_referencia_pago character varying,
ADD COLUMN url_comprobante_pago character varying,
ADD COLUMN fecha_pago timestamp with time zone;