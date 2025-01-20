# 🚀 Fullstack Developer Challenge - DS Integrations

## **🌟 Objective**
Develop a **mini and very simple Chatbot system** that allows:
1. 💬 Sending messages between a user and the bot.
2. 🤖 Automatically responding to messages with basic AI simulation.
3. 🗂️ Storing messages in a database.

This challenge evaluates your Fullstack development skills using the technologies and stack listed below.

---

## **🛠️ Technologies to Use**

- **Programming Languages:** JavaScript / TypeScript
- **Back-end:** Node.js, Express
- **Front-end:** Next.js, React, TailwindCSS
- **Database:** PostgreSQL

---

## **📋 Requirements**

### **🔧 Back-end (API with Node.js and Express)**

#### **Endpoints**
1. **POST /messages:**  
   - 💾 Receives a message from a user and saves it in the database.
   - 🤖 If the message is sent to the bot, it generates an automatic response based on predefined keywords.  
     Example keywords:
     - "Hola" → "Hola, ¿en qué puedo ayudarte?"
     - "Problema con ticket" → "¿Puedes darme más detalles sobre tu problema?"
     - "Gracias" → "¡De nada!"

2. **GET /messages:**  
   - 📜 Returns all messages, including those sent by the bot and the user.

#### **Database**
- **Structure:**
  Define your best version for this Database

#### **AI Simulation**
- 🧠 Implement a simple logic (switch/if/else) to respond automatically based on predefined keywords.
- **Optional:** Use an AI API (e.g., OpenAI) for a more advanced response.

---

### **🎨 Front-end (Next.js / React and TailwindCSS)**

#### **Features**
1. **Main Page:**
   - 💻 An interactive chat where users can:
     - ✍️ Send messages.
     - 👀 See real-time bot responses.

2. **Design:**
   - 🎨 Use **TailwindCSS** for a clean, modern UI.
   - Create the following React components:
     - **Input Area:** A text input for sending messages.
     - **Chat History:** Styled message bubbles for user and bot messages.

#### **Technical Requirements**
- 🌐 Fetch API or Axios for API communication.
- 🗂️ Use Context API or a state management library for global state (optional).

---

## **📊 Evaluation Criteria**

1. **✅ Technical Accuracy:**
   - Does the solution meet the functional requirements?
   - Are the API endpoints functional and follow best practices?
   - Is the front-end UI intuitive and well-designed?

2. **📚 Code Quality:**
   - Is the code well-structured and maintainable?
   - Are good practices followed (naming conventions, modularity, etc.)?

3. **📝 Documentation:**
   - Does the README provide clear setup and execution instructions?

4. **🌟 Optional Features (Bonus Points):**
   - Implement WebSocket for real-time chat.
   - Use Redis for caching.
   - Add basic testing with Jest or equivalent tools.

---

## **📬 Submission Instructions**

1. 🔄 Fork this repository to your own GitHub account.
2. 🛠️ Complete the challenge and push your code to the forked repository.
3. 📖 Include a **README** with:
   - Steps to install dependencies, start the server, and access the app.
   - Technical decisions and any challenges you faced.

4. 🔗 Share the link to your forked repository.

---

## **⚙️ Setup Instructions**

### **🔧 Back-end:**
1. Clone the repository and navigate to the `backend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database (PostgreSQL or Redis) and update the `.env` file with your connection details.
4. Start the server:
   ```bash
   npm run dev
   ```

### **🎨 Front-end:**
1. Navigate to the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

Good luck, and we look forward to reviewing your submission! 🚀
