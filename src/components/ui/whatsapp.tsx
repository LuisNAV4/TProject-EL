import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import WhatsappLogo from "@/images/whatsapp-logo.svg";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const USER_ID = "1234";

export const WhatsAppFloat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [userProfile, setUserProfile] = useState<any>(null);
  const [preguntasFrecuentes, setPreguntasFrecuentes] = useState<any[]>([]);
  const [mostrandoPreguntas, setMostrandoPreguntas] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth();

  // Obtener perfil del usuario y preguntas frecuentes
  useEffect(() => {
    const fetchData = async () => {
      // Cargar perfil del usuario
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setUserProfile(data);
      }

      // Cargar preguntas frecuentes del chatbot
      const { data: preguntas } = await supabase
        .from('chatbot_qa')
        .select('*')
        .eq('activo', true)
        .order('orden');
      
      setPreguntasFrecuentes(preguntas || []);
    };

    fetchData();
  }, [user]);

  // Función para obtener el nombre a mostrar
  const getUserDisplayName = () => {
    if (user && userProfile) {
      return userProfile.nombre_completo || userProfile.nombre_usuario || user.email;
    }
    if (user) {
      return user.email;
    }
    return `Usuario-${USER_ID.slice(-6)}`; // Últimos 6 dígitos del UUID para usuarios no registrados
  };

  // Scroll automático y persistencia
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem(
      "whatsapp-messages",
      JSON.stringify(
        messages.map((msg) => ({
          ...msg,
          timestamp:
            msg.timestamp instanceof Date
              ? msg.timestamp.toISOString()
              : msg.timestamp,
        }))
      )
    );
  }, [messages, open]);
  
  useEffect(() => {
    const storedMessages = localStorage.getItem("whatsapp-messages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const handleSend = (texto?: string) => {
    const mensajeTexto = texto || input;
    if (!mensajeTexto.trim()) return;
    
    const now = new Date();
    const msgUsuario = {
      from: "user",
      id: user?.id || USER_ID,
      user: getUserDisplayName(),
      text: mensajeTexto,
      timestamp: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }),
    };
    
    setMessages(prev => [...prev, msgUsuario]);
    setInput("");
    setMostrandoPreguntas(false);
    
    // Simular respuesta del bot después de un breve delay
    setTimeout(() => {
      const msgBot = {
        from: "bot",
        id: "bot",
        user: "Asistente Virtual",
        text: "Gracias por tu mensaje. Un agente se comunicará contigo pronto. Mientras tanto, puedes contactarnos directamente por WhatsApp usando el ícono de arriba.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }),
      };
      setMessages(prev => [...prev, msgBot]);
    }, 1000);
  };

  const handlePreguntaClick = (pregunta: any) => {
    handleSend(pregunta.pregunta);
    
    // Responder automáticamente con la respuesta de la base de datos
    setTimeout(() => {
      const msgBot = {
        from: "bot",
        id: "bot",
        user: "Asistente Virtual",
        text: pregunta.respuesta,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }),
      };
      setMessages(prev => [...prev, msgBot]);
    }, 500);
  };

  return (
    <>
      {/* Botón flotante */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            width: "70px",
            height: "70px",
            bottom: "20px",
            right: "10px",
            zIndex: 100,
            backgroundColor: "#25d366",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "2px 2px 10px rgb(0, 0, 0)",
            border: "none",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#128c7e")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#25d366")
          }
        >
          <MessageCircle
            style={{ color: "white", width: "40px", height: "40px" }}
          />
        </button>
      )}

      {/* Ventana de chat flotante */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "320px",
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
            zIndex: 101,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            fontFamily: "sans-serif",
            maxHeight: "70vh",
          }}
        >
          {/* Encabezado */}
          <div className="bg-[#25d366] text-white px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="font-bold">¿Necesitas ayuda?</span>
              <a
                href="https://wa.me/+584127750241?text=Hola%2C%20quiero%20hacer%20una%20consulta"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center hover:bg-[#128c7e] rounded-full w-7 h-7 ml-0 transition-colors"
                title="Chatear por WhatsApp"
              >
                <img src={WhatsappLogo} alt="WhatsApp" className="w-10 h-10" />
              </a>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="bg-transparent border-none text-white cursor-pointer"
              aria-label="Cerrar chat"
            >
              <X />
            </button>
          </div>
          {/* Mensajes */}
          <div
            style={{
              flex: 1,
              padding: "20px",
              background: "#f7f7f7",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {mostrandoPreguntas && messages.length === 0 && (
              <div style={{ marginBottom: "15px" }}>
                <div style={{ 
                  fontSize: "14px", 
                  color: "#666", 
                  marginBottom: "10px",
                  textAlign: "center"
                }}>
                  ¡Hola! ¿En qué puedo ayudarte?
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {preguntasFrecuentes.slice(0, 5).map((pregunta) => (
                    <button
                      key={pregunta.id}
                      onClick={() => handlePreguntaClick(pregunta)}
                      style={{
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "10px",
                        fontSize: "13px",
                        color: "#333",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "background 0.2s",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background = "#f0f0f0")
                      }
                      onMouseOut={(e) => (e.currentTarget.style.background = "#fff")}
                    >
                      {pregunta.pregunta}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                  background: msg.from === "user" ? "#25d366" : "#e1ffc7",
                  color: msg.from === "user" ? "white" : "#222",
                  borderRadius: "12px",
                  padding: "8px 14px",
                  maxWidth: "80%",
                  fontSize: "15px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  wordBreak: "break-word",
                }}
              >
                <div style={{ marginBottom: "4px", fontSize: "13px", opacity: 0.8 }}>
                  {msg.user || getUserDisplayName()}
                </div>
                {msg.text}
                <div style={{ fontSize: "11px", opacity: 0.7, marginTop: "4px" }}>
                  {msg.timestamp}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Input y acciones */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 12px",
              borderTop: "1px solid #eee",
              background: "#fff",
              gap: "6px",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe un mensaje..."
              style={{
                flex: 1,
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "8px 12px",
                fontSize: "15px",
                outline: "none",
              }}
              onKeyDown={(e) => {
                // Solo enviar si es Enter y no está repitiendo (evita mantener pulsado)
                if (e.key === "Enter" && !e.shiftKey && !e.repeat) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button
              type="submit"
              style={{
                background: "#25d366",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "8px 14px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              disabled={!input.trim()}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#128c7e")
              }
              onMouseOut={(e) => (e.currentTarget.style.background = "#25d366")}
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </>
  );
};