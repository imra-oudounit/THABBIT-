/**
 * Domain entity for a Quran surah used in the Quran/Reader features.
 */
export interface Surah {
  n: number;
  name: string;
  ar: string;
  verses: number;
  type: "Meccan" | "Medinan" | string;
  pct: number;
}
