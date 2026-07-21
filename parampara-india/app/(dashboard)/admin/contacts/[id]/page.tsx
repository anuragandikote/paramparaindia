import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import { contactService } from "@/services/contact.service";
import { PageHeader } from "@/components/common/page-header";
import { EntityActions } from "@/components/common/entity-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Building2, MapPin, FileText } from "lucide-react";

export default async function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;

  try {
    const contact = await contactService.getById(id);

    return (
      <div className="space-y-6">
        <PageHeader
          title={`${contact.firstName} ${contact.lastName || ""}`}
          description={contact.company || undefined}
          actions={
            <EntityActions
              editHref={`/admin/contacts/${id}/edit`}
              deleteEndpoint={`/api/contacts/${id}`}
              entityName="Contact"
            />
          }
        />

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Contact Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {contact.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {contact.email}
                </div>
              )}
              {contact.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {contact.phone}
                </div>
              )}
              {contact.company && (
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  {contact.company}
                </div>
              )}
              {contact.address && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {contact.address}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                {contact.leads.length} leads, {contact.enquiries.length} enquiries
              </div>
              <div className="flex flex-wrap gap-1">
                {contact.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              {contact.notes && (
                <p className="text-sm text-muted-foreground">{contact.notes}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
