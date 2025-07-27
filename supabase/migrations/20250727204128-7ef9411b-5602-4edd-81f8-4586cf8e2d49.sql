-- Cambiar el tipo de usuario_id de bigint a uuid en carrito_items
ALTER TABLE carrito_items DROP CONSTRAINT IF EXISTS carrito_items_usuario_id_fkey;
ALTER TABLE carrito_items ALTER COLUMN usuario_id TYPE uuid USING usuario_id::text::uuid;

-- Actualizar la política RLS para usar UUID correctamente
DROP POLICY IF EXISTS "Users can manage their own cart" ON carrito_items;
CREATE POLICY "Users can manage their own cart" 
ON carrito_items 
FOR ALL 
USING (auth.uid() = usuario_id);