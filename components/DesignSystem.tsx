import { Icon } from "./Icon";
import { Owl } from "./Owl";

export function DesignSystemPanel({ locale = "en" }: { locale?: "en" | "ar" }) {
  const ar = locale === "ar";
  return (
    <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-900/5 border border-slate-100" dir={ar ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-emerald-700 font-semibold">
            {ar ? "نظام التصميم" : "Design System"}
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mt-1 font-display">
            {ar ? "الأسس والمكوّنات" : "Foundations & Components"}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Owl size={56} />
          <div className={ar ? "text-right" : ""}>
            <div className="text-xs font-bold text-slate-900 font-arabic">هدهد</div>
            <div className="text-[10px] text-slate-500">{ar ? "تميمة ثبّت" : "Thabbit mascot"}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Colors */}
        <section>
          <SectionHeader title="Color palette" icon="palette" />
          <div className="grid grid-cols-4 gap-2">
            {[
              { c: "#16A34A", n: "Emerald" },
              { c: "#0F766E", n: "Teal" },
              { c: "#D4AF37", n: "Gold" },
              { c: "#0F172A", n: "Night" },
              { c: "#22C55E", n: "Success" },
              { c: "#F59E0B", n: "Warning" },
              { c: "#EF4444", n: "Error" },
              { c: "#FAFAFA", n: "Surface" },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <div
                  className="aspect-square rounded-2xl shadow-sm border border-slate-100"
                  style={{ background: s.c }}
                />
                <div className="text-[10px] mt-1.5 font-semibold text-slate-700">{s.n}</div>
                <div className="text-[9px] text-slate-400">{s.c}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <SectionHeader title="Typography" icon="text_fields" />
          <div className="space-y-2">
            <div>
              <div className="text-3xl font-bold text-slate-900">Display 32</div>
              <div className="text-[10px] text-slate-400">Inter Bold</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-slate-900">Headline 18</div>
              <div className="text-[10px] text-slate-400">Inter Semibold</div>
            </div>
            <div>
              <div className="text-sm text-slate-700">Body 14 — calm and readable.</div>
              <div className="text-[10px] text-slate-400">Inter Regular</div>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <div className="font-arabic text-2xl text-right text-slate-900" dir="rtl">ثبت في قلبك</div>
              <div className="text-[10px] text-slate-400">IBM Plex Sans Arabic</div>
            </div>
            <div>
              <div className="font-quran text-xl text-right text-emerald-800" dir="rtl">بِسْمِ اللَّهِ</div>
              <div className="text-[10px] text-slate-400">Amiri Quran</div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <SectionHeader title="Buttons" icon="smart_button" />
          <div className="space-y-2">
            <button className="w-full h-11 rounded-2xl bg-brand-gradient text-white font-semibold text-sm shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2">
              <Icon name="play_arrow" size={18} filled /> Primary
            </button>
            <button className="w-full h-11 rounded-2xl bg-white border border-slate-200 text-slate-800 font-semibold text-sm">
              Secondary
            </button>
            <button className="w-full h-11 rounded-2xl neu text-slate-800 font-semibold text-sm">
              Neumorphic
            </button>
            <div className="flex gap-2">
              <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">Chip</span>
              <span className="px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold">+50 XP</span>
              <span className="px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold">Hard</span>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section>
          <SectionHeader title="Cards" icon="dashboard_customize" />
          <div className="rounded-2xl bg-brand-gradient text-white p-4 shadow-md shadow-emerald-600/30">
            <div className="text-[10px] uppercase tracking-widest text-white/80">Quran card</div>
            <div className="font-quran text-xl text-right mt-2" dir="rtl">إِنَّ مَعَ الْعُسْرِ يُسْرًا</div>
          </div>
          <div className="rounded-2xl bg-white p-3 mt-2 border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold-gradient flex items-center justify-center">
              <Icon name="emoji_events" className="text-white" size={18} filled />
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold">Achievement unlocked</div>
              <div className="text-[10px] text-slate-500">Surah Mulk memorized</div>
            </div>
          </div>
        </section>

        {/* Inputs */}
        <section>
          <SectionHeader title="Inputs & Toggles" icon="edit" />
          <div className="space-y-2">
            <div className="h-11 rounded-2xl bg-white border border-emerald-200 ring-2 ring-emerald-100 flex items-center px-3 gap-2">
              <Icon name="search" className="text-slate-400" size={18} />
              <span className="text-xs text-slate-600">Search verse…</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
              <span className="text-xs font-semibold text-slate-800">Dark mode</span>
              <div className="w-10 h-6 rounded-full bg-brand-gradient relative">
                <span className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow" />
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50">
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                <span>Strictness</span><span>Balanced</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-200 relative">
                <div className="h-full w-2/3 rounded-full bg-brand-gradient" />
                <span className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-emerald-600 shadow" style={{ left: "calc(66% - 8px)" }} />
              </div>
            </div>
          </div>
        </section>

        {/* Icons + spacing */}
        <section>
          <SectionHeader title="Icons & Spacing" icon="grid_view" />
          <div className="grid grid-cols-6 gap-2">
            {["menu_book","auto_awesome","mic","replay","emoji_events","local_fire_department","bookmark","headphones","quiz","translate","dark_mode","notifications"].map((i) => (
              <div key={i} className="aspect-square rounded-xl bg-emerald-50 flex items-center justify-center">
                <Icon name={i} className="text-emerald-700" size={18} />
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-end gap-1.5">
            {[4,8,12,16,24,32].map(s => (
              <div key={s} className="flex flex-col items-center gap-1">
                <div className="bg-brand-gradient rounded" style={{ width: s, height: s }} />
                <span className="text-[9px] text-slate-500">{s}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function SectionHeader({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
        <Icon name={icon} className="text-emerald-700" size={16} />
      </div>
      <h3 className="text-sm font-bold text-slate-900">{title}</h3>
    </div>
  );
}
