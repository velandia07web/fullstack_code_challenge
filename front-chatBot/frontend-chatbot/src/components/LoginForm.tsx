"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { loginUser } from "@/lib/api";
import { loginSchema } from "@/schemas/loginSchema";
import { FaRobot } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import Image from "next/image";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = loginSchema.safeParse({ username, password });
    if (!validation.success) {
      const msg = validation.error.errors[0]?.message || "Datos inv\u00e1lidos";
      MySwal.fire({
        icon: "error",
        title: "Error de validaci\u00f3n",
        text: msg,
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    try {
      const response = await loginUser({ username, password });
      const token = (response as { token: string }).token;
      Cookies.set("token", token);
      router.push("/dashboard");
    } catch (err: any) {
      MySwal.fire({
        icon: "error",
        title: "Error de autenticaci\u00f3n",
        text: err.message || "Credenciales incorrectas",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4 bg-gradient-to-br from-blue-900 via-black to-blue-700">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-blue-500"
      >
        <div className="flex justify-center mb-6">
          <Image
            src="/logo_horizontal_ds_integration.png"
            alt="Logo"
            width={200}
            height={60}
            className="object-contain"
            priority
          />
        </div>

        <div className="flex justify-center mb-4">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-blue-400 text-5xl"
          >
            <FaRobot />
          </motion.div>
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-6">ChatBot</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-blue-300 hover:text-white"
              aria-label="Mostrar u ocultar contrase\u00f1a"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-lg hover:shadow-blue-600"
          >
            Ingresar
          </button>
        </form>
      </motion.div>
    </div>
  );
}
