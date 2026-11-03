export const SITE_URL = "https://paramparaindia.in";
export const SITE_NAME = "Parampara India";

export const CONTACT_EMAIL = "info@paramparaindia.in";

export type PhoneContact = {
  display: string;
  tel: string;
  whatsapp: string;
};

/** Both numbers are on WhatsApp. Promotional site links use the first number. */
export const PHONES: readonly PhoneContact[] = [
  {
    display: "+91 80881 33619",
    tel: "+918088133619",
    whatsapp: "918088133619",
  },
  {
    display: "+91 96115 04978",
    tel: "+919611504978",
    whatsapp: "919611504978",
  },
];

export const PRIMARY_WHATSAPP_NUMBER = PHONES[0].whatsapp;

export const ADDRESS = {
  line: "Ground Floor, 46/1, Kanakapura Main Road, Near Silk Institute Metro Station, Talaghattapura, Bengaluru, Karnataka 560062",
  streetAddress:
    "Ground Floor, 46/1, Kanakapura Main Road, Near Silk Institute Metro Station, Talaghattapura",
  locality: "Bengaluru",
  region: "Karnataka",
  postalCode: "560062",
  country: "IN",
} as const;

export const LPG_SAVINGS_CLAIM = "Up to 80% LPG savings";

export const WOOD_SAVINGS_CLAIM = "Save up to 50% on wood";

export const WARRANTY_AND_BLOWER_CARE =
  "Warranty: Stove – 1 year. Blower – 3 months. Covers manufacturing defects only. Blower care: Remove the blower from the stove once cooking is over. Do not leave it on the hot stove, even when switched off – heat from the cast-iron chamber can burn it out, and this is not covered by warranty.";

export const PUBLIC_ROUTES = [
  "/",
  "/products",
  "/contact",
  "/faq",
  "/quiz",
  "/videos",
] as const;
