const axios = require("axios");
let io;

const initSocket = (server) => {
  const { Server } = require("socket.io");
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Cliente conectado:", socket.id);

    socket.on("user-message", async (msg) => {
      console.log("📩 Mensaje del usuario recibido:", msg);
      console.log("📦 Cookies recibidas del socket:", socket.handshake.headers.cookie);

      try {

        // const cookies = socket.handshake.headers.cookie || "";
        console.log("📦 Cookies recibidas del socket:", socket.handshake.headers.cookie);
        // Redirige el mensaje a la API interna usando axios
        const response = await axios.post(
          "http://localhost:4000/mensajes",
          { content: msg },
          {
            headers: {
              Cookie: socket.handshake.headers.cookie, 
            },
            withCredentials: true,
          }
        );

        const { botMessage } = response.data;

          if (botMessage) {
            console.log("🔁 Mensaje del bot emitido:", botMessage);
            io.emit("bot-message", botMessage); // <- debe coincidir con el nombre en frontend
          }
      } catch (error) {
        console.error("❌ Error en procesamiento del mensaje:", error.message);
        socket.emit("botResponse", {
          id: Date.now(),
          sender: "bot",
          content: "Hubo un problema procesando tu mensaje.",
          createdAt: new Date().toISOString(),
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("🔌 Cliente desconectado:", socket.id);
    });
  });
};

const emitBotResponse = (message) => {
  if (io) {
    io.emit("botResponse", message); // Enviar a todos los conectados
  }
};

module.exports = {
  initSocket,
  emitBotResponse,
};
