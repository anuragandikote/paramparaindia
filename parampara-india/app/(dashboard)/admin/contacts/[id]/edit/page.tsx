import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import { contactService } from "@/services/contact.service";
import { PageHeader } from "@/components/common/page-header";
import { ContactForm } from "@/features/contacts/components/contact-form";

export default async function EditContactPage({
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
        <PageHeader title="Edit Contact" description="Update contact details." />
        <ContactForm
          id={id}
          defaultValues={{
            firstName: contact.firstName,
            lastName: contact.lastName || "",
            email: contact.email || "",
            phone: contact.phone || "",
            company: contact.company || "",
            address: contact.address || "",
            notes: contact.notes || "",
          }}
        />
      </div>
    );
  } catch {
    notFound();
  }
}
