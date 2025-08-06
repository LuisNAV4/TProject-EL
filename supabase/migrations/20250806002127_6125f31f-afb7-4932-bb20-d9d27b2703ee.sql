-- Deshabilitar RLS y crear políticas permisivas para todas las tablas

-- Deshabilitar RLS en todas las tablas
ALTER TABLE public.tickets DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.archivos_tickets DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.carrito_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.categorias DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_qa DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.descuentos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.historial_precios DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.items_pedido DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.mensajes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.mensajes_seguimiento DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.mensajes_tickets DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.pago_movil_data DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos_descuentos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.productos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.registro_inventario DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.resenas DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.seguimiento_pedidos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.transferencia_data DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.usuarios DISABLE ROW LEVEL SECURITY;

-- Eliminar todas las políticas existentes
DROP POLICY IF EXISTS "Users can view their own tickets" ON public.tickets;
DROP POLICY IF EXISTS "Users can view their own ticket files" ON public.archivos_tickets;
DROP POLICY IF EXISTS "Users can manage their own cart" ON public.carrito_items;
DROP POLICY IF EXISTS "Anyone can view categories" ON public.categorias;
DROP POLICY IF EXISTS "Anyone can view chatbot QA" ON public.chatbot_qa;
DROP POLICY IF EXISTS "Los usuarios pueden ver descuentos activos" ON public.descuentos;
DROP POLICY IF EXISTS "Solo administradores pueden ver historial de precios" ON public.historial_precios;
DROP POLICY IF EXISTS "Los usuarios pueden ver items de sus pedidos" ON public.items_pedido;
DROP POLICY IF EXISTS "Users can view their own messages" ON public.mensajes;
DROP POLICY IF EXISTS "Support can create messages" ON public.mensajes_seguimiento;
DROP POLICY IF EXISTS "Users can create messages for their tracking" ON public.mensajes_seguimiento;
DROP POLICY IF EXISTS "Users can view messages from their tracking" ON public.mensajes_seguimiento;
DROP POLICY IF EXISTS "Users can view their own ticket messages" ON public.mensajes_tickets;
DROP POLICY IF EXISTS "Anyone can view payment mobile data" ON public.pago_movil_data;
DROP POLICY IF EXISTS "Users can create their own orders" ON public.pedidos;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.pedidos;
DROP POLICY IF EXISTS "Los usuarios pueden ver descuentos de sus pedidos" ON public.pedidos_descuentos;
DROP POLICY IF EXISTS "Anyone can view products" ON public.productos;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Los perfiles son visibles por todos" ON public.profiles;
DROP POLICY IF EXISTS "Los usuarios pueden actualizar su propio perfil" ON public.profiles;
DROP POLICY IF EXISTS "Los usuarios pueden insertar su propio perfil" ON public.profiles;
DROP POLICY IF EXISTS "Solo administradores pueden ver registro de inventario" ON public.registro_inventario;
DROP POLICY IF EXISTS "Users can create their own reviews" ON public.resenas;
DROP POLICY IF EXISTS "Users can update their own reviews" ON public.resenas;
DROP POLICY IF EXISTS "Users can view all reviews" ON public.resenas;
DROP POLICY IF EXISTS "Admins can update any tracking" ON public.seguimiento_pedidos;
DROP POLICY IF EXISTS "Users can create their own tracking" ON public.seguimiento_pedidos;
DROP POLICY IF EXISTS "Users can view their own tracking" ON public.seguimiento_pedidos;
DROP POLICY IF EXISTS "Anyone can view transfer data" ON public.transferencia_data;
DROP POLICY IF EXISTS "Users can update their own data" ON public.usuarios;
DROP POLICY IF EXISTS "Users can view their own data" ON public.usuarios;

-- Eliminar políticas de storage
DROP POLICY IF EXISTS "Users can upload ticket files" ON storage.objects;
DROP POLICY IF EXISTS "Users can view ticket files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload files" ON storage.objects;