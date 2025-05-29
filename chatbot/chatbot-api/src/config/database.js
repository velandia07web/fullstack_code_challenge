const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    logging: false,
    timezone: '-05:00', // 👈 Zona horaria de Bogotá
    dialectOptions: {
      dateStrings: true,   // 👈 Opcional: fuerza fechas como strings
      typeCast: true       // 👈 Opcional: permite manipular tipos de datos
    }
  }
);

module.exports = sequelize;
