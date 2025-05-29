import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChatProvider } from "@/context/ChatContext";
import "@/style/tailwind.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatBot UI",
  description: "Frontend para el ChatBot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <body className={`${inter.className} h-full`}>
        <ChatProvider>{children}</ChatProvider>
      </body>
    </html>
  );
}

