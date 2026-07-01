import { Icon } from "../components/Icon";
import { StatusBar } from "../components/Phone";

export function MemorizationScreen() {
  return (
    <div className="h-full w-full bg-white relative pb-28">
      <StatusBar />

      {/* Header */}
      <div className="px-5 pt-10 flex items-center justify-between">
        <button className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center">
          <Icon name="arrow_back" size={20} />
        </button>
        <div className="text-center">
          <div className="font-arabic text-base font-bold text-slate-900">سورة يس</div>
          <div className="text-[10px] text-slate-500">Yaseen · Juz 22 · 83 verses</div>
        </div>
        <button className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center">
          <Icon name="bookmark" className="text-amber-600" size={20} filled />
        </button>
      </div>

      {/* Progress strip */}
      <div className="mx-5 mt-4 rounded-2xl bg-emerald-50 p-3 flex items-center gap-3">
        <div className="text-[10px] font-semibold text-emerald-700 px-2 py-0.5 rounded-full bg-white">
          67/83
        </div>
        <div className="flex-1 h-1.5 bg-white rounded-full overflow-hidden">
          <div className="h-full bg-brand-gradient rounded-full" style={{ width: "82%" }} />
        </div>
        <span className="text-[10px] font-bold text-emerald-700">82%</span>
      </div>

      {/* Bismillah */}
      <div className="mt-5 text-center font-quran text-2xl text-slate-800" dir="rtl">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </div>

      {/* Verse cards */}
      <div className="mx-5 mt-5 space-y-3">
        {[
          { n: 1, ar: "يسٓ", memorized: true },
          { n: 2, ar: "وَالْقُرْآنِ الْحَكِيمِ", memorized: true, active: true },
          { n: 3, ar: "إِنَّكَ لَمِنَ الْمُرْسَلِينَ", memorized: false },
        ].map((v) => (
          <div
            key={v.n}
            className={`rounded-2xl p-4 border ${
              v.active ? "bg-emerald-50 border-emerald-200 shadow-md shadow-emerald-200/50" : "bg-white border-slate-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative inline-flex items-center justify-center">
                  <svg viewBox="0 0 32 32" width="28" height="28">
                    <polygon points="16,2 19,12 30,12 21,18 24,29 16,22 8,29 11,18 2,12 13,12"
                      fill={v.active ? "#16a34a" : "#e2e8f0"} />
                  </svg>
                  <span className={`absolute text-[9px] font-bold ${v.active ? "text-white" : "text-slate-700"}`}>
                    {v.n}
                  </span>
                </span>
                {v.memorized && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold flex items-center gap-1">
                    <Icon name="check_circle" size={12} filled /> Memorized
                  </span>
                )}
              </div>
              <div className="flex gap-1">
                <button className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center">
                  <Icon name="repeat" className="text-slate-600" size={16} />
                </button>
                <button className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center">
                  <Icon name="more_horiz" className="text-slate-600" size={16} />
                </button>
              </div>
            </div>
            <div className="mt-3 font-quran text-right text-[22px] leading-loose text-slate-900" dir="rtl">
              {v.ar}
            </div>
            {v.active && (
              <div className="mt-2 text-xs text-slate-500 italic leading-relaxed">
                "By the Wise Quran."
              </div>
            )}
            {v.active && (
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-8 rounded-full bg-white flex items-center px-2 gap-1">
                  {Array.from({ length: 22 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-0.5 rounded-full bg-emerald-500 wave-bar"
                      style={{
                        height: `${8 + Math.sin(i) * 12 + 8}px`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-semibold text-emerald-700">0:14</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Audio player bar */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
        <div className="rounded-[24px] glass shadow-xl shadow-slate-900/15 p-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-md">
              <Icon name="pause" className="text-white" size={22} filled />
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-semibold text-slate-900">Mishary Al-Afasy</div>
              <div className="text-[9px] text-slate-500">Verse 2 · Repeat ∞</div>
              <div className="mt-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-brand-gradient w-1/3" />
              </div>
            </div>
            <button className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
              <Icon name="repeat" className="text-emerald-700" size={18} />
            </button>
            <button className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
              <Icon name="speed" className="text-slate-600" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
