import { AppError } from "./AppError";

export function mapFirebaseError(error: unknown): AppError {
  const code = typeof error === "object" && error && "code" in error
    ? String((error as { code: string }).code)
    : "unknown";
  const message = error instanceof Error ? error.message : String(error);
  return new AppError(code as any, message, error);
}
