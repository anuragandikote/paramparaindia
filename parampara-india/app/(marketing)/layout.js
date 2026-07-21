import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import FloatingVideo from "@/common/floatingVideo";
import ChatBot from "@/common/chatbot";

export default function MarketingLayout({ children }) {
  return (
    <>
      <FloatingVideo />
      <ChatBot />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
