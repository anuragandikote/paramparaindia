import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { enquiryService } from "@/services/enquiry.service";
import { SuccessResponse, ErrorResponse } from "@/lib/api-response";
import { handleApiError } from "@/lib/error-handler";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user) return ErrorResponse({ message: "Unauthorized", status: 401 });

    const { id } = await params;
    const enquiry = await enquiryService.getById(id);
    return SuccessResponse({ data: enquiry });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user) return ErrorResponse({ message: "Unauthorized", status: 401 });

    const { id } = await params;
    const body = await request.json();
    const enquiry = await enquiryService.update(id, body);
    return SuccessResponse({ data: enquiry });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user) return ErrorResponse({ message: "Unauthorized", status: 401 });

    const { id } = await params;
    await enquiryService.delete(id);
    return SuccessResponse({ data: { deleted: true } });
  } catch (error) {
    return handleApiError(error);
  }
}
