
import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";

// Instancia única de socket
const socket = io("http://localhost:3000");

// Estructura de chat: cada usuario tiene su propio chat
type Message = {
  from: string;
  user: string;
  text: string;
  timestamp: string;
  id: string;
};
type Chat = {
  id: string;
  user: string;
  lastMessage: string;
  messages: Message[];
  active: boolean;
};

const AdminMessages: React.FC = () => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [input, setInput] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Detectar si estamos en vista móvil
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Recibir mensajes en tiempo real por socket
  useEffect(() => {
    socket.on("nuevoMensaje", (mensaje: Message) => {
      setChatList((prevChats) => {
        const idx = prevChats.findIndex(
          (c) => c.id === mensaje.id || c.user === mensaje.user
        );
        if (idx !== -1) {
          // Actualizar chat existente
          const updated = {
            ...prevChats[idx],
            lastMessage: mensaje.text,
            messages: [...prevChats[idx].messages, mensaje],
          };
          const newChats = [...prevChats];
          newChats[idx] = updated;
          return newChats;
        } else {
          // Nuevo chat
          const nuevoChat: Chat = {
            id: mensaje.id,
            user: mensaje.user,
            lastMessage: mensaje.text,
            messages: [mensaje],
            active: true,
          };
          return [nuevoChat, ...prevChats];
        }
      });

      // Si el chat abierto es el que recibe el mensaje, actualízalo
      setSelectedChat((prev) => {
        if (!prev) return prev;
        if (mensaje.id === prev.id || mensaje.user === prev.user) {
          return {
            ...prev,
            messages: [...prev.messages, mensaje],
          };
        }
        return prev;
      });
    });
    return () => {
      socket.off("nuevoMensaje");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChat?.messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || !selectedChat) return;
    const msg: Message = {
      from: "admin",
      user: "Andres Ardiles",
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      id: selectedChat.id,
    };
    socket.emit("nuevoMensaje", msg);
    // No agregar el mensaje localmente aquí, solo lo agregará el socket.on("nuevoMensaje")
    setInput("");
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    if (isMobileView) {
      setIsMobileView(false); // Hide sidebar on mobile when chat is selected
    }
  };

  const handleBackToList = () => {
    if (isMobileView) {
      setSelectedChat(null);
    }
  };

  const format12Hour = (timestamp: string) => {
    if (/AM|PM/i.test(timestamp)) return timestamp;
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
      {/* Lista de chats - Responsive */}
      <aside className={`
        ${isMobileView && selectedChat ? 'hidden' : 'flex'} 
        w-full md:w-80 lg:w-96 md:max-w-none bg-white flex-col border-r border-[var(--color-border)] shadow-lg z-10
      `}>
        <div className="flex items-center justify-between p-3 md:p-4 border-b border-[var(--color-border)] bg-[var(--color-primary)] text-white">
          <button
            onClick={handleBack}
            className="rounded-full hover:bg-[var(--color-secondary)]/30 p-2 transition-colors"
            title="Volver"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="font-bold text-base md:text-lg flex-1 text-center">Bandeja de entrada</span>
          <span className="w-8" />
        </div>
        <div className="flex-1 overflow-y-auto bg-[var(--color-bg)]">
          {chatList.length === 0 && (
            <div className="p-4 text-center text-gray-500 text-sm md:text-base">
              No hay chats
            </div>
          )}
          {chatList.map((chat) => (
            <div
              key={chat.id}
              className={`cursor-pointer px-3 md:px-5 py-3 md:py-4 border-b border-[var(--color-border)] transition-all
                ${selectedChat && selectedChat.id === chat.id
                  ? "bg-[var(--color-primary)] text-white font-semibold"
                  : "hover:bg-[var(--color-secondary)] hover:text-white"
                } flex items-center justify-between`}
              onClick={() => handleChatSelect(chat)}
            >
              <div className="flex flex-col flex-1 min-w-0">
                <div className="font-semibold truncate text-sm md:text-base">{chat.user}</div>
                <div className="text-xs md:text-sm truncate opacity-80">{chat.lastMessage}</div>
              </div>
              <div className="ml-2 md:ml-4 text-xs text-right text-[var(--color-muted)] min-w-[50px] md:min-w-[60px]">
                {
                  chat.messages.length > 0
                    ? format12Hour(chat.messages[chat.messages.length - 1].timestamp)
                    : ""
                }
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Panel de conversación - Responsive */}
      <main className={`
        ${isMobileView && !selectedChat ? 'hidden' : 'flex'} 
        flex-1 flex-col bg-white shadow-lg overflow-hidden
      `}>
        {/* Encabezado */}
        <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5 border-b border-[var(--color-border)] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
          {/* Botón de regreso en móvil */}
          {isMobileView && (
            <button
              onClick={handleBackToList}
              className="rounded-full hover:bg-[var(--color-secondary)]/30 p-2 transition-colors mr-2 md:hidden"
              title="Volver a la lista"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div>
            <div className="font-bold text-base md:text-lg text-white">{selectedChat ? selectedChat.user : "Selecciona un chat"}</div>
            <div className="text-xs md:text-sm text-white">Usuario</div>
          </div>
        </div>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-6 flex flex-col gap-2 md:gap-3 bg-[var(--color-bg)]"
          style={{ background: "linear-gradient(135deg, #f8fafc 80%, #e0e7ff 100%)" }}>
          {!selectedChat || selectedChat.messages.length === 0 ? (
            <div className="text-center text-gray-500 text-sm py-4">
              No hay mensajes en este chat.
            </div>
          ) : (
            selectedChat.messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[85%] md:max-w-[70%] px-3 md:px-5 py-2 md:py-3 rounded-2xl text-sm shadow
                  ${msg.from === "user"
                    ? "bg-[var(--color-border)] text-[var(--color-text)] self-start rounded-bl-none"
                    : "bg-[var(--color-primary)] text-white self-end rounded-br-none"
                  }`}
              >
                <div className="break-words">{msg.text}</div>
                <div className="text-[10px] text-[var(--color-muted)] mt-1 text-right">{format12Hour(msg.timestamp)}</div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input para enviar mensajes */}
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-4 border-t border-[var(--color-border)] bg-[var(--color-bg)]"
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 border border-[var(--color-border)] rounded-lg px-3 md:px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white text-sm md:text-base"
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey && !e.repeat) {
                handleSend();
              }
            }}
            disabled={!selectedChat}
          />
          <button
            type="submit"
            className="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-semibold rounded-lg px-4 md:px-6 py-2 transition-colors disabled:opacity-60 text-sm md:text-base"
            disabled={!input.trim() || !selectedChat}
          >
            Enviar
          </button>
        </form>
      </main>
    </div>
  );
};

export default AdminMessages;
