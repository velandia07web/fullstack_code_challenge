// syncDatabase.js
const sequelize = require('./src/config/database');
const User = require('./src/models/User');
const Message = require('./src/models/Message');

const syncDB = async () => {
  try {
    // Este método hace ALTER TABLE sin borrar datos, para ajustar la estructura
    await sequelize.sync({ force: true });
    console.log('Base de datos sincronizada correctamente');
    process.exit();
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
    process.exit(1);
  }
};

syncDB();
