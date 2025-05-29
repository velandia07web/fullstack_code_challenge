"use client";

import { useEffect, useRef, useState } from "react";
// import { z } from "zod";
import { messageSchema } from "@/schemas/messageSchema";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_API_URL!, {
  withCredentials: true,
});

type Mensaje = {
  autor: "usuario" | "bot";
  contenido: string;
};

export default function ChatUI() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const enviarMensaje = () => {
    setError("");

    const validacion = messageSchema.safeParse({ mensaje });

    if (!validacion.success) {
      setError(validacion.error.errors[0].message);
      return;
    }

    const nuevoMensaje: Mensaje = { autor: "usuario", contenido: mensaje };
    setMensajes((prev) => [...prev, nuevoMensaje]);
    socket.emit("mensaje", mensaje);
    setMensaje("");
  };

  useEffect(() => {
    socket.on("respuesta", (contenido: string) => {
      setMensajes((prev) => [...prev, { autor: "bot", contenido }]);
    });

    return () => {
      socket.off("respuesta");
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  return (
    <div className="max-w-3xl mx-auto p-4 h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto bg-white shadow rounded p-4 space-y-4">
        {mensajes.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded max-w-[80%] ${
              msg.autor === "usuario"
                ? "bg-blue-100 self-end text-right"
                : "bg-gray-200 self-start"
            }`}
          >
            <span className="text-sm text-gray-700">{msg.contenido}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {error && (
        <div className="text-red-500 text-sm text-center mt-2">{error}</div>
      )}

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="flex-1 border p-2 rounded shadow"
        />
        <button
          onClick={enviarMensaje}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
