## 🚀 Tecnologías principales

### Backend (`/chatbot/chatbot-api`):

* Node.js
* Express
* Sequelize (conMySQL) --> ORM 
* JWT (Autenticación)
* Zod (Validaciones)
* Socket.IO (WebSocket para chat en tiempo real)

### Frontend (`/front-chatBot/frontend-chatbot`):

* Next.js 13+ (con App Router)
* TypeScript
* TailwindCSS
* Zod (Validaciones de formularios)
* Socket.IO client (WebSocket)
* Alertas (sweetalert2)

## 📁 Estructura del proyecto

```
fullstack_code_challenge/
├── chatbot/                # Backend (Node.js + Express)
│   └── chatbot-api/       
├── front-chatBot/         # Frontend (Next.js + TailwindCSS)
│   └── frontend-chatbot/  
└── README.md
```
## 🚗 Instrucciones para ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/velandia07web/fullstack_code_challenge.git
cd fullstack_code_challenge
```
---

## 🚧 Backend - Instalación y uso

### 🔹 Ubicación

```
chatbot/chatbot-api/
```

### 📖 Instalación de dependencias

```bash
cd chatbot/chatbot-api
npm install
```

📦 Requisitos Previos
Antes de comenzar, asegúrate de tener instalado lo siguiente:

* [Node.js](https://nodejs.org/) (versión recomendada: **>= 18.x.x**)
Verifica con:

```bash
node -v
npm -v
```

Git (opcional, para clonar el proyecto)

1. Clonar el repositorio
git clone https://github.com/velandia07web/fullstack_code_challenge.git
cd fullstack_code_challenge

### 🛡️ Variables de entorno

Crear un archivo `.env` con el siguiente contenido:

```env
PORT=4000
DB_NAME=chatbot_db
DB_USER=root
DB_PASSWORD=tu_password
DB_HOST=localhost
JWT_SECRET=miclaveultrasecreta
OPENAI_API_KEY=TU_API_KEY
```
(adicional: usa `.env.example` como referencia estan variables de conexion)

### ⚡ Ejecutar

```bash
npm start
```

El servidor estará activo en `http://localhost:4000`

#### Crear usuarios:

```bash
node src/utils/createUser.js
```

Esto crea dos usuarios por defecto:

* **jhonatan / Abril2025**\*
* **bot / Abril2025**\*


### ✉ Endpoints importantes

* `POST /auth/login` - Autenticación con username y password.

Inicia sesión y devuelve un JWT.

#### Cuerpo esperado:

```json
{
  "username": "jhonatan",
  "password": "Abril2025*"
}
```

#### Respuesta:

```json
{
  "token": "..."
}
```

El token debe enviarse en las siguientes peticiones protegidas.

### POST `/mensajes`

Envía un mensaje del usuario y obtiene una respuesta del bot.

#### Headers:

```
Authorization: Bearer <token>
```

#### Cuerpo:

```json
{
  "content": "Hola"
}
```

### GET `/mensajes`

Regresa historial ---> > Este endpoint está protegido. Requiere JWT.

### POST `/auth/logout` → Logout

## 💬 WebSocket

El sistema usa WebSockets para actualizaciones en tiempo real entre usuario y bot.

* El cliente se conecta a `ws://localhost:4000`.
* Se usa `socket.io` para manejo de eventos como `user-message` y `bot-message`.

---

## 🔎 Validaciones con Zod (Frontend)

El frontend utiliza [Zod](https://zod.dev/) para validaciones robustas del lado del cliente.

### Ejemplo de esquema de mensaje

```ts
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
```

### Para instalar zod:

```bash
npm install zod
```

---

## ✅ Recomendaciones Finales

* Usa `npm start`  en backend y  como en frontend.
* No olvides configurar correctamente tu `.env` en backend.
* Asegúrate de que el puerto del backend coincida con las URLs usadas en el frontend.
* Verifica que el frontend esté configurado para usar `cookies` con el JWT.

---


---

*Desarrollado con ❤️ por Jonathan Velandia*





