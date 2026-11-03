import { PRIMARY_WHATSAPP_NUMBER } from "@/data/site";

export type WhatsAppPage =
  | "home"
  | "products"
  | "selector"
  | "videos"
  | "contact"
  | "savings"
  | "general";

type WhatsAppLinkOptions = {
  phone?: string;
  page?: WhatsAppPage | string;
  model?: string;
  people?: number;
  monthlyCost?: number;
  savings?: number;
  message?: string;
};

export function productInterestMessage(model: string) {
  return `Hi, I'm interested in the ${model} stove`;
}

export function getWhatsAppLink({
  phone = PRIMARY_WHATSAPP_NUMBER,
  page,
  model,
  people,
  monthlyCost,
  savings,
  message,
}: WhatsAppLinkOptions = {}) {
  let text = message;

  if (!text) {
    text = "Hi Parampara India 👋";

    switch (page) {
      case "home":
        text +=
          "\nI visited your website and want to understand how wood gasifier stoves work.";
        break;
      case "products":
        text = productInterestMessage(model ?? "wood gasifier");
        break;
      case "selector":
        text += `\nI cook for around ${people} people daily.\nYour website recommended the ${model} stove.\nCan you share pricing, fuel savings, and demo details?`;
        break;
      case "videos":
        text += `\nI watched your ${model} stove video.\nI’d like to know pricing and installation details.`;
        break;
      case "contact":
        text +=
          "\nI’d like to talk to someone regarding stove purchase and demo.";
        break;
      case "savings": {
        const cost = Number(monthlyCost) || 0;
        const estimated = Number(savings) || 0;
        text = `Hi Parampara India 👋
I used your *Savings Calculator* on the website.

My current monthly fuel spend is *₹${cost.toLocaleString("en-IN")}*.
It shows an estimated saving of *₹${estimated.toLocaleString("en-IN")} per month* with Parampara stoves.

Please help me with:
• Recommended stove model
• Exact fuel savings
• Price & demo details`;
        break;
      }
      default:
        text = "Hi, I'm interested in Parampara wood gasifier stoves";
        break;
    }
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
