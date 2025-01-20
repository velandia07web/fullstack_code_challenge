![DS Integrations Logo](./logo_horizontal_ds_integration.png)

# 🌟 Fullstack Developer Challenge - DS Integrations

## **📖 Context**
At **DS Integrations S.A.S**, we are focused on providing solutions that improve IT Service Management (ITSM) processes. As part of our continuous improvement, we have identified the need to integrate a chatbot into our platform to streamline customer interactions. This chatbot should handle user queries and simulate basic AI responses.

Your mission, should you choose to accept it, is to develop a **proof of concept** for this chatbot system. The solution must address the outlined business needs while demonstrating your fullstack development skills.

---

## **🚀 The Problem**
Currently, our support team handles a high volume of repetitive queries. We want to:
1. 🤖 Implement a simple and small proof of concept chatbot that can respond automatically to common questions.
2. 💬 Store all user and bot interactions for future analysis.
3. 📊 Provide a clean and intuitive interface for user interaction.

---

## **🌟 Your Task**
Develop a **mini and simple chatbot system** that:
1. 🧠 Automatically responds to user messages using predefined rules or logic.
2. 💾 Stores all messages in a database.
3. 🎨 Includes a simple, responsive front-end interface for user interaction.

---

## **🛠️ Technical Requirements**

### **🔧 Back-end (Node.js and Express)**
#### Features:
1. **POST /messages:**  
   - Receives a message from a user and saves it in the database.
   - If the recipient is the bot, generate an automatic response using predefined keywords.
     Examples:
     - "Hola" → "Hola, ¿en qué puedo ayudarte?"
     - "Problema con ticket" → "¿Puedes darme más detalles sobre tu problema?"
     - "Gracias" → "¡De nada!"

2. **GET /messages:**  
   - Returns all stored messages.

#### Database:
- Define the database structure to best handle:
  - Sender (user or bot).
  - Message content.
  - Timestamps.

#### AI Simulation:
- Implement a basic logic system (e.g., `if/else` or `switch`).
- **Bonus:** Integrate an AI API for smarter responses (e.g., OpenAI).

### **🎨 Front-end (Next.js / React with TailwindCSS)**
#### Features:
1. **Chat Interface:**
   - Input field for users to send messages.
   - Display conversation history with distinct styles for user and bot messages.

2. **Design:**
   - Use **TailwindCSS** for a clean, modern interface.

3. **State Management:**
   - Use React’s Context API or other state management solutions to manage chat data.

---

## **📊 Evaluation Criteria**

1. **💡 Problem-Solving:**
   - How effectively does the solution address the problem?

2. **🛠️ Technical Implementation:**
   - Are the API endpoints functional and well-structured?
   - Is the front-end intuitive and responsive?

3. **📚 Code Quality:**
   - Is the code readable, modular, and maintainable?

4. **📝 Documentation:**
   - Are setup and usage instructions clear?

5. **🌟 Bonus:**
   - Use Typescript
   - Use Zod Validations
   - Use some ORM
   - Real-time updates with WebSockets.
   - Redis for caching.
   - Testing with Jest or similar tools.

---

## **⚙️ Submission Instructions**

1. Fork this repository to your GitHub account.
2. Complete the challenge and push your solution to the forked repository.
3. Include a README detailing:
   - Setup steps.
   - Technical decisions made.
   - Challenges encountered and how you resolved them.
4. Share the repository link.

Good luck, and we can’t wait to see your solution! 🌟
