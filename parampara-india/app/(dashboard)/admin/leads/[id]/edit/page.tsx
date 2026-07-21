import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import { leadService } from "@/services/lead.service";
import { PageHeader } from "@/components/common/page-header";
import { LeadForm } from "@/features/leads/components/lead-form";

export default async function EditLeadPage({
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
        <PageHeader title="Edit Lead" description="Update lead details." />
        <LeadForm
          id={id}
          defaultValues={{
            title: lead.title,
            description: lead.description || "",
            value: lead.value || undefined,
            status: lead.status as any,
            source: lead.source as any,
            assignedTo: lead.assignedTo || "",
          }}
        />
      </div>
    );
  } catch {
    notFound();
  }
}
