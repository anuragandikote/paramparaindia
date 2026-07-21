import { NextResponse } from "next/server";

interface SuccessResponseOptions<T> {
  data: T;
  status?: number;
}

interface ErrorResponseOptions {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

interface PaginatedResponseOptions<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
}

export function SuccessResponse<T>({ data, status = 200 }: SuccessResponseOptions<T>) {
  return NextResponse.json({ success: true, data }, { status });
}

export function ErrorResponse({ message, status = 500, errors }: ErrorResponseOptions) {
  return NextResponse.json(
    { success: false, error: { message, ...(errors && { errors }) } },
    { status }
  );
}

export function PaginatedResponse<T>({ data, page, limit, total }: PaginatedResponseOptions<T>) {
  return NextResponse.json({
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
