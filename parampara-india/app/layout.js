import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import FloatingWhatsApp from "@/common/floatingWhatsappCTA";
import FloatingVideo from "@/common/floatingVideo";
import ChatBot from "@/common/chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Parampara India | Wood Gasifier Stoves",
  description:
    "Parampara India manufactures high-efficiency wood gasifier stoves for hotels, hostels, industries, temples, and large kitchens. Save up to 80% on LPG costs.",
  keywords: [
    "wood gasifier stove",
    "commercial cooking stove",
    "LPG alternative",
    "Parampara India",
    "hotel kitchen stove",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        {/* <FloatingWhatsApp /> */}
        <FloatingVideo />
        <ChatBot />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
