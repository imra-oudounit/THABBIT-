/**
 * Locale-aware number formatting helpers.
 */
export function toArabicNumerals(input: number | string): string {
  return String(input).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);
}

export function formatNumber(input: number | string, locale: string): string {
  return locale === "ar" ? toArabicNumerals(input) : String(input);
}
