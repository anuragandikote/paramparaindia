import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import { enquiryService } from "@/services/enquiry.service";
import { PageHeader } from "@/components/common/page-header";
import { EnquiryForm } from "@/features/enquiries/components/enquiry-form";

export default async function EditEnquiryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;

  try {
    const enquiry = await enquiryService.getById(id);

    return (
      <div className="space-y-6">
        <PageHeader title="Edit Enquiry" description="Update enquiry details." />
        <EnquiryForm
          id={id}
          defaultValues={{
            name: enquiry.name,
            email: enquiry.email || "",
            phone: enquiry.phone || "",
            company: enquiry.company || "",
            subject: enquiry.subject || "",
            message: enquiry.message,
            type: enquiry.type as any,
            status: enquiry.status as any,
          }}
        />
      </div>
    );
  } catch {
    notFound();
  }
}
