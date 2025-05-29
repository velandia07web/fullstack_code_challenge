const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app); // 🔥 Primero creas el servidor HTTP

const cors = require('cors');
const sequelize = require('./config/database');
const messageRoutes = require('./routes/messageRoutes');
const authRoutes = require('./routes/authRoutes');
const { initSocket } = require('./socket');
const cookieParser = require("cookie-parser");

require('dotenv').config();
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

// Rutas
app.use('/mensajes', messageRoutes);
app.use('/auth', authRoutes);

// WebSocket (💡 ¡Importante! después de configurar las rutas)
initSocket(server); // 💥 Esto debe ir después del app.use

// Arrancar el servidor
sequelize.sync()
  .then(() => {
    console.log('✅ Conexión a base de datos exitosa');
    server.listen(4000, () => {
      console.log('🚀 Servidor corriendo en http://localhost:4000');
    });
  })
  .catch((error) => {
    console.error('❌ Error al conectar con la base de datos:', error);
  });
