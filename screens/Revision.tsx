import { Icon } from "../components/Icon";
import { StatusBar } from "../components/Phone";
import { useLanguage } from "../i18n/LanguageContext";

export function RevisionScreen({ onBack }: { onBack?: () => void } = {}) {
  const { t, locale } = useLanguage();
  const isAr = locale === "ar";
  const weekdays = locale === "ar" ? ["ح","ن","ث","ر","خ","ج","س"] : locale === "fr" ? ["L","M","M","J","V","S","D"] : ["M","T","W","T","F","S","S"];

  return (
    <div className="h-full w-full bg-mesh relative pb-6" dir={isAr ? "rtl" : "ltr"}>
      <StatusBar />
      <div className="px-5 pt-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="w-10 h-10 rounded-2xl glass flex items-center justify-center shrink-0">
              <Icon name="arrow_back" className="text-slate-700" size={20} />
            </button>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">{t("pages.revision.title")}</div>
              <h1 className="text-2xl font-bold text-slate-900 mt-0.5">{t("pages.revision.subtitle")}</h1>
            </div>
          </div>
          <button className="w-10 h-10 rounded-2xl glass flex items-center justify-center">
            <Icon name="calendar_month" className="text-slate-700" size={20} />
          </button>
        </div>
      </div>

      {/* Stats strip */}
      <div className="mx-5 mt-4 grid grid-cols-3 gap-2">
        {[
          { label: t("pages.revision.due"), v: 12, c: "from-emerald-500 to-teal-600" },
          { label: t("pages.revision.weak"), v: 4, c: "from-rose-500 to-pink-600" },
          { label: t("pages.revision.strong"), v: 48, c: "from-amber-500 to-yellow-600" },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl bg-gradient-to-br ${s.c} text-white p-3`}>
            <div className="text-2xl font-bold">{s.v}</div>
            <div className="text-[10px] uppercase tracking-widest text-white/80">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Schedule */}
      <div className="mx-5 mt-4 rounded-[24px] bg-white p-4 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-slate-900">{t("pages.revision.schedule")}</div>
          <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
            <Icon name="auto_awesome" size={12} /> {t("pages.revision.adaptive")}
          </span>
        </div>

        <div className="mt-3 flex items-end gap-1.5 h-28">
          {[40, 70, 55, 90, 60, 80, 35].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-lg bg-emerald-100 relative" style={{ height: `${h}%` }}>
                <div className="absolute bottom-0 left-0 right-0 rounded-t-lg bg-brand-gradient" style={{ height: `${h * 0.7}%` }} />
                {i === 3 && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-emerald-700 bg-white px-1.5 py-0.5 rounded-md shadow">
                    23
                  </div>
                )}
              </div>
              <span className="text-[9px] text-slate-500">{weekdays[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Flashcard */}
      <div className="mx-5 mt-4 rounded-[28px] bg-gradient-to-br from-slate-900 to-teal-900 p-5 text-white relative overflow-hidden shadow-xl">
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-emerald-500/20 blur-2xl" />
        <div className="flex items-center justify-between relative">
          <span className="text-[10px] uppercase tracking-widest text-emerald-300 font-semibold">{t("pages.revision.flashcard")} 3 / 12</span>
          <span className="text-[10px] text-white/70">{t("pages.revision.tapReveal")}</span>
        </div>
        <div className="relative mt-6 font-quran text-2xl text-right leading-loose" dir="rtl">
          فَإِنَّ مَعَ الْعُسْرِ يُسْرًا
        </div>
        <div className="relative mt-6 flex items-center justify-between">
          <button className="flex-1 h-11 rounded-2xl bg-rose-500/20 border border-rose-400/30 text-rose-200 text-xs font-semibold flex items-center justify-center gap-1">
            <Icon name="thumb_down" size={14} /> {t("pages.revision.hard")}
          </button>
          <div className="w-3" />
          <button className="flex-1 h-11 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-semibold">
            {t("pages.revision.good")}
          </button>
          <div className="w-3" />
          <button className="flex-1 h-11 rounded-2xl bg-emerald-500/30 border border-emerald-400/40 text-emerald-100 text-xs font-semibold flex items-center justify-center gap-1">
            {t("pages.revision.easy")} <Icon name="thumb_up" size={14} />
          </button>
        </div>
      </div>

      {/* Weak verses */}
      <div className="mx-5 mt-4 flex items-center justify-between">
        <div className="text-sm font-bold text-slate-900">{t("pages.revision.weakVerses")}</div>
        <button className="text-[11px] font-semibold text-emerald-700">{t("pages.revision.practiceAll")}</button>
      </div>
      <div className="mx-5 mt-2 space-y-2">
        {[
          { ref: "67:14", str: 32 },
          { ref: "36:15", str: 48 },
        ].map((w) => (
          <div key={w.ref} className="rounded-2xl bg-white p-3 border border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
              <Icon name="warning" className="text-rose-600" size={18} filled />
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-slate-900">{t("pages.revision.verse")} {w.ref}</div>
              <div className="mt-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-rose-400 to-amber-400 rounded-full" style={{ width: `${w.str}%` }} />
              </div>
            </div>
            <button className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Icon name="play_arrow" className="text-emerald-700" size={18} filled />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
