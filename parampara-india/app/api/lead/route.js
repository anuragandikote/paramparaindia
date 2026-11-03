import { NextResponse } from "next/server";
import { getWhatsAppLink } from "@/common/getWhatsappLink";

export async function POST(req) {
  try {
    const { name, phone, interest } = await req.json();

    // 1️⃣ Construct the WhatsApp message
    const message = `📢 New Lead from Chatbot
Name: ${name}
Phone: ${phone}
Interest: ${interest}`;

    const waLink = getWhatsAppLink({ message });

    console.log("WhatsApp link:", waLink); // for debugging

    // 4️⃣ Optionally: you can open it client-side or send it back
    return NextResponse.json({ success: true, link: waLink });
  } catch (error) {
    console.error("Error sending WhatsApp lead:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
