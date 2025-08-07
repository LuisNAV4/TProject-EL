export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      archivos_tickets: {
        Row: {
          fecha_subida: string | null
          id: number
          ticket_id: number
          tipo_archivo: string
          url_archivo: string
        }
        Insert: {
          fecha_subida?: string | null
          id?: number
          ticket_id: number
          tipo_archivo: string
          url_archivo: string
        }
        Update: {
          fecha_subida?: string | null
          id?: number
          ticket_id?: number
          tipo_archivo?: string
          url_archivo?: string
        }
        Relationships: [
          {
            foreignKeyName: "archivos_tickets_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      carrito_items: {
        Row: {
          cantidad: number
          fecha_agregado: string | null
          id: number
          producto_id: number
          usuario_id: number
        }
        Insert: {
          cantidad?: number
          fecha_agregado?: string | null
          id?: number
          producto_id: number
          usuario_id: number
        }
        Update: {
          cantidad?: number
          fecha_agregado?: string | null
          id?: number
          producto_id?: number
          usuario_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "carrito_items_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "carrito_items_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      categorias: {
        Row: {
          categoria_padre_id: number | null
          descripcion: string | null
          fecha_creacion: string | null
          id: number
          nombre: string
        }
        Insert: {
          categoria_padre_id?: number | null
          descripcion?: string | null
          fecha_creacion?: string | null
          id?: number
          nombre: string
        }
        Update: {
          categoria_padre_id?: number | null
          descripcion?: string | null
          fecha_creacion?: string | null
          id?: number
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "categorias_categoria_padre_id_fkey"
            columns: ["categoria_padre_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
        ]
      }
      chatbot_qa: {
        Row: {
          activo: boolean | null
          categoria: string | null
          created_at: string
          id: string
          orden: number | null
          pregunta: string
          respuesta: string
          updated_at: string
        }
        Insert: {
          activo?: boolean | null
          categoria?: string | null
          created_at?: string
          id?: string
          orden?: number | null
          pregunta: string
          respuesta: string
          updated_at?: string
        }
        Update: {
          activo?: boolean | null
          categoria?: string | null
          created_at?: string
          id?: string
          orden?: number | null
          pregunta?: string
          respuesta?: string
          updated_at?: string
        }
        Relationships: []
      }
      configuracion: {
        Row: {
          created_at: string
          id: string
          tasa_del_dolar: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          tasa_del_dolar?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          tasa_del_dolar?: number
          updated_at?: string
        }
        Relationships: []
      }
      descuentos: {
        Row: {
          activo: boolean | null
          codigo: string
          descripcion: string | null
          fecha_creacion: string | null
          fecha_fin: string
          fecha_inicio: string
          id: number
          monto_minimo_pedido: number | null
          tipo_descuento: Database["public"]["Enums"]["tipo_descuento_enum"]
          usos_actuales: number | null
          usos_maximos: number | null
          valor_descuento: number
        }
        Insert: {
          activo?: boolean | null
          codigo: string
          descripcion?: string | null
          fecha_creacion?: string | null
          fecha_fin: string
          fecha_inicio: string
          id?: number
          monto_minimo_pedido?: number | null
          tipo_descuento: Database["public"]["Enums"]["tipo_descuento_enum"]
          usos_actuales?: number | null
          usos_maximos?: number | null
          valor_descuento: number
        }
        Update: {
          activo?: boolean | null
          codigo?: string
          descripcion?: string | null
          fecha_creacion?: string | null
          fecha_fin?: string
          fecha_inicio?: string
          id?: number
          monto_minimo_pedido?: number | null
          tipo_descuento?: Database["public"]["Enums"]["tipo_descuento_enum"]
          usos_actuales?: number | null
          usos_maximos?: number | null
          valor_descuento?: number
        }
        Relationships: []
      }
      historial_precios: {
        Row: {
          cambiado_por: number | null
          fecha_cambio: string | null
          id: number
          precio_anterior: number
          precio_nuevo: number
          producto_id: number
        }
        Insert: {
          cambiado_por?: number | null
          fecha_cambio?: string | null
          id?: number
          precio_anterior: number
          precio_nuevo: number
          producto_id: number
        }
        Update: {
          cambiado_por?: number | null
          fecha_cambio?: string | null
          id?: number
          precio_anterior?: number
          precio_nuevo?: number
          producto_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "historial_precios_cambiado_por_fkey"
            columns: ["cambiado_por"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "historial_precios_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
        ]
      }
      items_pedido: {
        Row: {
          cantidad: number
          id: number
          nombre_producto: string
          pedido_id: number
          precio_unitario: number
          producto_id: number | null
          subtotal: number
        }
        Insert: {
          cantidad: number
          id?: number
          nombre_producto: string
          pedido_id: number
          precio_unitario: number
          producto_id?: number | null
          subtotal: number
        }
        Update: {
          cantidad?: number
          id?: number
          nombre_producto?: string
          pedido_id?: number
          precio_unitario?: number
          producto_id?: number | null
          subtotal?: number
        }
        Relationships: [
          {
            foreignKeyName: "items_pedido_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "items_pedido_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
        ]
      }
      mensajes: {
        Row: {
          es_administrador: boolean | null
          fecha: string | null
          id: number
          leido: boolean | null
          remitente: string
          texto: string
          usuario_id: number
        }
        Insert: {
          es_administrador?: boolean | null
          fecha?: string | null
          id?: number
          leido?: boolean | null
          remitente: string
          texto: string
          usuario_id: number
        }
        Update: {
          es_administrador?: boolean | null
          fecha?: string | null
          id?: number
          leido?: boolean | null
          remitente?: string
          texto?: string
          usuario_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "mensajes_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      mensajes_seguimiento: {
        Row: {
          fecha: string
          id: string
          leido: boolean | null
          mensaje: string
          remitente: string
          seguimiento_id: string
          usuario_id: string | null
        }
        Insert: {
          fecha?: string
          id?: string
          leido?: boolean | null
          mensaje: string
          remitente: string
          seguimiento_id: string
          usuario_id?: string | null
        }
        Update: {
          fecha?: string
          id?: string
          leido?: boolean | null
          mensaje?: string
          remitente?: string
          seguimiento_id?: string
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mensajes_seguimiento_seguimiento_id_fkey"
            columns: ["seguimiento_id"]
            isOneToOne: false
            referencedRelation: "seguimiento_pedidos"
            referencedColumns: ["id"]
          },
        ]
      }
      mensajes_tickets: {
        Row: {
          fecha: string | null
          id: number
          mensaje: string
          ticket_id: number
          usuario_id: string | null
        }
        Insert: {
          fecha?: string | null
          id?: number
          mensaje: string
          ticket_id: number
          usuario_id?: string | null
        }
        Update: {
          fecha?: string | null
          id?: number
          mensaje?: string
          ticket_id?: number
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mensajes_tickets_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mensajes_tickets_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pago_movil_data: {
        Row: {
          activo: boolean | null
          banco: string
          cedula: string
          created_at: string
          id: string
          nombre: string
          telefono: string
          updated_at: string
        }
        Insert: {
          activo?: boolean | null
          banco: string
          cedula: string
          created_at?: string
          id?: string
          nombre: string
          telefono: string
          updated_at?: string
        }
        Update: {
          activo?: boolean | null
          banco?: string
          cedula?: string
          created_at?: string
          id?: string
          nombre?: string
          telefono?: string
          updated_at?: string
        }
        Relationships: []
      }
      pedidos: {
        Row: {
          direccion_envio: string
          direccion_facturacion: string
          estado: Database["public"]["Enums"]["estado_pedido_enum"] | null
          estado_pago: Database["public"]["Enums"]["estado_pago_enum"] | null
          fecha_entrega: string | null
          fecha_estimada_entrega: string | null
          fecha_pago: string | null
          fecha_pedido: string | null
          id: number
          metodo_pago: Database["public"]["Enums"]["metodo_pago_enum"]
          monto_total: number
          notas: string | null
          numero_pedido: string
          numero_referencia_pago: string | null
          numero_seguimiento: string | null
          url_comprobante_pago: string | null
          usuario_id: number
        }
        Insert: {
          direccion_envio: string
          direccion_facturacion: string
          estado?: Database["public"]["Enums"]["estado_pedido_enum"] | null
          estado_pago?: Database["public"]["Enums"]["estado_pago_enum"] | null
          fecha_entrega?: string | null
          fecha_estimada_entrega?: string | null
          fecha_pago?: string | null
          fecha_pedido?: string | null
          id?: number
          metodo_pago: Database["public"]["Enums"]["metodo_pago_enum"]
          monto_total: number
          notas?: string | null
          numero_pedido: string
          numero_referencia_pago?: string | null
          numero_seguimiento?: string | null
          url_comprobante_pago?: string | null
          usuario_id: number
        }
        Update: {
          direccion_envio?: string
          direccion_facturacion?: string
          estado?: Database["public"]["Enums"]["estado_pedido_enum"] | null
          estado_pago?: Database["public"]["Enums"]["estado_pago_enum"] | null
          fecha_entrega?: string | null
          fecha_estimada_entrega?: string | null
          fecha_pago?: string | null
          fecha_pedido?: string | null
          id?: number
          metodo_pago?: Database["public"]["Enums"]["metodo_pago_enum"]
          monto_total?: number
          notas?: string | null
          numero_pedido?: string
          numero_referencia_pago?: string | null
          numero_seguimiento?: string | null
          url_comprobante_pago?: string | null
          usuario_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "pedidos_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      pedidos_descuentos: {
        Row: {
          descuento_id: number
          monto_descuento: number
          pedido_id: number
        }
        Insert: {
          descuento_id: number
          monto_descuento: number
          pedido_id: number
        }
        Update: {
          descuento_id?: number
          monto_descuento?: number
          pedido_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "pedidos_descuentos_descuento_id_fkey"
            columns: ["descuento_id"]
            isOneToOne: false
            referencedRelation: "descuentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_descuentos_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos"
            referencedColumns: ["id"]
          },
        ]
      }
      productos: {
        Row: {
          calificacion: number | null
          cantidad_stock: number | null
          categoria_id: number | null
          descripcion: string | null
          en_stock: boolean | null
          fecha_actualizacion: string | null
          fecha_creacion: string | null
          id: number
          imagen_url: string
          nombre: string
          precio: number
          precio_original: number | null
        }
        Insert: {
          calificacion?: number | null
          cantidad_stock?: number | null
          categoria_id?: number | null
          descripcion?: string | null
          en_stock?: boolean | null
          fecha_actualizacion?: string | null
          fecha_creacion?: string | null
          id?: number
          imagen_url: string
          nombre: string
          precio: number
          precio_original?: number | null
        }
        Update: {
          calificacion?: number | null
          cantidad_stock?: number | null
          categoria_id?: number | null
          descripcion?: string | null
          en_stock?: boolean | null
          fecha_actualizacion?: string | null
          fecha_creacion?: string | null
          id?: number
          imagen_url?: string
          nombre?: string
          precio?: number
          precio_original?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "productos_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: string
          is_admin: boolean | null
          nombre_completo: string | null
          nombre_usuario: string | null
          rol: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          is_admin?: boolean | null
          nombre_completo?: string | null
          nombre_usuario?: string | null
          rol?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_admin?: boolean | null
          nombre_completo?: string | null
          nombre_usuario?: string | null
          rol?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      registro_inventario: {
        Row: {
          cambio_cantidad: number
          fecha: string | null
          id: number
          producto_id: number
          razon: Database["public"]["Enums"]["razon_inventario_enum"]
          usuario_id: number | null
        }
        Insert: {
          cambio_cantidad: number
          fecha?: string | null
          id?: number
          producto_id: number
          razon: Database["public"]["Enums"]["razon_inventario_enum"]
          usuario_id?: number | null
        }
        Update: {
          cambio_cantidad?: number
          fecha?: string | null
          id?: number
          producto_id?: number
          razon?: Database["public"]["Enums"]["razon_inventario_enum"]
          usuario_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "registro_inventario_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registro_inventario_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      resenas: {
        Row: {
          calificacion: number
          comentario: string | null
          fecha_actualizacion: string | null
          fecha_creacion: string | null
          id: number
          producto_id: number
          usuario_id: number
        }
        Insert: {
          calificacion: number
          comentario?: string | null
          fecha_actualizacion?: string | null
          fecha_creacion?: string | null
          id?: number
          producto_id: number
          usuario_id: number
        }
        Update: {
          calificacion?: number
          comentario?: string | null
          fecha_actualizacion?: string | null
          fecha_creacion?: string | null
          id?: number
          producto_id?: number
          usuario_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "resenas_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resenas_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      seguimiento_pedidos: {
        Row: {
          detalles: Json | null
          estado_actual: string
          fecha_actualizacion: string
          fecha_creacion: string
          id: string
          numero_pedido: string
          numero_seguimiento: string | null
          tiempo_estimado_entrega: string | null
          usuario_id: string | null
        }
        Insert: {
          detalles?: Json | null
          estado_actual?: string
          fecha_actualizacion?: string
          fecha_creacion?: string
          id?: string
          numero_pedido: string
          numero_seguimiento?: string | null
          tiempo_estimado_entrega?: string | null
          usuario_id?: string | null
        }
        Update: {
          detalles?: Json | null
          estado_actual?: string
          fecha_actualizacion?: string
          fecha_creacion?: string
          id?: string
          numero_pedido?: string
          numero_seguimiento?: string | null
          tiempo_estimado_entrega?: string | null
          usuario_id?: string | null
        }
        Relationships: []
      }
      tickets: {
        Row: {
          descripcion: string
          estado: Database["public"]["Enums"]["estado_ticket_enum"] | null
          fecha_actualizacion: string | null
          fecha_cierre: string | null
          fecha_creacion: string | null
          id: number
          prioridad: Database["public"]["Enums"]["prioridad_ticket_enum"] | null
          titulo: string
          usuario_id: string | null
        }
        Insert: {
          descripcion: string
          estado?: Database["public"]["Enums"]["estado_ticket_enum"] | null
          fecha_actualizacion?: string | null
          fecha_cierre?: string | null
          fecha_creacion?: string | null
          id?: number
          prioridad?:
            | Database["public"]["Enums"]["prioridad_ticket_enum"]
            | null
          titulo: string
          usuario_id?: string | null
        }
        Update: {
          descripcion?: string
          estado?: Database["public"]["Enums"]["estado_ticket_enum"] | null
          fecha_actualizacion?: string | null
          fecha_cierre?: string | null
          fecha_creacion?: string | null
          id?: number
          prioridad?:
            | Database["public"]["Enums"]["prioridad_ticket_enum"]
            | null
          titulo?: string
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transferencia_data: {
        Row: {
          activo: boolean | null
          banco: string
          cedula: string
          created_at: string
          id: string
          nombre: string
          numero_cuenta: string
          updated_at: string
        }
        Insert: {
          activo?: boolean | null
          banco: string
          cedula: string
          created_at?: string
          id?: string
          nombre: string
          numero_cuenta: string
          updated_at?: string
        }
        Update: {
          activo?: boolean | null
          banco?: string
          cedula?: string
          created_at?: string
          id?: string
          nombre?: string
          numero_cuenta?: string
          updated_at?: string
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          contraseña: string
          correo: string
          direccion: string | null
          es_administrador: boolean | null
          fecha_actualizacion: string | null
          fecha_creacion: string | null
          id: number
          nombre: string
          rol: string | null
          telefono: string | null
        }
        Insert: {
          contraseña: string
          correo: string
          direccion?: string | null
          es_administrador?: boolean | null
          fecha_actualizacion?: string | null
          fecha_creacion?: string | null
          id?: number
          nombre: string
          rol?: string | null
          telefono?: string | null
        }
        Update: {
          contraseña?: string
          correo?: string
          direccion?: string | null
          es_administrador?: boolean | null
          fecha_actualizacion?: string | null
          fecha_creacion?: string | null
          id?: number
          nombre?: string
          rol?: string | null
          telefono?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      estado_pago_enum: "pendiente" | "pagado" | "fallido" | "reembolsado"
      estado_pedido_enum:
        | "pendiente"
        | "procesando"
        | "enviado"
        | "entregado"
        | "cancelado"
        | "reembolsado"
      estado_ticket_enum: "abierto" | "en_progreso" | "resuelto" | "cerrado"
      metodo_pago_enum:
        | "tarjeta_credito"
        | "paypal"
        | "transferencia_bancaria"
        | "contra_entrega"
      prioridad_ticket_enum: "baja" | "media" | "alta" | "critica"
      razon_inventario_enum:
        | "reabastecimiento"
        | "venta"
        | "ajuste"
        | "devolucion"
        | "dañado"
        | "otro"
      tipo_descuento_enum: "porcentaje" | "monto_fijo"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      estado_pago_enum: ["pendiente", "pagado", "fallido", "reembolsado"],
      estado_pedido_enum: [
        "pendiente",
        "procesando",
        "enviado",
        "entregado",
        "cancelado",
        "reembolsado",
      ],
      estado_ticket_enum: ["abierto", "en_progreso", "resuelto", "cerrado"],
      metodo_pago_enum: [
        "tarjeta_credito",
        "paypal",
        "transferencia_bancaria",
        "contra_entrega",
      ],
      prioridad_ticket_enum: ["baja", "media", "alta", "critica"],
      razon_inventario_enum: [
        "reabastecimiento",
        "venta",
        "ajuste",
        "devolucion",
        "dañado",
        "otro",
      ],
      tipo_descuento_enum: ["porcentaje", "monto_fijo"],
    },
  },
} as const
