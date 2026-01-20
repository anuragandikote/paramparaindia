import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, phone, interest } = await req.json();

    // 1️⃣ Construct the WhatsApp message
    const message = `📢 New Lead from Chatbot
Name: ${name}
Phone: ${phone}
Interest: ${interest}`;

    // 2️⃣ Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // 3️⃣ WhatsApp wa.me link
    const waLink = `https://wa.me/917019713708?text=${encodedMessage}`;

    console.log("WhatsApp link:", waLink); // for debugging

    // 4️⃣ Optionally: you can open it client-side or send it back
    return NextResponse.json({ success: true, link: waLink });
  } catch (error) {
    console.error("Error sending WhatsApp lead:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
