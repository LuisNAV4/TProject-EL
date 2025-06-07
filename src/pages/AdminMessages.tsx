import { randomUUID } from "crypto";
import React, { useState, useRef, useEffect } from "react";

// Datos simulados de chats y mensajes
const chats = [
  {
    id: 1,
    user: "Luis Perez",
    lastMessage: "Hola, tengo una duda sobre un producto.",
    messages: [
      { from: "user", text: "Hola, tengo una duda sobre un producto.", timestamp: "10:00 AM" },
      { from: "admin", text: "¡Hola! ¿En qué puedo ayudarte?", timestamp: "10:01 AM" },
      { from: "user", text: "¿Tienen envío gratis?", timestamp: "10:02 AM" },
    ],
    active: true,
  },
  {
    id: 2,
    user: "Maria Gomez",
    lastMessage: "Gracias por la información.",
    messages: [
      { from: "user", text: "¿Cuánto tarda el envío?", timestamp: "9:00 AM" },
      { from: "admin", text: "Depende de tu ubicación, normalmente 2-3 días.", timestamp: "9:01 AM" },
      { from: "user", text: "Gracias por la información.", timestamp: "9:02 AM" },
    ],
    active: false,
  },
];

const AdminMessages: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChat, selectedChat.messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    // Actualiza solo el chat seleccionado
    setSelectedChat((prev) => {
      const updated = {
        ...prev,
        messages: [
          ...prev.messages,
          {
            from: "admin",
            user: "Andres Ardiles",
            text: input,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ],
      };
      // Actualiza también en la lista de chats
      const idx = chats.findIndex((c) => c.id === prev.id);
      chats[idx] = updated;
      return updated;
    });
    setInput("");
  };

  // Botón para volver atrás (simulado, puedes conectar con router si lo usas)
  const handleBack = () => {
    // Aquí podrías usar router o navegación real
    window.history.back();
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
    <div className="fixed inset-0 flex bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10">
      {/* Lista de chats */}
      <aside className="w-full max-w-xs md:max-w-sm bg-white flex flex-col border-r border-[var(--color-border)] shadow-lg z-10">
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-primary)] text-white">
          <button
            onClick={handleBack}
            className="rounded-full hover:bg-[var(--color-secondary)]/30 p-2 transition-colors"
            title="Volver"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="font-bold text-lg flex-1 text-center">Bandeja de entrada</span>
          <span className="w-8" /> {/* Espaciador */}
        </div>
        <div className="flex-1 overflow-y-auto bg-[var(--color-bg)]">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`cursor-pointer px-5 py-4 border-b border-[var(--color-border)] transition-all
                ${selectedChat.id === chat.id
                  ? "bg-[var(--color-primary)] text-lg text-white font-semibold"
                  : "hover:bg-[var(--color-secondary)] hover:text-white"
                } flex items-center justify-between`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="flex flex-col flex-1 min-w-0">
                <div className="font-semibold truncate">{chat.user}</div>
                <div className="text-xs truncate opacity-80">{chat.lastMessage}</div>
              </div>
              <div className="ml-4 text-xs text-right text-[var(--color-muted)] min-w-[60px]">
                {
                  // Mostrar el timestamp del último mensaje en formato 12h
                  chat.messages.length > 0
                    ? format12Hour(chat.messages[chat.messages.length - 1].timestamp)
                    : ""
                }
              </div>
            </div>
          ))}
        </div>
      </aside>
      {/* Panel de conversación */}
      <main className="flex-1 flex flex-col bg-white shadow-lg overflow-hidden">
        {/* Encabezado */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-[var(--color-border)] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
          <div>
            <div className="font-bold text-lg text-white">{selectedChat.user}</div>
            <div className="text-xs text-white">Usuario</div>
          </div>
        </div>
        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-3 bg-[var(--color-bg)]"
          style={{ background: "linear-gradient(135deg, #f8fafc 80%, #e0e7ff 100%)" }}>
          {selectedChat.messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[70%] px-5 py-3 rounded-2xl text-sm shadow
                ${msg.from === "user"
                  ? "bg-[var(--color-border)] text-[var(--color-text)] self-start rounded-bl-none"
                  : "bg-[var(--color-primary)] text-white self-end rounded-br-none"
                }`}
            >
              <div>{msg.text}</div>
              <div className="text-[10px] text-[var(--color-muted)] mt-1 text-right">{format12Hour(msg.timestamp)}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Input para enviar mensajes */}
        <form
          onSubmit={handleSend}
          className="flex items-center gap-3 px-8 py-4 border-t border-[var(--color-border)] bg-[var(--color-bg)]"
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 border border-[var(--color-border)] rounded-lg px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white"
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey && !e.repeat) {
                handleSend();
              }
            }}
          />
          <button
            type="submit"
            className="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-semibold rounded-lg px-6 py-2 transition-colors disabled:opacity-60"
            disabled={!input.trim()}
          >
            Enviar
          </button>
        </form>
      </main>
    </div>
  );
};

export default AdminMessages;
