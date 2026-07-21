import { NextRequest } from "next/server";
import { enquiryService } from "@/services/enquiry.service";
import { SuccessResponse, ErrorResponse } from "@/lib/api-response";
import { handleApiError } from "@/lib/error-handler";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.message) {
      return ErrorResponse({
        message: "Name and message are required",
        status: 400,
        errors: {
          name: !body.name ? ["Required"] : [],
          message: !body.message ? ["Required"] : [],
        },
      });
    }

    const enquiry = await enquiryService.submitPublic({
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      subject: body.subject,
      message: body.message,
      source: body.source || "website",
    });

    return SuccessResponse({ data: enquiry, status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
