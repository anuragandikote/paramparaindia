import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppLink } from "./getWhatsappLink";

export default function FloatingWhatsAppCTA() {
  return (
    <a
      href={getWhatsAppLink({ page: "home" })}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="
        fixed bottom-6 right-6 z-[200]
        flex items-center gap-2
        rounded-full
        bg-[#25D366]
        px-4 py-3
        text-sm font-semibold text-white
        shadow-lg
        hover:bg-[#1EBE5D]
        transition-all
      "
    >
      <FaWhatsapp className="h-5 w-5" />
      <span className="hidden sm:block">Chat with us</span>
    </a>
  );
}
