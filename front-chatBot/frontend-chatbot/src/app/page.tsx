// // src/app/page.tsx
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import { z } from "zod";
// import { MessageSchema } from "../schemas/messageSchema";

// type Message = z.infer<typeof MessageSchema>;

// export default function Home() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const socketRef = useRef<any>(null);

//   useEffect(() => {
//     socketRef.current = io("http://localhost:3001"); // Cambia por tu backend

//     socketRef.current.on("bot-message", (msg: Message) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, []);

//   const handleSend = () => {
//     const userMessage: Message = { sender: "user", text: input };

//     const result = MessageSchema.safeParse(userMessage);
//     if (!result.success) {
//       alert("Mensaje no válido.");
//       return;
//     }

//     setMessages((prev) => [...prev, userMessage]);
//     socketRef.current.emit("user-message", userMessage);
//     setInput("");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 flex flex-col h-[80vh]">
//         <div className="flex-1 overflow-y-auto space-y-4 mb-4">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`p-3 rounded-lg text-sm w-fit max-w-xs ${
//                 msg.sender === "user"
//                   ? "bg-blue-100 self-end"
//                   : "bg-gray-200 self-start"
//               }`}
//             >
//               {msg.text}
//             </div>
//           ))}
//         </div>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             className="flex-1 p-2 border rounded-md"
//             placeholder="Escribe un mensaje..."
//           />
//           <button
//             onClick={handleSend}
//             className="bg-blue-600 text-white px-4 py-2 rounded-md"
//           >
//             Enviar
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import LoginForm from "@/components/LoginForm";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <LoginForm />
    </div>
  );
}

