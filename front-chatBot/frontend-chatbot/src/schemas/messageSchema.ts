import { z } from "zod";

export const messageSchema = z.object({
  mensaje: z
    .string()
    .min(1, "El mensaje no puede estar vacío")
    .max(500, "El mensaje es demasiado largo")
    .regex(
      /^[a-zA-Z0-9\s.,!?"¿¡()áéíóúÁÉÍÓÚñÑ-]+$/,
      "Solo se permiten letras, números y signos de puntuación válidos"
    ),
});
