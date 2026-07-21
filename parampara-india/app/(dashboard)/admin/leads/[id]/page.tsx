import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import { leadService } from "@/services/lead.service";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IndianRupee, Calendar, User, Globe } from "lucide-react";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;

  try {
    const lead = await leadService.getById(id);

    return (
      <div className="space-y-6">
        <PageHeader
          title={lead.title}
          description={lead.contact ? `Contact: ${lead.contact.firstName} ${lead.contact.lastName}` : undefined}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Lead Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Badge>{lead.status}</Badge>
                <Badge variant="outline">{lead.source}</Badge>
              </div>
              {lead.value && (
                <div className="flex items-center gap-2 text-sm">
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  {lead.value.toLocaleString("en-IN")}
                </div>
              )}
              {lead.assignedTo && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  {lead.assignedTo}
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Created {new Date(lead.createdAt).toLocaleDateString("en-IN")}
              </div>
              {lead.closedAt && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Closed {new Date(lead.closedAt).toLocaleDateString("en-IN")}
                </div>
              )}
            </CardContent>
          </Card>

          {lead.description && (
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{lead.description}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
