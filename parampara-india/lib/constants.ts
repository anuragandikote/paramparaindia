export const APP_NAME = "Parampara India CRM";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  STAFF: "staff",
} as const;
