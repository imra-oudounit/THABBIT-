import { Icon } from "../components/Icon";
import { StatusBar } from "../components/Phone";
import { useLanguage } from "../i18n/LanguageContext";

export function StatsScreen({ onBack }: { onBack?: () => void } = {}) {
  const { t, locale } = useLanguage();
  const isAr = locale === "ar";
  const daysLabel = locale === "ar" ? "يوم" : locale === "fr" ? "jours" : "days";
  const journeyDetail = locale === "ar"
    ? "١٬٢٤٧ آية · ١٤ سورة · المستوى ١٢"
    : locale === "fr"
    ? "1 247 versets · 14 sourates · Niveau 12"
    : "1,247 verses · 14 Surahs · Level 12";

  return (
    <div className="h-full w-full bg-mesh relative overflow-hidden flex flex-col" dir={isAr ? "rtl" : "ltr"}>
      <div className="flex-1 overflow-y-auto phone-scroll pb-24">
        <StatusBar />
        <div className="px-5 pt-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="w-10 h-10 rounded-2xl glass flex items-center justify-center shrink-0">
              <Icon name="arrow_back" className="text-slate-700" size={20} />
            </button>
            <h1 className="text-2xl font-bold text-slate-900">{t("pages.stats.title")}</h1>
          </div>
          <button className="w-10 h-10 rounded-2xl glass flex items-center justify-center">
            <Icon name="share" className="text-slate-700" size={20} />
          </button>
        </div>

        {/* Overall stats */}
        <div className="mx-5 mt-5 rounded-[28px] bg-night-gradient p-5 text-white relative overflow-hidden shadow-xl">
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-3xl bg-white/15 backdrop-blur flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">42</span>
              <span className="text-[9px] uppercase tracking-widest">{daysLabel}</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold">{t("pages.stats.journey")}</div>
              <div className="text-[11px] text-white/80 mt-1">{journeyDetail}</div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="mx-5 mt-4 grid grid-cols-2 gap-3">
          <ChartCard title={t("pages.stats.weekly")} value="86%" icon="trending_up" gradient="from-emerald-500 to-teal-600" />
          <ChartCard title={t("pages.stats.monthly")} value="64%" icon="bar_chart" gradient="from-amber-500 to-yellow-600" />
        </div>

        {/* Breakdown */}
        <div className="mx-5 mt-4 rounded-2xl bg-white p-4 border border-slate-100 shadow-sm">
          <div className="text-sm font-bold text-slate-900 mb-3">{t("pages.stats.breakdown")}</div>
          <div className="space-y-2.5">
            {[
              { l: t("pages.stats.meccan"), v: 67, c: "bg-emerald-600" },
              { l: t("pages.stats.medinan"), v: 33, c: "bg-teal-600" },
            ].map((b) => (
              <div key={b.l}>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-700">{b.l}</span>
                  <span className="font-bold text-slate-900">{b.v}%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className={`h-full ${b.c} rounded-full`} style={{ width: `${b.v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mx-5 mt-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold text-slate-900">{t("pages.stats.badges")}</div>
            <button className="text-[11px] font-semibold text-emerald-700">{t("pages.stats.viewAll")}</button>
          </div>
          <div className="mt-2 flex gap-2 overflow-x-auto phone-scroll pb-1">
            {[
              { i: "emoji_events", c: "from-orange-400 to-rose-500", l: t("pages.stats.streak"), v: "7d" },
              { i: "auto_awesome", c: "from-emerald-400 to-teal-600", l: "AI", v: "5★" },
              { i: "diamond", c: "from-sky-400 to-blue-600", l: "Hafidh", v: "✓" },
            ].map((b, i) => (
              <div key={i} className="shrink-0 w-20 text-center">
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${b.c} flex items-center justify-center shadow-lg`}>
                  <Icon name={b.i} className="text-white" size={26} filled />
                </div>
                <div className="text-[10px] font-semibold text-slate-700 mt-1.5">{b.l}</div>
                <div className="text-[9px] text-slate-500">{b.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, value, icon, gradient }: { title: string; value: string; icon: string; gradient: string }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${gradient} p-4 text-white shadow-md`}>
      <Icon name={icon} className="text-white/80" size={18} />
      <div className="text-2xl font-bold mt-2">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-white/80">{title}</div>
    </div>
  );
}
