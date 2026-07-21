import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { contactService } from "@/services/contact.service";
import { SuccessResponse, ErrorResponse, PaginatedResponse } from "@/lib/api-response";
import { handleApiError } from "@/lib/error-handler";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) return ErrorResponse({ message: "Unauthorized", status: 401 });

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || undefined;

    const result = await contactService.list({
      page,
      limit,
      search,
      userId: (session.user as any).id,
    });

    return PaginatedResponse({
      data: result.data,
      page: result.page,
      limit: result.limit,
      total: result.total,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) return ErrorResponse({ message: "Unauthorized", status: 401 });

    const body = await request.json();
    const contact = await contactService.create({
      ...body,
      userId: (session.user as any).id,
    });

    return SuccessResponse({ data: contact, status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
