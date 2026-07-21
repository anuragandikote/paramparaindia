import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  StatsCard,
  Users,
  Target,
  MessageSquare,
  IndianRupee,
} from "@/components/common/stats-card";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const userId = (session.user as any).id as string;

  const [
    contactCount,
    leadCount,
    enquiryCount,
    pendingEnquiries,
    activeLeads,
    totalValue,
  ] = await Promise.all([
    prisma.contact.count({ where: { userId } }),
    prisma.lead.count({ where: { userId } }),
    prisma.enquiry.count({ where: { userId } }),
    prisma.enquiry.count({ where: { userId, status: "PENDING" } }),
    prisma.lead.count({
      where: { userId, status: { notIn: ["WON", "LOST"] } },
    }),
    prisma.lead.aggregate({
      where: { userId, status: "WON" },
      _sum: { value: true },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session.user?.name || "User"}. Here&apos;s your CRM
          overview.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/contacts">
          <StatsCard
            title="Contacts"
            value={contactCount}
            icon={<Users className="h-5 w-5" />}
          />
        </Link>
        <Link href="/admin/leads">
          <StatsCard
            title="Active Leads"
            value={activeLeads}
            description={`${leadCount} total`}
            icon={<Target className="h-5 w-5" />}
          />
        </Link>
        <Link href="/admin/enquiries">
          <StatsCard
            title="Enquiries"
            value={enquiryCount}
            description={`${pendingEnquiries} pending`}
            icon={<MessageSquare className="h-5 w-5" />}
          />
        </Link>
        <StatsCard
          title="Revenue (Won)"
          value={`₹${(totalValue._sum.value || 0).toLocaleString("en-IN")}`}
          icon={<IndianRupee className="h-5 w-5" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/contacts">
                <Plus className="mr-2 h-4 w-4" />
                Add Contact
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/leads">
                <Plus className="mr-2 h-4 w-4" />
                Add Lead
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/enquiries">
                View Enquiries
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
