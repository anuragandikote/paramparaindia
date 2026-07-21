import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import { enquiryService } from "@/services/enquiry.service";
import { EnquiryDetailContent } from "./detail";

export default async function EnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;

  try {
    const enquiry = await enquiryService.getById(id);
    return <EnquiryDetailContent enquiry={enquiry} />;
  } catch {
    notFound();
  }
}
