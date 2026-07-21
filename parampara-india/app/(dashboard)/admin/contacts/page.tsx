import Link from "next/link";
import { auth } from "@/lib/auth";
import { contactService } from "@/services/contact.service";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Mail, Phone, Building2 } from "lucide-react";

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const search = params.search || undefined;

  const result = await contactService.list({
    page,
    limit: 20,
    search,
    userId: (session!.user as any).id,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contacts"
        description={`${result.total} total contacts`}
        actions={
          <Button asChild>
            <Link href="/admin/contacts/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Link>
          </Button>
        }
      />

      {result.data.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">No contacts yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {result.data.map((contact) => (
            <Link key={contact.id} href={`/admin/contacts/${contact.id}`}>
              <Card className="transition-colors hover:bg-accent">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {contact.firstName} {contact.lastName}
                      </h3>
                      {contact.company && (
                        <p className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Building2 className="h-3 w-3" />
                          {contact.company}
                        </p>
                      )}
                    </div>
                    <Badge variant="secondary">{contact._count.leads} leads</Badge>
                  </div>
                  <div className="mt-3 space-y-1">
                    {contact.email && (
                      <p className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {contact.email}
                      </p>
                    )}
                    {contact.phone && (
                      <p className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {contact.phone}
                      </p>
                    )}
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
