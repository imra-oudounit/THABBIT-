import { AppError } from "./AppError";
import { ValidationError } from "./ValidationError";
import { NetworkError } from "./NetworkError";
import { mapFirebaseError } from "./FirebaseErrorMapper";

export function mapError(error: unknown): AppError | ValidationError | NetworkError {
  if (error instanceof ValidationError) return error;
  if (error instanceof NetworkError) return error;
  const code = typeof error === "object" && error && "code" in error ? String((error as { code: string }).code) : "";
  if (code.startsWith("auth/") || code.startsWith("firestore/") || code.startsWith("permission-")) {
    return mapFirebaseError(error);
  }
  return AppError.fromUnknown(error);
}
