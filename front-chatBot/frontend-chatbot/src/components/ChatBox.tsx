"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "@/context/ChatContext";
import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import LogoutButton from "./LogoutButton";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { z } from "zod";

const MySwal = withReactContent(Swal);

const messageSchema = z
  .string()
  .min(1, "El mensaje no puede estar vacío")
  .max(500, "El mensaje es demasiado largo")
  .regex(
    /^[a-zA-Z0-9\s.,!?"¿¡()áéíóúÁÉÍÓÚñÑ-]+$/,
    "Solo se permiten letras, números y signos válidos"
  );

const getDateLabel = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
    return "Hoy";

  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  )
    return "Ayer";

  return date.toLocaleDateString("es-CO", {
    timeZone: "America/Bogota",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function ChatBox() {
  const { messages, sendMessage } = useChat();
  const [text, setText] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = messageSchema.safeParse(text);
    if (!validation.success) {
      const msg = validation.error.errors[0]?.message || "Mensaje inválido";
      MySwal.fire({
        icon: "error",
        title: "Error en el mensaje",
        text: msg,
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    sendMessage(text);
    setText("");
  };

  let lastDateLabel = "";

  return (
    <div className="flex flex-col items-center justify-between h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
        {/* Header */}
        <div className="border-b px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto">
            <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <FaRobot className="text-2xl text-blue-600" />
            </motion.div>
            <h2 className="text-xl font-bold text-blue-700">ChatBot</h2>
          </div>
          <div className="ml-auto">
            <LogoutButton />
          </div>
        </div>

        {/* Mensajes */}
        <div
          ref={chatRef}
          className="flex flex-col gap-2 px-4 py-3 overflow-y-auto flex-grow"
        >
          {messages.map((msg) => {
            const isBot = msg.sender.toLowerCase() === "bot";
            const msgDate = new Date(msg.createdAt);
            const currentLabel = getDateLabel(msgDate);
            const showDateLabel = currentLabel !== lastDateLabel;
            if (showDateLabel) lastDateLabel = currentLabel;

            const formattedTime = msgDate.toLocaleTimeString("es-CO", {
              timeZone: "America/Bogota",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            return (
              <div key={msg.id} className="flex flex-col">
                {showDateLabel && (
                  <div className="text-center my-2 text-xs text-gray-500">— {currentLabel} —</div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-md transition-all
                    ${isBot ? "bg-blue-100 self-start text-left text-blue-900" : "bg-gray-200 self-end text-right text-gray-900"}`}
                >
                  <span className="font-semibold block mb-1">
                    {isBot ? "🤖 Bot" : "🧑 Tú"}
                  </span>
                  <span className="block mb-1">{msg.content}</span>
                  <span className="text-xs text-gray-500 block">{formattedTime}</span>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="px-4 py-3 border-t flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-sm"
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
            aria-label="Enviar mensaje"
          >
            <FiSend className="text-xl" />
          </button>
        </form>
      </div>
    </div>
  );
}
