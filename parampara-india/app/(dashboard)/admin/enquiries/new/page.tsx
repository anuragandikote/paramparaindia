import { PageHeader } from "@/components/common/page-header";
import { EnquiryForm } from "@/features/enquiries/components/enquiry-form";

export default function NewEnquiryPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="New Enquiry" description="Log a new enquiry." />
      <EnquiryForm />
    </div>
  );
}
