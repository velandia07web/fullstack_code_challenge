
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import DashboardClient from "./DashboardClient";
import { ChatProvider } from "@/context/ChatContext";

export default function ProtectedDashboard() {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setAuthorized(true);
    } else {
      router.push("/");
    }
  }, [router]);

  if (!authorized) {
    return null; 
  }

  return (
    <ChatProvider>
      <DashboardClient />
    </ChatProvider>
  );
}
