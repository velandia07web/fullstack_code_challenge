const Message = require('../models/Message');
const User = require('../models/User');
const getIAResponse = require('../services/openaiService');
const { messageSchema } = require('../validators/messageValidator');
const { emitBotResponse } = require('../socket');

const BOT_USERNAME = 'bot';

// Cache para usuario bot
let botUserCache = null;

const getBotUser = async () => {
  if (botUserCache) return botUserCache;

  botUserCache = await User.findOne({ where: { username: BOT_USERNAME } });
  if (!botUserCache) {
    throw new Error('Usuario bot no encontrado');
  }
  return botUserCache;
};

// Respuestas automáticas del bot (reglas simples)
const respuestasBot = (mensaje) => {
  const texto = mensaje.toLowerCase();

  if (texto.includes('hola')) return 'Hola, ¿en qué puedo ayudarte?';
  if (texto.includes('problema con ticket')) return '¿Puedes darme más detalles sobre tu problema?';
  if (texto.includes('gracias')) return '¡De nada!';

  return null;
};

// POST /mensajes
const createMessage = async (req, res) => {
  try {
    if (!req.user || !req.user.userId || !req.user.username) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const { content } = req.body;
    const sender = req.user.username;
    const userId = req.user.userId;

    // Validación del mensaje con Zod
    const result = messageSchema.safeParse({ message: content });
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors[0].message });
    }

    // Guardar mensaje del usuario
    const userMessage = await Message.create({ sender, content, userId });

    // Generar respuesta del bot si no es un mensaje del mismo bot
    let botMessage = null;

    if (sender.toLowerCase() !== BOT_USERNAME) {
      let respuesta = respuestasBot(content);
      console.log("🤖 Respuesta del bot generada:", respuesta);
      if (!respuesta) {
        respuesta = await getIAResponse(content);
      }

      const botUser = await getBotUser();

      botMessage = await Message.create({
        sender: BOT_USERNAME,
        content: respuesta,
        userId: botUser.id,
      });

      // Emitir respuesta del bot por WebSocket
      emitBotResponse(botMessage);
    }

    res.status(201).json({ userMessage, botMessage });
  } catch (error) {
    console.error('Error en createMessage:', error.message);
    res.status(500).json({ error: 'Error al guardar el mensaje' });
  }
};


// GET /mensajes
const getMessages = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    // Obtener el usuario bot
    const botUser = await User.findOne({ where: { username: BOT_USERNAME } });
    if (!botUser) {
      return res.status(500).json({ error: 'Usuario bot no encontrado' });
    }

    // Traer mensajes del usuario y del bot
    const messages = await Message.findAll({
      where: {
        userId: [req.user.userId, botUser.id], // ⬅️ Incluir ambos IDs
      },
      order: [['createdAt', 'ASC']],
    });

    res.json(messages);
  } catch (error) {
    console.error('Error en getMessages:', error);
    res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
};


module.exports = {
  createMessage,
  getMessages,
};
