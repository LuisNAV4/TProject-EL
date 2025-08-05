-- Crear bucket para archivos de tickets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('tickets', 'tickets', false);

-- Crear políticas para el bucket de tickets
CREATE POLICY "Users can upload their own ticket files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'tickets' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own ticket files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'tickets' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Admins can view all ticket files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'tickets' AND EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() AND profiles.is_admin = true
));