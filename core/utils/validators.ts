/**
 * Pure validation helpers (no UI dependencies).
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validators = {
  isEmail: (value: string): boolean => EMAIL_REGEX.test(value.trim()),
  isNonEmpty: (value: string): boolean => value.trim().length > 0,
  minLength: (value: string, min: number): boolean => value.length >= min,
  isPhone: (value: string): boolean => /^\+?[0-9]{6,15}$/.test(value.replace(/\s|-/g, "")),
  passwordsMatch: (a: string, b: string): boolean => a === b,
};
