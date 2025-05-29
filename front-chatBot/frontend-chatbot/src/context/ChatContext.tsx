"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";
import { ChatMessage, fetchChatHistory } from "@/lib/api";

interface ChatContextType {
  messages: ChatMessage[];
  sendMessage: (text: string) => void;
  reloadHistory: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

let socket: Socket;

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);

  const loadHistory = async () => {
    try {
      const history = await fetchChatHistory();
      setMessages(history);
      setIsHistoryLoaded(true);
    } catch (err: any) {
      console.error("❌ Error al cargar historial:", err?.response?.status);
      setIsHistoryLoaded(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      console.log("⛔ No hay token, no se carga historial ni se conecta al socket.");
      return;
    }

    // ✅ Solo cargamos historial y conectamos WebSocket si hay token
    loadHistory();

    socket = io("http://localhost:4000", {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("🔌 Conectado al WebSocket");
    });

    socket.on("bot-message", (botMsg: ChatMessage) => {
      setMessages((prev) => [...prev, botMsg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now(),
      sender: "usuario",
      content: text,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);

    socket.emit("user-message", text);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, reloadHistory: loadHistory }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat debe usarse dentro de un ChatProvider");
  }
  return context;
};
