import type { Surah } from "../../../features/quran/domain/Surah";

const SURAHS: Surah[] = [
  { n: 1, name: "Al-Fatihah", ar: "الفاتحة", verses: 7, type: "Meccan", pct: 100 },
  { n: 2, name: "Al-Baqarah", ar: "البقرة", verses: 286, type: "Medinan", pct: 18 },
  { n: 36, name: "Yaseen", ar: "يس", verses: 83, type: "Meccan", pct: 82 },
  { n: 67, name: "Al-Mulk", ar: "الملك", verses: 30, type: "Meccan", pct: 100 },
];

export const QuranService = {
  async listSurahs(): Promise<Surah[]> { return SURAHS; },
  async getSurah(n: number): Promise<Surah | null> { return SURAHS.find((s) => s.n === n) || null; },
};
