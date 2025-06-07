import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import WhatsappLogo from "@/images/whatsapp-logo.svg";

// Mensaje de ejemplo del sistema
const initialMessages = [
  {
    from: "admin",
    text: "¡Hola! ¿En qué podemos ayudarte?",
    timestamp: new Date(),
  },
];

export const WhatsAppFloat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("whatsapp-messages");
    if (saved) {
      // Convierte las fechas de string a Date si es necesario
      return JSON.parse(saved).map((msg: any) => ({
        ...msg,
        timestamp: new Date(format12Hour(msg.timestamp)),
      }));
    }
    return initialMessages;
  });
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll automático al enviar mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // Guarda mensajes en localStorage cada vez que cambian
    localStorage.setItem("whatsapp-messages", JSON.stringify(messages));
  }, [messages, open]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    setMessages([
      ...messages,
      {
        from: "user",
        id: "123",
        name: "Luis Navarro",
        text: input,
        timestamp: new Date(),
      },
    ]);
    setInput(""); // Limpiar el input después de enviar

    // Aquí podrías agregar lógica para respuestas automáticas
    // 
    //  si lo deseas
  };
  const format12Hour = (timestamp: string) => {
    // Si ya está en formato 12h, retorna igual
    if (/AM|PM/i.test(timestamp)) return timestamp;
    // Intenta convertir de "HH:mm" a 12h
    const [h, m] = timestamp.split(":");
    if (!h || !m) return timestamp;
    let hour = parseInt(h, 10);
    const minute = m.replace(/[^\d]/g, "");
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
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
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Input y acciones */}
          <form
            onSubmit={handleSend}
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
