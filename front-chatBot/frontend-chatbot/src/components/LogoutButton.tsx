"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FiLogOut } from "react-icons/fi";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-gray-500 hover:text-red-500 transition"
      title="Cerrar sesión"
    >
      <FiLogOut className="text-2xl" />
    </button>
  );
}
