import { Owl } from "./Owl";

export function LogoShowcase({ locale = "en" }: { locale?: "en" | "ar" }) {
  const ar = locale === "ar";
  return (
    <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-900/5 border border-slate-100" dir={ar ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-emerald-700 font-semibold">
            {ar ? "الهوية البصرية" : "Brand Identity"}
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            {ar ? "نظام شعار ثبّت" : "Thabbit Logo System"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {ar ? "بساطة إسلامية · علامة الهدهد الحكيم · عربي أولاً" : "Islamic minimalism · Hudhud wisdom mark · Arabic-first"}
          </p>
        </div>
        <div className="text-[11px] text-slate-500">ثبت · THABBIT</div>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {/* Primary Mark */}
        <div className="rounded-[24px] bg-mesh border border-slate-100 p-6 flex flex-col items-center justify-center min-h-[210px]">
          <div className="w-20 h-20 rounded-[22px] bg-brand-gradient flex items-center justify-center shadow-lg shadow-emerald-600/30 relative">
            <Owl size={56} mood="wise" animated={false} />
          </div>
          <div className="mt-4 text-center">
            <div className="font-arabic text-2xl font-bold text-slate-900">ثبت</div>
            <div className="text-sm font-bold tracking-widest text-slate-700">THABBIT</div>
            <div className="text-[10px] text-slate-500 mt-1">Primary mark</div>
          </div>
        </div>

        {/* Wordmark Horizontal */}
        <div className="rounded-[24px] bg-slate-900 p-6 flex flex-col justify-center min-h-[210px]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Owl size={40} mood="happy" animated={false} />
            </div>
            <div>
              <div className="text-white text-xl font-bold tracking-tight">THABBIT</div>
              <div className="font-arabic text-emerald-300 text-lg -mt-0.5">ثبت</div>
            </div>
          </div>
          <div className="mt-4 text-[10px] text-slate-400">Horizontal · Dark</div>
        </div>

        {/* Arabic calligraphy mark */}
        <div className="rounded-[24px] bg-gold-gradient p-6 flex flex-col justify-center items-center min-h-[210px] text-amber-950">
          <div className="font-arabic text-5xl font-black">ثبت</div>
          <div className="text-[11px] font-bold tracking-widest mt-2 opacity-80">THABBIT</div>
          <div className="text-[10px] opacity-70 mt-1">Arabic master</div>
        </div>

        {/* App icon grid */}
        <div className="rounded-[24px] bg-white border border-slate-100 p-5">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-3">App Icons</div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { bg: "bg-brand-gradient", mood: "happy" as const },
              { bg: "bg-night-gradient", mood: "wise" as const },
              { bg: "bg-gold-gradient", mood: "celebrate" as const },
              { bg: "bg-white border border-slate-200", mood: "happy" as const, darkOwl: true },
              { bg: "bg-emerald-50", mood: "correct" as const, darkOwl: true },
              { bg: "bg-slate-900", mood: "listen" as const },
            ].map((ic, i) => (
              <div key={i} className={`aspect-square rounded-[18px] ${ic.bg} flex items-center justify-center shadow-sm`}>
                <Owl size={36} mood={ic.mood} animated={false} />
              </div>
            ))}
          </div>
        </div>

        {/* Monogram */}
        <div className="rounded-[24px] bg-emerald-50 border border-emerald-100 p-5 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center text-white font-bold text-2xl shadow-md relative">
            ث
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gold-gradient border-2 border-emerald-50" />
          </div>
          <div className="mt-3 text-xs font-bold text-slate-800">Monogram · ث</div>
          <div className="text-[10px] text-slate-500">Favicons · badges</div>
        </div>

        {/* Lockup stacked */}
        <div className="rounded-[24px] bg-slate-50 border border-slate-200 p-5 flex flex-col items-center justify-center text-center">
          <Owl size={54} mood="wise" />
          <div className="mt-2 font-arabic text-2xl font-bold text-slate-900">ثبت</div>
          <div className="text-[11px] tracking-[0.18em] font-bold text-emerald-700">THABBIT</div>
          <div className="text-[9px] text-slate-500 mt-1 uppercase tracking-widest">Quran Companion</div>
        </div>
      </div>

      {/* Color & type lockups */}
      <div className="mt-6 grid md:grid-cols-3 gap-4 text-[11px]">
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="font-semibold text-slate-800 mb-1">Logo clearspace</div>
          <div className="text-slate-500">2× owl height all sides · minimum 28px</div>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="font-semibold text-slate-800 mb-1">Typography pair</div>
          <div className="text-slate-500">Inter / SF Pro + IBM Plex Sans Arabic</div>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="font-semibold text-slate-800 mb-1">Mark meaning</div>
          <div className="text-slate-500">Hudhud owl · wisdom · Hifdh · gentle AI</div>
        </div>
      </div>
    </div>
  );
}
