const express = require('express');
const router = express.Router();
const {
  createMessage,
  getMessages,
} = require('../controllers/messageController');

const verifyToken = require('../middlewares/authMiddleware');


// Proteger rutas
router.post('/', verifyToken, createMessage);
router.get('/', verifyToken, getMessages);

module.exports = router;
