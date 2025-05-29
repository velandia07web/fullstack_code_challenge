import axios from "axios";
import Cookies from "js-cookie";

// --- Tipos para login ---
interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  return response.data;
};

// --- Tipos para historial ---
export interface ChatMessage {
  id: number;
  sender: "bot" | string; // puede ser 'bot' o nombre del usuario
  content: string;
  createdAt: string;
}

export const fetchChatHistory = async (): Promise<ChatMessage[]> => {
  const token = Cookies.get("token");
  const response = await axios.get<ChatMessage[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/mensajes`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );

  // Ordenar por fecha de creación
  return response.data.sort((a, b) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
};

export const logout = async () => {
  const res = await fetch("http://localhost:4000/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Error al cerrar sesión");
  }
};
