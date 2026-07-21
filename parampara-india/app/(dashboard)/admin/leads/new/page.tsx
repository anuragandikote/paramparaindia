import { PageHeader } from "@/components/common/page-header";
import { LeadForm } from "@/features/leads/components/lead-form";

export default function NewLeadPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="New Lead" description="Add a new lead." />
      <LeadForm />
    </div>
  );
}
