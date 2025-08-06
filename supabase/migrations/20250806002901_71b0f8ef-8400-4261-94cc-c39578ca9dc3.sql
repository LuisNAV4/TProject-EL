-- Corregir el tipo de dato de usuario_id en tickets para usar UUID
-- Primero eliminar la foreign key existente
ALTER TABLE public.tickets DROP CONSTRAINT IF EXISTS tickets_usuario_id_fkey;

-- Cambiar el tipo de columna a UUID
ALTER TABLE public.tickets ALTER COLUMN usuario_id TYPE UUID USING usuario_id::text::uuid;

-- Crear nueva foreign key que referencia a profiles (no a usuarios)
ALTER TABLE public.tickets ADD CONSTRAINT tickets_usuario_id_fkey 
FOREIGN KEY (usuario_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- También corregir archivos_tickets si es necesario
-- Primero verificar si tiene foreign key y eliminarla
ALTER TABLE public.archivos_tickets DROP CONSTRAINT IF EXISTS archivos_tickets_ticket_id_fkey;

-- Recrear la foreign key correcta
ALTER TABLE public.archivos_tickets ADD CONSTRAINT archivos_tickets_ticket_id_fkey 
FOREIGN KEY (ticket_id) REFERENCES public.tickets(id) ON DELETE CASCADE;

-- Corregir mensajes_tickets también
ALTER TABLE public.mensajes_tickets DROP CONSTRAINT IF EXISTS mensajes_tickets_usuario_id_fkey;
ALTER TABLE public.mensajes_tickets ALTER COLUMN usuario_id TYPE UUID USING usuario_id::text::uuid;
ALTER TABLE public.mensajes_tickets ADD CONSTRAINT mensajes_tickets_usuario_id_fkey 
FOREIGN KEY (usuario_id) REFERENCES public.profiles(id) ON DELETE CASCADE;