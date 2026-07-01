import { Icon } from "../components/Icon";
import { StatusBar } from "../components/Phone";
import { useLanguage } from "../i18n/LanguageContext";

export function MissionsScreen({ onBack }: { onBack?: () => void } = {}) {
  const { t, locale } = useLanguage();
  const isAr = locale === "ar";

  return (
    <div className="h-full w-full bg-mesh relative pb-6" dir={isAr ? "rtl" : "ltr"}>
      <StatusBar />
      <div className="px-5 pt-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-2xl glass flex items-center justify-center shrink-0">
            <Icon name="arrow_back" className="text-slate-700" size={20} />
          </button>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">{t("pages.missions.title")}</div>
            <h1 className="text-2xl font-bold text-slate-900 mt-0.5">{t("pages.missions.subtitle")}</h1>
          </div>
        </div>
        <div className="px-3 h-10 rounded-2xl bg-gold-gradient text-white flex items-center gap-1.5 shadow-md">
          <Icon name="paid" size={16} filled />
          <span className="font-bold text-sm">1,240</span>
        </div>
      </div>

      {/* Streak card */}
      <div className="mx-5 mt-4 rounded-[24px] bg-gradient-to-br from-orange-400 via-rose-500 to-pink-600 p-4 text-white relative overflow-hidden shadow-lg">
        <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-white/15" />
        <div className="flex items-center gap-3 relative">
          <div className="text-5xl">🔥</div>
          <div className="flex-1">
            <div className="text-3xl font-bold">42</div>
            <div className="text-xs text-white/90">{t("pages.missions.streak")}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-white/80">{t("pages.missions.best")}</div>
            <div className="text-lg font-bold">87</div>
          </div>
        </div>
        <div className="mt-3 flex gap-1.5">
          {["S","M","T","W","T","F","S"].map((d, i) => (
            <div key={i} className="flex-1 text-center">
              <div className={`mx-auto w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-bold ${i < 5 ? "bg-white text-rose-600" : "bg-white/20 text-white"}`}>
                {i < 5 ? "✓" : d}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Missions list */}
      <div className="mx-5 mt-5 space-y-2.5">
        {[
          { i: "menu_book", c: "bg-emerald-100 text-emerald-700", t: t("pages.missions.memorize"), p: 3, max: 5, xp: 50 },
          { i: "mic", c: "bg-teal-100 text-teal-700", t: t("pages.missions.recite"), p: 9, max: 15, xp: 75 },
          { i: "replay", c: "bg-amber-100 text-amber-700", t: t("pages.missions.review"), p: 10, max: 10, xp: 100, done: true },
          { i: "quiz", c: "bg-rose-100 text-rose-700", t: t("pages.missions.quiz"), p: 1, max: 3, xp: 60 },
        ].map((m, i) => (
          <div key={i} className={`rounded-2xl p-3.5 border ${m.done ? "bg-emerald-50 border-emerald-200" : "bg-white border-slate-100"} shadow-sm`}>
            <div className="flex items-start gap-3">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${m.c}`}>
                <Icon name={m.i} size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-900">{m.t}</div>
                  {m.done ? (
                    <Icon name="check_circle" className="text-emerald-600" filled size={20} />
                  ) : (
                    <span className="text-[11px] font-bold text-slate-700">{m.p}/{m.max}</span>
                  )}
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-brand-gradient rounded-full" style={{ width: `${(m.p / m.max) * 100}%` }} />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold flex items-center gap-1">
                    <Icon name="paid" size={10} filled /> +{m.xp}
                  </span>
                  <span className="text-[10px] text-slate-500">{t("pages.missions.today")}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard preview */}
      <div className="mx-5 mt-5 rounded-2xl bg-white p-4 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-slate-900">{t("pages.missions.leaderboard")}</div>
          <button className="text-[11px] font-semibold text-emerald-700">{t("pages.missions.view")}</button>
        </div>
        <div className="mt-3 space-y-2">
          {[
            { r: 1, n: "Aisha S.", xp: 4820, m: "👑" },
            { r: 2, n: t("pages.missions.you"), xp: 4560, m: "🥈", you: true },
            { r: 3, n: "Omar K.", xp: 3920, m: "🥉" },
          ].map((p) => (
            <div key={p.r} className={`flex items-center gap-3 p-2 rounded-xl ${p.you ? "bg-emerald-50" : ""}`}>
              <span className="text-lg">{p.m}</span>
              <div className="flex-1 text-xs font-semibold text-slate-800">{p.n}</div>
              <div className="text-xs font-bold text-emerald-700">{p.xp.toLocaleString()} XP</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
