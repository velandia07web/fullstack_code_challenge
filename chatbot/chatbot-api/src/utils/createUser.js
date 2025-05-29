const bcrypt = require('bcrypt');
const User = require('../models/User');
const sequelize = require('../config/database');

const crearUsuarios = async () => {
  await sequelize.sync();

  // Datos de usuarios a crear
  const usuarios = [
    {
      username: 'jhonatan',
      password: 'Abril2025*',
    },
    {
      username: 'bot',
      password: 'Abril2025*',
    },
  ];

  for (const usuario of usuarios) {
    const existingUser = await User.findOne({ where: { username: usuario.username } });
    if (existingUser) {
      console.log(`Usuario ${usuario.username} ya existe`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(usuario.password, 10);

    await User.create({
      username: usuario.username,
      password: hashedPassword,
    });

    console.log(`Usuario ${usuario.username} creado con éxito`);
  }

  process.exit();
};

crearUsuarios();
