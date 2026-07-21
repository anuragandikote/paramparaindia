import { Prisma } from "@prisma/client";
import { ErrorResponse } from "./api-response";
import { logger } from "./logger";

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function handleApiError(error: unknown) {
  logger.error("API Error", { error: String(error) });

  if (error instanceof AppError) {
    return ErrorResponse({ message: error.message, status: error.statusCode });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2025":
        return ErrorResponse({ message: "Record not found", status: 404 });
      case "P2002":
        return ErrorResponse({
          message: "A record with this value already exists",
          status: 409,
        });
      case "P2003":
        return ErrorResponse({
          message: "Related record not found",
          status: 400,
        });
      default:
        return ErrorResponse({ message: "Database error occurred", status: 500 });
    }
  }

  if (error instanceof Error) {
    return ErrorResponse({ message: error.message, status: 500 });
  }

  return ErrorResponse({ message: "An unexpected error occurred", status: 500 });
}
