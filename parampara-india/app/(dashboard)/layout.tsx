import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM Dashboard | Parampara India",
  description: "Parampara India CRM Administration Dashboard",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
