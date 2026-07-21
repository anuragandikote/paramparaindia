import Link from "next/link";
import { auth } from "@/lib/auth";
import { leadService } from "@/services/lead.service";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, IndianRupee } from "lucide-react";

const statusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-800",
  CONTACTED: "bg-yellow-100 text-yellow-800",
  QUALIFIED: "bg-purple-100 text-purple-800",
  PROPOSAL: "bg-indigo-100 text-indigo-800",
  NEGOTIATION: "bg-orange-100 text-orange-800",
  WON: "bg-green-100 text-green-800",
  LOST: "bg-red-100 text-red-800",
};

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; status?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const search = params.search || undefined;
  const status = (params.status as any) || undefined;

  const result = await leadService.list({
    page,
    limit: 20,
    search,
    userId: (session!.user as any).id,
    status,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads"
        description={`${result.total} total leads`}
        actions={
          <Button asChild>
            <Link href="/admin/leads/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Lead
            </Link>
          </Button>
        }
      />

      {result.data.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">No leads yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {result.data.map((lead) => (
            <Link key={lead.id} href={`/admin/leads/${lead.id}`}>
              <Card className="transition-colors hover:bg-accent">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <h3 className="font-semibold">{lead.title}</h3>
                    {lead.contact && (
                      <p className="text-sm text-muted-foreground">
                        {lead.contact.firstName} {lead.contact.lastName}
                      </p>
                    )}
                    {lead.description && (
                      <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                        {lead.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {lead.value && (
                      <span className="flex items-center text-sm font-medium">
                        <IndianRupee className="h-3 w-3" />
                        {lead.value.toLocaleString("en-IN")}
                      </span>
                    )}
                    <Badge className={statusColors[lead.status] || ""}>
                      {lead.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
