import { NextResponse } from 'next/server';

/**
 * Standardized API error response handler
 * @param error - The error object caught in the catch block
 * @param message - Custom error message to return to the client
 * @param statusCode - HTTP status code (default: 500)
 * @returns NextResponse with standardized error format
 */
export function handleApiError(
  error: unknown,
  message: string,
  statusCode: number = 500
): NextResponse {
  // Log the full error for debugging (server-side only)
  console.error(`[API Error] ${message}:`, error);

  // Return sanitized error to client
  return NextResponse.json(
    {
      message,
      error: error instanceof Error ? error.message : 'Unknown Error',
    },
    { status: statusCode }
  );
}
