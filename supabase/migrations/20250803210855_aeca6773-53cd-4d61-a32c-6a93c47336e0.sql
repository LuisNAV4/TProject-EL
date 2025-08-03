-- Update RLS policy for resenas to allow viewing all reviews
DROP POLICY IF EXISTS "Users can view their own reviews" ON public.resenas;

CREATE POLICY "Users can view all reviews" 
ON public.resenas 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own reviews" 
ON public.resenas 
FOR INSERT 
WITH CHECK (auth.uid()::text = usuario_id::text);

CREATE POLICY "Users can update their own reviews" 
ON public.resenas 
FOR UPDATE 
USING (auth.uid()::text = usuario_id::text);