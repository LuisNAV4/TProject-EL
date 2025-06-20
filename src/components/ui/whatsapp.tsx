import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import WhatsappLogo from "@/images/whatsapp-logo.svg";
import { io } from "socket.io-client";

// Solo una instancia de socket
const socket = io("http://localhost:3000");

const USER_ID = "1234";

export const WhatsAppFloat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Recibir mensajes en tiempo real
  useEffect(() => {
    socket.on("nuevoMensaje", (mensaje: any) => {
      setMessages((prev) => [...prev, mensaje]);
    });
    return () => {
      socket.off("nuevoMensaje");
    };
  }, []);

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


  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    const now = new Date();
    const msg = {
      from: "user",
      id: USER_ID,
      user: "Luis Navarro",
      text: input,
      timestamp: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
    };
    // Emitir el mensaje al servidor
    socket.emit("nuevoMensaje", msg);
    // No agregarlo localmente aquí, solo lo agregará el socket.on("nuevoMensaje")
    setInput("");
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
