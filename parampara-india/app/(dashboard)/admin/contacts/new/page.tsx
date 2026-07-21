import { PageHeader } from "@/components/common/page-header";
import { ContactForm } from "@/features/contacts/components/contact-form";

export default function NewContactPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="New Contact" description="Add a new contact." />
      <ContactForm />
    </div>
  );
}
