-- Allow non-registered users to send tickets by making usuario_id nullable
ALTER TABLE public.tickets 
ALTER COLUMN usuario_id DROP NOT NULL;

-- Also update mensajes_tickets to allow nullable usuario_id for consistency
ALTER TABLE public.mensajes_tickets 
ALTER COLUMN usuario_id DROP NOT NULL;