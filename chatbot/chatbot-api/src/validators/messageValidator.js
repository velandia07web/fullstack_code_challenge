const { z } = require('zod');

// Expresión regular básica para evitar caracteres potencialmente peligrosos
const forbiddenPattern = /(--|;|'|--|\b(SELECT|INSERT|DELETE|UPDATE|DROP|UNION|OR|AND)\b)/i;

const messageSchema = z.object({
  message: z
    .string()
    .min(1, 'El mensaje no puede estar vacío')
    .max(200, 'El mensaje no puede tener más de 200 caracteres')
    .refine((val) => !forbiddenPattern.test(val), {
      message: 'El mensaje contiene contenido no permitido o potencialmente peligroso',
    }),
});

module.exports = {
  messageSchema,
};
