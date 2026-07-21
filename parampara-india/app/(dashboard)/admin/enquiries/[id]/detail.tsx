"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { enquiryService } from "@/services/enquiry.service";
import { PageHeader } from "@/components/common/page-header";
import { EntityActions } from "@/components/common/entity-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, Building2, Calendar, Globe } from "lucide-react";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  IN_PROGRESS: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  RESOLVED: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  CLOSED: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
};

interface EnquiryDetailProps {
  enquiry: any;
}

export function EnquiryStatusSelect({ enquiry }: EnquiryDetailProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleStatusChange(status: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/enquiries/${enquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Status updated");
      router.refresh();
    } catch {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Select value={enquiry.status} onValueChange={handleStatusChange} disabled={loading}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PENDING">Pending</SelectItem>
        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
        <SelectItem value="RESOLVED">Resolved</SelectItem>
        <SelectItem value="CLOSED">Closed</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function EnquiryDetailContent({ enquiry }: EnquiryDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <PageHeader
          title={`Enquiry from ${enquiry.name}`}
          description={enquiry.subject || undefined}
        />
        <div className="flex items-center gap-3">
          <EnquiryStatusSelect enquiry={enquiry} />
          <EntityActions
            editHref={`/admin/enquiries/${enquiry.id}/edit`}
            deleteEndpoint={`/api/enquiries/${enquiry.id}`}
            entityName="Enquiry"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Badge className={statusColors[enquiry.status] || ""}>{enquiry.status}</Badge>
              <Badge variant="outline">{enquiry.type}</Badge>
            </div>
            {enquiry.email && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {enquiry.email}
              </div>
            )}
            {enquiry.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {enquiry.phone}
              </div>
            )}
            {enquiry.company && (
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                {enquiry.company}
              </div>
            )}
            {enquiry.source && (
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-muted-foreground" />
                {enquiry.source}
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              {new Date(enquiry.createdAt).toLocaleString("en-IN")}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Message</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-sm">{enquiry.message}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
