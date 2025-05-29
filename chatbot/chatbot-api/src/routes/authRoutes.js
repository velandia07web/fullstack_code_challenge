const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { loginSchema } = require('../validators/authValidator');
const validateSchema = require('../middlewares/validateSchema');

router.post('/login', validateSchema(loginSchema), authController.login);

// Ruta de logout
router.post('/logout', authController.logout);

module.exports = router;
