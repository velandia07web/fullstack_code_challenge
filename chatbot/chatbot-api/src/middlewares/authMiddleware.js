const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Primero intenta leer el token desde las cookies
  const tokenFromCookie = req.cookies?.token;
  const authHeader = req.headers['authorization'];

  console.log("🔐 Header Authorization:", authHeader);
  console.log("🍪 Token desde cookie:", tokenFromCookie);

  let token;

  if (tokenFromCookie) {
    token = tokenFromCookie;
  } else if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: decoded.userId,
      username: decoded.username,
    };
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido' });
  }
};

module.exports = verifyToken;
