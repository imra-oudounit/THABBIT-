import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "../components/Icon";
import { StatusBar } from "../components/Phone";
import type { QuranSurah } from "./Quran";

type Props = {
  surah?: QuranSurah;
  onBack?: () => void;
  isFullscreen?: boolean;
};

const sampleVerses = [
  "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ",
  "ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
  "مَـٰلِكِ يَوْمِ ٱلدِّينِ",
  "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
  "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
  "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ",
  "غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
];

const actionItems = [
  { icon: "content_copy", label: "نسخ", desc: "نسخ نص الآية" },
  { icon: "share", label: "مشاركة", desc: "مشاركة مع الآخرين" },
  { icon: "bookmark_border", label: "إشارة مرجعية", desc: "حفظ موضع القراءة" },
  { icon: "format_color_fill", label: "تمييز", desc: "تلوين الآية" },
  { icon: "note_add", label: "ملاحظة", desc: "إضافة ملاحظة تدبرية" },
  { icon: "repeat", label: "تكرار", desc: "تكرار لتسهيل الحفظ" },
  { icon: "play_arrow", label: "تلاوة", desc: "تشغيل تلاوة الآية" },
  { icon: "auto_stories", label: "تفسير", desc: "عرض تفسير الآية" },
  { icon: "translate", label: "ترجمة", desc: "عرض الترجمة" },
  { icon: "favorite_border", label: "المفضلة", desc: "إضافة إلى المفضلة" },
];

function toArabicNum(n: number | string): string {
  return n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);
}

export function ReaderScreen({ surah, onBack }: Props) {
  const active = surah || { n: 1, name: "Al-Fatihah", ar: "الفاتحة", verses: 7, type: "Meccan", pct: 100, juz: 1, hizb: 1 };
  
  // Theme & Reading State
  const [fontScale, setFontScale] = useState(() => Number(localStorage.getItem("thabbit_reader_font_scale") || 1));
  const [theme, setTheme] = useState<"mushaf" | "dark" | "simple">(() => (localStorage.getItem("thabbit_reader_theme") as any) || "mushaf");
  
  // Interaction State
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(true);
  const [isHeaderTransparent, setHeaderTransparent] = useState(true);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);
  const pressTimer = useRef<number | null>(null);

  // Load / Save scroll position & local storage values
  useEffect(() => {
    const key = `thabbit_reader_scroll_${active.n}`;
    const saved = Number(localStorage.getItem(key) || 0);
    const el = scrollRef.current;
    if (el && saved) el.scrollTop = saved;
    return () => {
      if (el) localStorage.setItem(key, String(el.scrollTop));
    };
  }, [active.n]);

  useEffect(() => { localStorage.setItem("thabbit_reader_font_scale", String(fontScale)); }, [fontScale]);
  useEffect(() => { localStorage.setItem("thabbit_reader_theme", theme); }, [theme]);

  // Floating toolbar scroll handler
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const currentTop = el.scrollTop;
    setHeaderTransparent(currentTop <= 10);
    if (currentTop > lastScrollTop.current && currentTop > 50) {
      setScrollingUp(false);
    } else {
      setScrollingUp(true);
    }
    lastScrollTop.current = currentTop;
  };

  // Verses Generator
  const verses = useMemo(() => {
    return Array.from({ length: Math.min(active.verses, 50) }).map(
      (_, index) => sampleVerses[index % sampleVerses.length] || `آية ${index + 1}`
    );
  }, [active.verses]);

  // Theme styling configurations
  const isDark = theme === "dark";
  const bgClass = theme === "mushaf" ? "bg-[#fdfbf7]" : theme === "dark" ? "bg-[#0b1329]" : "bg-white";
  const textClass = isDark ? "text-slate-100" : "text-slate-900";
  const mutedClass = isDark ? "text-slate-400" : "text-slate-500";
  const borderClass = isDark ? "border-white/10" : "border-slate-200/60";

  // Long press handler
  const handlePressStart = (index: number) => {
    pressTimer.current = window.setTimeout(() => setSelectedVerse(index), 450);
  };
  const handlePressEnd = () => {
    if (pressTimer.current) window.clearTimeout(pressTimer.current);
  };

  return (
    <div className={`h-full w-full relative overflow-hidden flex flex-col transition-colors duration-300 ${bgClass}`} dir="rtl">
      <StatusBar dark={isDark} />

      {/* Premium Transparent/Dynamic Header */}
      <div className={`px-5 pt-10 pb-3 flex items-center gap-3 border-b z-20 transition-all duration-300 ${isHeaderTransparent ? "border-transparent bg-transparent" : `${isDark ? "bg-[#0b1329]/90 border-white/10" : "bg-[#fdfbf7]/90 border-slate-200/60"} backdrop-blur-md`}`}>
        <button onClick={onBack} className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm cursor-pointer transition active:scale-95 ${isDark ? "glass-dark text-white" : "bg-white text-slate-700"}`}>
          <Icon name="arrow_back" size={20} />
        </button>
        <div className="flex-1 text-center">
          <div className={`text-[10px] uppercase tracking-wider font-semibold ${mutedClass}`}>جزء {active.juz || 1} · حزب {active.hizb || 1}</div>
          <div className="flex items-center justify-center gap-2 mt-0.5">
            <h1 className="text-lg font-bold font-arabic">{active.ar}</h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold">{active.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm cursor-pointer transition active:scale-95 ${isDark ? "glass-dark text-white" : "bg-white text-slate-700"}`}>
            <Icon name="bookmark_border" size={20} />
          </button>
          <button onClick={() => setFeaturesOpen(true)} className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm cursor-pointer transition active:scale-95 ${isDark ? "glass-dark text-white" : "bg-white text-slate-700"}`}>
            <Icon name="auto_awesome" size={20} />
          </button>
        </div>
      </div>

      {/* Mushaf Reading Area */}
      <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto phone-scroll px-4 py-4 pb-28">
        
        {/* Custom Decorative Mushaf Surah Frame (extracted to component for clarity) */}
        <SurahFrame
          surahName={active.ar}
          typeLabel={active.type === "Meccan" ? "مكية" : "مدنية"}
          verses={active.verses}
          juz={active.juz || 1}
          isDark={isDark}
        />

        {/* Bismillah */}
        {active.n !== 9 && (
          <div className="text-center mb-8">
            <div className={`font-quran text-3xl leading-loose ${textClass}`}>بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</div>
          </div>
        )}

        {/* Continuous Mushaf Text Flow */}
        <div className={`mx-2 p-4 rounded-[16px] border ${borderClass} ${isDark ? "bg-white/5" : "bg-white/60"} shadow-sm`}>
          <div 
            className={`font-quran text-right leading-[2.8] ${textClass}`} 
            dir="rtl"
            style={{ fontSize: `${24 * fontScale}px` }}
          >
            {verses.map((verse, index) => (
              <span
                key={index}
                onContextMenu={(e) => { e.preventDefault(); setSelectedVerse(index); }}
                onPointerDown={() => handlePressStart(index)}
                onPointerUp={handlePressEnd}
                onPointerLeave={handlePressEnd}
                className={`cursor-pointer rounded px-0.5 transition-colors duration-200 ${selectedVerse === index ? "bg-emerald-500/20" : "hover:bg-emerald-500/10"}`}
              >
                {verse}
                <span className="inline-flex items-center justify-center mx-1.5 align-middle text-emerald-700 font-bold text-sm select-none">
                  ۝{toArabicNum(index + 1)}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Glassmorphism Toolbar */}
      <div className={`absolute bottom-0 left-0 right-0 px-4 pb-4 pt-2 z-30 transition-all duration-300 ease-out ${scrollingUp ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"}`}>
        <div className={`rounded-[28px] ${isDark ? "glass-dark" : "glass"} shadow-xl h-16 flex items-center justify-around px-2`}>
          <button className="flex flex-col items-center gap-0.5 px-2 min-w-[44px] hover:scale-105 transition"><Icon name="skip_previous" size={22} className={isDark ? "text-slate-300" : "text-slate-600"} /></button>
          <button className="flex flex-col items-center gap-0.5 px-2 min-w-[44px] hover:scale-105 transition"><Icon name="skip_next" size={22} className={isDark ? "text-slate-300" : "text-slate-600"} /></button>
          <button className="flex flex-col items-center gap-0.5 px-2 min-w-[44px] hover:scale-105 transition"><Icon name="play_arrow" size={22} className="text-emerald-600" filled /></button>
          <button className="flex flex-col items-center gap-0.5 px-2 min-w-[44px] hover:scale-105 transition"><Icon name="pause" size={22} className={isDark ? "text-slate-300" : "text-slate-600"} /></button>
          <button onClick={() => setFontScale((v) => (v >= 1.3 ? 0.9 : v + 0.1))} className="flex flex-col items-center gap-0.5 px-2 min-w-[44px] hover:scale-105 transition"><Icon name="format_size" size={22} className={isDark ? "text-slate-300" : "text-slate-600"} /></button>
          <button onClick={() => setSettingsOpen(true)} className="flex flex-col items-center gap-0.5 px-2 min-w-[44px] hover:scale-105 transition"><Icon name="tune" size={22} className={isDark ? "text-slate-300" : "text-slate-600"} /></button>
        </div>
      </div>

      {/* Verse Actions Premium Bottom Sheet */}
      {selectedVerse !== null && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end">
          <div className={`w-full rounded-t-[32px] p-6 shadow-2xl animate-fade-up ${isDark ? "bg-[#0b1329] text-white" : "bg-white text-slate-900"}`}>
            <div className="w-12 h-1.5 rounded-full bg-slate-300/60 mx-auto mb-4" />
            <div className="flex items-center justify-between pb-3 border-b border-slate-100/10 mb-4">
              <div>
                <h3 className="text-base font-bold font-arabic">خيارات الآية {toArabicNum(selectedVerse + 1)}</h3>
                <p className={`text-[10px] ${mutedClass}`}>التحكم السريع في آيات {active.ar}</p>
              </div>
              <button onClick={() => setSelectedVerse(null)} className="w-8 h-8 rounded-xl bg-slate-100/10 flex items-center justify-center"><Icon name="close" size={18} /></button>
            </div>
            <div className="grid grid-cols-5 gap-3 max-h-[220px] overflow-y-auto phone-scroll">
              {actionItems.map((item) => (
                <button key={item.label} onClick={() => setSelectedVerse(null)} className={`flex flex-col items-center justify-center py-3 rounded-2xl gap-1.5 active:scale-95 transition ${isDark ? "hover:bg-white/10 text-slate-200" : "hover:bg-slate-50 text-slate-700 border border-slate-100"}`}>
                  <Icon name={item.icon} size={20} className="text-emerald-600" />
                  <span className="text-[10px] font-bold font-arabic">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reading Settings Premium Bottom Sheet */}
      {settingsOpen && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end">
          <div className={`w-full rounded-t-[32px] p-6 shadow-2xl ${isDark ? "bg-[#0b1329] text-white" : "bg-white text-slate-900"}`}>
            <div className="w-12 h-1.5 rounded-full bg-slate-300/60 mx-auto mb-4" />
            <h3 className="text-base font-bold font-arabic mb-4">إعدادات القراءة</h3>
            <div className="space-y-4">
              <SettingRow label="حجم الخط" value={`${Math.round(fontScale * 100)}%`}>
                <div className="flex items-center gap-1 bg-slate-100/10 rounded-xl p-0.5">
                  <button onClick={() => setFontScale((v) => Math.max(0.8, v - 0.05))} className="w-8 h-8 rounded-lg flex items-center justify-center"><Icon name="remove" size={16} /></button>
                  <button onClick={() => setFontScale((v) => Math.min(1.4, v + 0.05))} className="w-8 h-8 rounded-lg flex items-center justify-center"><Icon name="add" size={16} /></button>
                </div>
              </SettingRow>
              <SettingRow label="المظهر" value={theme === "mushaf" ? "مصحف" : theme === "dark" ? "ليلي" : "بسيط"}>
                <div className="flex items-center gap-1 bg-slate-100/10 rounded-xl p-0.5">
                  <button onClick={() => setTheme("mushaf")} className={`px-2.5 h-8 text-[11px] rounded-lg ${theme === "mushaf" ? "bg-emerald-600 text-white" : ""}`}>مصحف</button>
                  <button onClick={() => setTheme("dark")} className={`px-2.5 h-8 text-[11px] rounded-lg ${theme === "dark" ? "bg-emerald-600 text-white" : ""}`}>ليلي</button>
                  <button onClick={() => setTheme("simple")} className={`px-2.5 h-8 text-[11px] rounded-lg ${theme === "simple" ? "bg-emerald-600 text-white" : ""}`}>بسيط</button>
                </div>
              </SettingRow>
            </div>
            <button onClick={() => setSettingsOpen(false)} className="mt-6 w-full h-12 rounded-2xl bg-brand-gradient text-white text-sm font-bold">تم</button>
          </div>
        </div>
      )}

      {/* Smart Features Preview Panel */}
      {featuresOpen && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end">
          <div className={`w-full rounded-t-[32px] p-6 shadow-2xl ${isDark ? "bg-[#0b1329] text-white" : "bg-white text-slate-900"}`}>
            <div className="w-12 h-1.5 rounded-full bg-slate-300/60 mx-auto mb-4" />
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold font-arabic flex items-center gap-2"><Icon name="auto_awesome" className="text-emerald-600" /> الميزات الذكية</h3>
              <button onClick={() => setFeaturesOpen(false)} className="w-8 h-8 rounded-xl bg-slate-100/10 flex items-center justify-center"><Icon name="close" size={18} /></button>
            </div>
            <div className="space-y-3.5 max-h-[300px] overflow-y-auto phone-scroll">
              <FeatureItem icon="flag" title="الهدف اليومي للتلاوة" desc="اقرأ ٥ صفحات لإكمال هدف اليوم" value="٤٠٪ مكتمل" />
              <FeatureItem icon="trending_up" title="متابعة الختمة" desc="تقدم الختمة الحالية" value="٢٣٪" />
              <FeatureItem icon="star_border" title="الآيات المفضلة" desc="تضمين ٣ آيات مفضلة في هذه السورة" value="٣ آيات" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SurahFrame({
  surahName,
  typeLabel,
  verses,
  juz,
  isDark,
}: {
  surahName: string;
  typeLabel: string;
  verses: number;
  juz: number;
  isDark: boolean;
}) {
  const fontClass =
    surahName.length > 8 ? "text-2xl" : surahName.length > 6 ? "text-3xl" : "text-4xl";

  return (
    <div className="relative mx-1 mb-8 mt-4 flex flex-col items-center">
      <div className="w-full max-w-[360px] aspect-[7/1] relative flex items-center justify-center">
        <svg
          viewBox="0 0 700 100"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          {/* Outer ornate frame */}
          <path
            d="M55,10 H645 Q675,10 670,30 V70 Q670,90 640,90 H55 Q25,90 30,70 V30 Q25,10 55,10 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            className={isDark ? "text-slate-300 opacity-90" : "text-slate-800"}
          />
          {/* Inner parallel frame */}
          <rect
            x="65"
            y="14"
            width="570"
            height="72"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            className={isDark ? "text-slate-400 opacity-70" : "text-slate-500"}
          />
          {/* Left side decorative spiral */}
          <path
            d="M30,30 Q15,30 15,40 Q15,50 30,50 M30,50 Q15,50 15,60 Q15,70 30,70 M15,50 L8,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            className={isDark ? "text-slate-200" : "text-slate-700"}
          />
          {/* Left side interior curls */}
          <path
            d="M30,40 Q25,42 28,45 M30,60 Q25,58 28,55"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className={isDark ? "text-slate-300" : "text-slate-700"}
          />
          {/* Right side decorative spiral */}
          <path
            d="M670,30 Q685,30 685,40 Q685,50 670,50 M670,50 Q685,50 685,60 Q685,70 670,70 M685,50 L692,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            className={isDark ? "text-slate-200" : "text-slate-700"}
          />
          {/* Right side interior curls */}
          <path
            d="M670,40 Q675,42 672,45 M670,60 Q675,58 672,55"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className={isDark ? "text-slate-300" : "text-slate-700"}
          />
          {/* Tiny corner dots */}
          <circle cx="65" cy="20" r="0.8" fill="currentColor" className={isDark ? "text-slate-300" : "text-slate-700"} />
          <circle cx="635" cy="20" r="0.8" fill="currentColor" className={isDark ? "text-slate-300" : "text-slate-700"} />
          <circle cx="65" cy="80" r="0.8" fill="currentColor" className={isDark ? "text-slate-300" : "text-slate-700"} />
          <circle cx="635" cy="80" r="0.8" fill="currentColor" className={isDark ? "text-slate-300" : "text-slate-700"} />
        </svg>

        {/* Surah Name + Meta Info */}
        <div className="relative z-10 flex flex-col items-center justify-center px-12">
          <div
            className={`font-arabic font-bold tracking-wide leading-tight ${
              isDark ? "text-emerald-300" : "text-emerald-800"
            } ${fontClass}`}
            style={{
              textShadow: isDark
                ? "0 0 8px rgba(110, 231, 183, 0.25)"
                : "0 1px 0 rgba(255, 255, 255, 0.85), 0 0.5px 0.5px rgba(0, 0, 0, 0.06)",
            }}
          >
            {surahName}
          </div>
          <div
            className={`text-[10px] font-semibold tracking-widest mt-1 ${
              isDark ? "text-emerald-400/80" : "text-emerald-700/80"
            }`}
          >
            {typeLabel} · {verses} آية · جزء {juz}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingRow({ label, value, children }: { label: string; value: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <div>
        <div className="text-sm font-bold font-arabic">{label}</div>
        <div className="text-[10px] text-slate-500 mt-0.5">{value}</div>
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

function FeatureItem({ icon, title, desc, value }: { icon: string; title: string; desc: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-slate-100/5 border border-slate-100/10">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center"><Icon name={icon} className="text-emerald-600" size={18} /></div>
        <div>
          <div className="text-xs font-bold font-arabic">{title}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">{desc}</div>
        </div>
      </div>
      <div className="text-xs font-semibold text-emerald-700 font-arabic">{value}</div>
    </div>
  );
}
