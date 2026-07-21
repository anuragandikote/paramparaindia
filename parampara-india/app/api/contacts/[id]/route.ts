import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { contactService } from "@/services/contact.service";
import { SuccessResponse, ErrorResponse } from "@/lib/api-response";
import { handleApiError } from "@/lib/error-handler";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user) return ErrorResponse({ message: "Unauthorized", status: 401 });

    const { id } = await params;
    const contact = await contactService.getById(id);
    return SuccessResponse({ data: contact });
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
    const contact = await contactService.update(id, body);
    return SuccessResponse({ data: contact });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user) return ErrorResponse({ message: "Unauthorized", status: 401 });

    const { id } = await params;
    await contactService.delete(id);
    return SuccessResponse({ data: { deleted: true } });
  } catch (error) {
    return handleApiError(error);
  }
}
