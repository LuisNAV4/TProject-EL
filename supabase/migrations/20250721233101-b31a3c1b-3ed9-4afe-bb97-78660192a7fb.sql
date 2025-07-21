-- Creación de tipos ENUM personalizados para PostgreSQL
CREATE TYPE estado_pedido_enum AS ENUM ('pendiente', 'procesando', 'enviado', 'entregado', 'cancelado', 'reembolsado');
CREATE TYPE metodo_pago_enum AS ENUM ('tarjeta_credito', 'paypal', 'transferencia_bancaria', 'contra_entrega');
CREATE TYPE estado_pago_enum AS ENUM ('pendiente', 'pagado', 'fallido', 'reembolsado');
CREATE TYPE estado_ticket_enum AS ENUM ('abierto', 'en_progreso', 'resuelto', 'cerrado');
CREATE TYPE prioridad_ticket_enum AS ENUM ('baja', 'media', 'alta', 'critica');
CREATE TYPE razon_inventario_enum AS ENUM ('reabastecimiento', 'venta', 'ajuste', 'devolucion', 'dañado', 'otro');
CREATE TYPE tipo_descuento_enum AS ENUM ('porcentaje', 'monto_fijo');

-- Tabla de Usuarios
CREATE TABLE usuarios (
    id BIGSERIAL PRIMARY KEY,
    correo VARCHAR(255) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    direccion TEXT,
    telefono VARCHAR(20),
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    es_administrador BOOLEAN DEFAULT FALSE,
    rol VARCHAR(50)
);

-- Tabla de Categorías
CREATE TABLE categorias (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    categoria_padre_id BIGINT,
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_padre_id) REFERENCES categorias(id) ON DELETE SET NULL
);

-- Tabla de Productos
CREATE TABLE productos (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    precio_original DECIMAL(10, 2),
    imagen_url VARCHAR(255) NOT NULL,
    calificacion DECIMAL(3, 2) DEFAULT 0.00,
    categoria_id BIGINT,
    descripcion TEXT,
    en_stock BOOLEAN DEFAULT TRUE,
    cantidad_stock INT DEFAULT 0,
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
);

-- Tabla de Historial de Precios
CREATE TABLE historial_precios (
    id BIGSERIAL PRIMARY KEY,
    producto_id BIGINT NOT NULL,
    precio_anterior DECIMAL(10, 2) NOT NULL,
    precio_nuevo DECIMAL(10, 2) NOT NULL,
    fecha_cambio TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    cambiado_por BIGINT,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
    FOREIGN KEY (cambiado_por) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- Tabla de Pedidos
CREATE TABLE pedidos (
    id BIGSERIAL PRIMARY KEY,
    numero_pedido VARCHAR(50) NOT NULL UNIQUE,
    usuario_id BIGINT NOT NULL,
    monto_total DECIMAL(10, 2) NOT NULL,
    estado estado_pedido_enum DEFAULT 'pendiente',
    direccion_envio TEXT NOT NULL,
    direccion_facturacion TEXT NOT NULL,
    metodo_pago metodo_pago_enum NOT NULL,
    estado_pago estado_pago_enum DEFAULT 'pendiente',
    fecha_pedido TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_estimada_entrega DATE,
    fecha_entrega TIMESTAMP WITH TIME ZONE NULL,
    numero_seguimiento VARCHAR(100),
    notas TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de Ítems de Pedido
CREATE TABLE items_pedido (
    id BIGSERIAL PRIMARY KEY,
    pedido_id BIGINT NOT NULL,
    producto_id BIGINT,
    nombre_producto VARCHAR(255) NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    cantidad INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE SET NULL
);

-- Tabla de Tickets de Soporte
CREATE TABLE tickets (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    estado estado_ticket_enum DEFAULT 'abierto',
    prioridad prioridad_ticket_enum DEFAULT 'media',
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_cierre TIMESTAMP WITH TIME ZONE NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de Mensajes de Tickets
CREATE TABLE mensajes_tickets (
    id BIGSERIAL PRIMARY KEY,
    ticket_id BIGINT NOT NULL,
    usuario_id BIGINT NOT NULL,
    mensaje TEXT NOT NULL,
    fecha TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de Archivos Adjuntos de Tickets
CREATE TABLE archivos_tickets (
    id BIGSERIAL PRIMARY KEY,
    ticket_id BIGINT NOT NULL,
    url_archivo VARCHAR(255) NOT NULL,
    tipo_archivo VARCHAR(50) NOT NULL,
    fecha_subida TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE
);

-- Tabla de Mensajes Directos
CREATE TABLE mensajes (
    id BIGSERIAL PRIMARY KEY,
    remitente VARCHAR(100) NOT NULL,
    usuario_id BIGINT NOT NULL,
    texto TEXT NOT NULL,
    fecha TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    es_administrador BOOLEAN DEFAULT FALSE,
    leido BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de Registro de Inventario
CREATE TABLE registro_inventario (
    id BIGSERIAL PRIMARY KEY,
    producto_id BIGINT NOT NULL,
    cambio_cantidad INT NOT NULL,
    razon razon_inventario_enum NOT NULL,
    usuario_id BIGINT,
    fecha TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- Tabla de Reseñas
CREATE TABLE resenas (
    id BIGSERIAL PRIMARY KEY,
    producto_id BIGINT NOT NULL,
    usuario_id BIGINT NOT NULL,
    calificacion INT NOT NULL,
    comentario TEXT,
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    UNIQUE (producto_id, usuario_id),
    CONSTRAINT chk_calificacion CHECK (calificacion BETWEEN 1 AND 5)
);

-- Tabla de Descuentos/Promociones
CREATE TABLE descuentos (
    id BIGSERIAL PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    tipo_descuento tipo_descuento_enum NOT NULL,
    valor_descuento DECIMAL(10, 2) NOT NULL,
    monto_minimo_pedido DECIMAL(10, 2) DEFAULT 0.00,
    fecha_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
    fecha_fin TIMESTAMP WITH TIME ZONE NOT NULL,
    usos_maximos INT,
    usos_actuales INT DEFAULT 0,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de relación entre pedidos y descuentos
CREATE TABLE pedidos_descuentos (
    pedido_id BIGINT NOT NULL,
    descuento_id BIGINT NOT NULL,
    monto_descuento DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (pedido_id, descuento_id),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (descuento_id) REFERENCES descuentos(id) ON DELETE CASCADE
);

-- Tabla para carrito de compras de usuarios registrados
CREATE TABLE carrito_items (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    producto_id BIGINT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    fecha_agregado TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
    UNIQUE (usuario_id, producto_id)
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_productos_categoria ON productos(categoria_id);
CREATE INDEX idx_pedidos_usuario ON pedidos(usuario_id);
CREATE INDEX idx_pedidos_estado ON pedidos(estado);
CREATE INDEX idx_tickets_usuario ON tickets(usuario_id);
CREATE INDEX idx_tickets_estado ON tickets(estado);
CREATE INDEX idx_resenas_producto ON resenas(producto_id);
CREATE INDEX idx_carrito_usuario ON carrito_items(usuario_id);

-- Habilitar Row Level Security
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE carrito_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensajes_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE archivos_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensajes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resenas ENABLE ROW LEVEL SECURITY;

-- Políticas RLS básicas
CREATE POLICY "Users can view their own data" ON usuarios
FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own data" ON usuarios
FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Users can manage their own cart" ON carrito_items
FOR ALL USING (auth.uid()::text = usuario_id::text);

CREATE POLICY "Users can view their own orders" ON pedidos
FOR SELECT USING (auth.uid()::text = usuario_id::text);

CREATE POLICY "Users can create their own orders" ON pedidos
FOR INSERT WITH CHECK (auth.uid()::text = usuario_id::text);

CREATE POLICY "Users can view their own tickets" ON tickets
FOR ALL USING (auth.uid()::text = usuario_id::text);

CREATE POLICY "Users can view their own ticket messages" ON mensajes_tickets
FOR ALL USING (auth.uid()::text = usuario_id::text);

CREATE POLICY "Users can view their own ticket files" ON archivos_tickets
FOR ALL USING (ticket_id IN (SELECT id FROM tickets WHERE usuario_id::text = auth.uid()::text));

CREATE POLICY "Users can view their own messages" ON mensajes
FOR ALL USING (auth.uid()::text = usuario_id::text);

CREATE POLICY "Users can view their own reviews" ON resenas
FOR ALL USING (auth.uid()::text = usuario_id::text);

-- Políticas públicas para productos y categorías
CREATE POLICY "Anyone can view products" ON productos
FOR SELECT USING (true);

CREATE POLICY "Anyone can view categories" ON categorias
FOR SELECT USING (true);

-- Función para actualizar fecha_actualizacion
CREATE OR REPLACE FUNCTION update_fecha_actualizacion()
RETURNS TRIGGER AS $$
BEGIN
   NEW.fecha_actualizacion = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualizar fecha_actualizacion
CREATE TRIGGER trigger_usuarios_fecha_actualizacion
BEFORE UPDATE ON usuarios
FOR EACH ROW
EXECUTE FUNCTION update_fecha_actualizacion();

CREATE TRIGGER trigger_productos_fecha_actualizacion
BEFORE UPDATE ON productos
FOR EACH ROW
EXECUTE FUNCTION update_fecha_actualizacion();

CREATE TRIGGER trigger_tickets_fecha_actualizacion
BEFORE UPDATE ON tickets
FOR EACH ROW
EXECUTE FUNCTION update_fecha_actualizacion();

CREATE TRIGGER trigger_resenas_fecha_actualizacion
BEFORE UPDATE ON resenas
FOR EACH ROW
EXECUTE FUNCTION update_fecha_actualizacion();