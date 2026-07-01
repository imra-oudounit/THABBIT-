import { useMemo, useState } from "react";
import { Icon } from "../components/Icon";
import { StatusBar } from "../components/Phone";

export type QuranSurah = {
  n: number;
  name: string;
  transliteration?: string;
  ar: string;
  verses: number;
  type: "Meccan" | "Medinan" | string;
  revelationOrder?: number;
  startPage?: number;
  endPage?: number;
  juz?: number;
  hizb?: number;
  rub?: number;
  sajdah?: boolean;
  favorite?: boolean;
  lastProgress?: number;
  theme?: string;
  description?: string;
  color?: string;
};

const surahs: QuranSurah[] = [
  { n: 1, name: "Al-Fatihah", transliteration: "The Opening", ar: "الفاتحة", verses: 7, type: "Meccan", revelationOrder: 5, startPage: 1, endPage: 1, juz: 1, hizb: 1, rub: 1, favorite: true, lastProgress: 100 },
  { n: 2, name: "Al-Baqarah", transliteration: "The Cow", ar: "البقرة", verses: 286, type: "Medinan", revelationOrder: 87, startPage: 2, endPage: 49, juz: 1, hizb: 1, rub: 2, lastProgress: 18 },
  { n: 3, name: "Aali Imran", transliteration: "Family of Imran", ar: "آل عمران", verses: 200, type: "Medinan", revelationOrder: 89, startPage: 50, endPage: 76, juz: 3, hizb: 6, rub: 24, lastProgress: 8 },
  { n: 4, name: "An-Nisa", transliteration: "The Women", ar: "النساء", verses: 176, type: "Medinan", revelationOrder: 92, startPage: 77, endPage: 106, juz: 4, hizb: 10, rub: 39, lastProgress: 0 },
  { n: 5, name: "Al-Maidah", transliteration: "The Table", ar: "المائدة", verses: 120, type: "Medinan", revelationOrder: 112, startPage: 106, endPage: 127, juz: 6, hizb: 12, rub: 48, lastProgress: 0 },
  { n: 18, name: "Al-Kahf", transliteration: "The Cave", ar: "الكهف", verses: 110, type: "Meccan", revelationOrder: 69, startPage: 293, endPage: 304, juz: 15, hizb: 30, rub: 119, favorite: true, lastProgress: 45 },
  { n: 36, name: "Yaseen", transliteration: "Yaseen", ar: "يس", verses: 83, type: "Meccan", revelationOrder: 41, startPage: 440, endPage: 445, juz: 22, hizb: 44, rub: 176, lastProgress: 82 },
  { n: 55, name: "Ar-Rahman", transliteration: "The Most Merciful", ar: "الرحمن", verses: 78, type: "Medinan", revelationOrder: 97, startPage: 531, endPage: 534, juz: 27, hizb: 53, rub: 211, lastProgress: 30 },
  { n: 67, name: "Al-Mulk", transliteration: "The Sovereignty", ar: "الملك", verses: 30, type: "Meccan", revelationOrder: 77, startPage: 562, endPage: 564, juz: 29, hizb: 57, rub: 226, favorite: true, lastProgress: 100 },
  { n: 114, name: "An-Nas", transliteration: "Mankind", ar: "الناس", verses: 6, type: "Meccan", revelationOrder: 21, startPage: 604, endPage: 604, juz: 30, hizb: 60, rub: 240, lastProgress: 100 },
];

const filters = ["جميع السور", "مكية", "مدنية", "المفضلة", "آخر قراءة"];

export function QuranScreen({
  onBack,
  onOpenReader,
}: {
  onBack?: () => void;
  onOpenReader?: (surah: QuranSurah) => void;
} = {}) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("جميع السور");

  const filteredSurahs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return surahs.filter((s) => {
      const matchesQuery = !q || s.ar.includes(query.trim()) || s.name.toLowerCase().includes(q) || s.transliteration?.toLowerCase().includes(q) || String(s.n) === q;
      const matchesFilter =
        activeFilter === "جميع السور" ||
        (activeFilter === "مكية" && s.type === "Meccan") ||
        (activeFilter === "مدنية" && s.type === "Medinan") ||
        (activeFilter === "المفضلة" && s.favorite) ||
        (activeFilter === "آخر قراءة" && (s.lastProgress || 0) > 0);
      return matchesQuery && matchesFilter;
    });
  }, [query, activeFilter]);

  const continueSurah = surahs.find((s) => (s.lastProgress || 0) > 0 && (s.lastProgress || 0) < 100) || surahs[1];

  return (
    <div className="h-full w-full bg-mesh relative overflow-hidden flex flex-col" dir="rtl">
      <div className="flex-1 overflow-y-auto phone-scroll pb-8">
        <StatusBar />

        <div className="px-5 pt-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="w-10 h-10 rounded-2xl glass flex items-center justify-center">
                <Icon name="arrow_back" className="text-slate-700" size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 font-arabic">القرآن الكريم</h1>
                <p className="mt-0.5 text-xs text-slate-500 font-arabic">اقرأ وتدبر كتاب الله</p>
              </div>
            </div>
            <button className="w-10 h-10 rounded-2xl glass flex items-center justify-center">
              <Icon name="tune" className="text-slate-700" size={20} />
            </button>
          </div>

          <div className="mt-5 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center px-4 gap-2">
            <Icon name="search" className="text-slate-400" size={20} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن سورة أو رقم أو صفحة..."
              className="flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400 font-arabic"
            />
            <button className="text-emerald-700">
              <Icon name="mic" size={20} />
            </button>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto phone-scroll -mx-1 px-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`shrink-0 px-3.5 h-9 rounded-full text-[11px] font-semibold font-arabic transition active:scale-95 ${
                  activeFilter === f ? "bg-brand-gradient text-white shadow-md shadow-emerald-600/30" : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => onOpenReader?.(continueSurah)}
          className="mx-5 mt-5 rounded-[28px] bg-brand-gradient p-5 text-white shadow-xl shadow-emerald-600/20 relative overflow-hidden text-right block"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] text-emerald-100 font-arabic">متابعة القراءة</div>
              <div className="mt-1 text-xl font-bold font-arabic">{continueSurah.ar}</div>
              <div className="mt-1 text-[10px] text-emerald-100 font-arabic">صفحة {continueSurah.startPage} · الجزء {continueSurah.juz}</div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
              <Icon name="play_arrow" size={26} filled />
            </div>
          </div>
        </button>

        <div className="mx-5 mt-5 space-y-2.5">
          {filteredSurahs.map((surah) => (
            <button
              key={surah.n}
              onClick={() => onOpenReader?.(surah)}
              className="w-full rounded-[24px] bg-white border border-slate-100 p-3.5 shadow-sm hover:shadow-md active:scale-[0.99] transition text-right block"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 40 40" className="w-full h-full">
                    <polygon points="20,2 24,16 38,16 27,24 31,38 20,30 9,38 13,24 2,16 16,16" fill="#ecfdf5" stroke="#16a34a" strokeWidth="1.2" />
                  </svg>
                  <span className="absolute text-[10px] font-bold text-emerald-700">{surah.n}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-arabic text-xl font-bold text-slate-900 truncate">{surah.ar}</span>
                    <button className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${surah.favorite ? "bg-amber-50 text-amber-500" : "bg-slate-50 text-slate-400"}`}>
                      <Icon name={surah.favorite ? "favorite" : "favorite_border"} size={17} filled={surah.favorite} />
                    </button>
                  </div>
                  <div className="mt-0.5 text-xs font-semibold text-slate-500 text-left" dir="ltr">{surah.name}</div>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500 font-arabic">
                    <span className="inline-flex items-center gap-1"><Icon name="menu_book" size={12} className="text-emerald-700" />{surah.verses} آية</span>
                    <span>·</span>
                    <span>{surah.type === "Meccan" ? "مكية" : "مدنية"}</span>
                    {surah.revelationOrder && <><span>·</span><span>ترتيب {surah.revelationOrder}</span></>}
                    {surah.juz && <><span>·</span><span>جزء {surah.juz}</span></>}
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-brand-gradient rounded-full" style={{ width: `${surah.lastProgress || 0}%` }} />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}