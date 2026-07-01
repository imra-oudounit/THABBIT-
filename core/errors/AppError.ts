/**
 * Domain-level error type used across the application.
 * Wraps low-level errors (Firebase, network, etc.) with a
 * user-friendly code and message.
 */
export type AppErrorCode =
  | "auth/invalid-credential"
  | "auth/user-not-found"
  | "auth/wrong-password"
  | "auth/email-already-in-use"
  | "auth/weak-password"
  | "auth/invalid-email"
  | "auth/missing-email"
  | "auth/popup-closed-by-user"
  | "auth/invalid-phone-number"
  | "auth/invalid-verification-code"
  | "auth/code-expired"
  | "auth/too-many-requests"
  | "auth/unauthorized-continue-uri"
  | "network/unreachable"
  | "firestore/permission-denied"
  | "unknown";

export class AppError extends Error {
  readonly code: AppErrorCode;
  readonly cause?: unknown;

  constructor(code: AppErrorCode, message?: string, cause?: unknown) {
    super(message ?? code);
    this.code = code;
    this.cause = cause;
    this.name = "AppError";
  }

  static fromUnknown(err: unknown): AppError {
    if (err instanceof AppError) return err;
    const code = typeof err === "object" && err && "code" in err
      ? String((err as { code: string }).code) as AppErrorCode
      : "unknown";
    const message = err instanceof Error ? err.message : String(err);
    return new AppError(code, message, err);
  }
}
