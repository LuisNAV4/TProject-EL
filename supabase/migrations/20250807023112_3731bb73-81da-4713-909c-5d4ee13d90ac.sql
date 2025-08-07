-- First, let's see what tables have usuario_id as bigint vs uuid
-- and fix the pedidos and carrito_items tables to use UUID instead of bigint

-- Update pedidos table to use UUID for usuario_id
ALTER TABLE public.pedidos DROP CONSTRAINT IF EXISTS pedidos_usuario_id_fkey;
ALTER TABLE public.pedidos ALTER COLUMN usuario_id TYPE UUID USING NULL;

-- Update carrito_items table to use UUID for usuario_id  
ALTER TABLE public.carrito_items DROP CONSTRAINT IF EXISTS carrito_items_usuario_id_fkey;
ALTER TABLE public.carrito_items ALTER COLUMN usuario_id TYPE UUID USING NULL;

-- Now add foreign key constraints to link to auth.users
ALTER TABLE public.pedidos 
ADD CONSTRAINT pedidos_usuario_id_fkey 
FOREIGN KEY (usuario_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.carrito_items 
ADD CONSTRAINT carrito_items_usuario_id_fkey 
FOREIGN KEY (usuario_id) REFERENCES auth.users(id) ON DELETE CASCADE;