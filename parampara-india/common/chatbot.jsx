"use client";

import { useState } from "react";

const steps = [
  {
    id: 1,
    bot: "👋 Hi! Welcome to Parampara India. What are you looking for?",
    options: ["Home Cooking", "Commercial Kitchen", "Hotel / Canteen"],
  },
  {
    id: 2,
    bot: "Great 👍 May I know your name?",
    field: "name",
  },
  {
    id: 3,
    bot: "Thanks! Please share your mobile number 📞",
    field: "phone",
  },
  {
    id: 4,
    bot: "Perfect! Our team will contact you shortly 🙌",
  },
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ interest: "", name: "", phone: "" });
  const [input, setInput] = useState("");

  const current = steps[step];

  // Updated sendLead: Sends lead to WhatsApp using wa.me link
  const sendLead = async (data) => {
    try {
      const message = `📢 New Lead from Chatbot
                          Name: ${data.name}
                          Phone: ${data.phone}
                          Interest: ${data.interest}`;

      const encodedMessage = encodeURIComponent(message);
      const waLink = `https://wa.me/917019713708?text=${encodedMessage}`;

      // Open WhatsApp in new tab for notification
      window.open(waLink, "_blank");
    } catch (error) {
      console.error("Error sending lead to WhatsApp:", error);
    }
  };

  const handleSend = async (value) => {
    const userMessage = value || input;
    if (!userMessage) return;

    setMessages((m) => [...m, { from: "user", text: userMessage }]);
    setInput("");

    if (current.options) {
      setForm({ ...form, interest: userMessage });
    } else if (current.field) {
      setForm({ ...form, [current.field]: userMessage });
    }

    const nextStep = step + 1;
    setTimeout(async () => {
      setMessages((m) => [...m, { from: "bot", text: steps[nextStep]?.bot }]);
      setStep(nextStep);

      // When last step (confirmation), send lead to WhatsApp
      if (nextStep === steps.length - 1) {
        await sendLead({ ...form, [current.field]: userMessage });
      }
    }, 500);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => {
          setOpen(true);
          if (messages.length === 0) {
            setMessages([{ from: "bot", text: steps[0].bot }]);
          }
        }}
        className="fixed bottom-4 right-5 z-50 bg-green-600 text-white px-4 py-3 rounded-full shadow-lg"
      >
        💬 AI Chat
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-80 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-green-600 text-white px-4 py-3 flex justify-between">
            <span>Parampara Assistant</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-3 py-2 rounded-lg ${
                  m.from === "bot"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-green-600 text-white ml-auto"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="p-2 border-t">
            {current?.options ? (
              <div className="flex gap-2 flex-wrap">
                {current.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSend(opt)}
                    className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type here..."
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
