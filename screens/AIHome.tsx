import { useState } from "react";
import { Icon } from "../components/Icon";
import { StatusBar } from "../components/Phone";
import { useLanguage } from "../i18n/LanguageContext";

type QuickAction = {
  icon: string;
  title: string;
  gradient: string;
};

export function AIHomeScreen({ onOpenChat, onBack }: { onOpenChat?: () => void; onBack?: () => void } = {}) {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const quickActions: QuickAction[] = [
    { icon: "auto_stories", title: isAr ? "تفسير آية" : "Verse Tafsir", gradient: "from-emerald-600 to-teal-700" },
    { icon: "help_outline", title: isAr ? "أسئلة قرآنية" : "Quran Questions", gradient: "from-amber-500 to-yellow-600" },
    { icon: "translate", title: isAr ? "معاني الكلمات" : "Word Meanings", gradient: "from-teal-600 to-emerald-700" },
    { icon: "menu_book", title: isAr ? "قصص القرآن" : "Quran Stories", gradient: "from-emerald-700 to-emerald-900" },
  ];

  const handleSearchSubmit = () => {
    if (searchValue.trim() || onOpenChat) {
      onOpenChat?.();
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white relative overflow-hidden flex flex-col" dir={isAr ? "rtl" : "ltr"}>
      <StatusBar dark />

      {/* Subtle Islamic geometric pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
        </svg>
      </div>

      {/* Main Header */}
      <div className="relative px-5 pt-12 pb-4 flex items-center justify-center z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full" />
        
        <div className="relative flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <span className="text-2xl font-bold font-arabic text-white">ث</span>
          </div>
          <div className="mt-2 text-sm font-bold text-white/90 tracking-wide">THABBIT</div>
        </div>

        <button onClick={onBack} className="absolute right-5 top-12 w-10 h-10 rounded-2xl glass-dark flex items-center justify-center z-20">
          <Icon name="notifications_none" className="text-white/80" size={20} />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto phone-scroll px-5 py-4 pb-8 z-10">
        
        {/* Animated Mascot */}
        <div className="flex justify-center mb-4">
          <button 
            onClick={onOpenChat}
            className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-xl shadow-emerald-500/20 floaty cursor-pointer active:scale-95 transition"
          >
            <div className="absolute inset-0 rounded-full bg-emerald-400/30 blur-xl animate-pulse" />
            <div className="relative w-16 h-16 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
              <Icon name="auto_awesome" className="text-white" size={28} filled />
            </div>
          </button>
        </div>

        {/* Premium Search Bar with Integrated Button */}
        <div className="mb-6">
          <div className={`relative rounded-[28px] bg-white/10 backdrop-blur-md border transition-all duration-300 ${searchFocused ? "border-emerald-400/60 shadow-lg shadow-emerald-500/20" : "border-white/10"}`}>
            <div className="flex items-center px-4 py-3">
              {/* Search Input */}
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder={isAr ? "ابحث عن تفسير آية أو سؤال عن القرآن..." : "Search for verse tafsir or ask about the Quran..."}
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/40 font-arabic"
                dir="rtl"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchSubmit();
                }}
              />
              
              {/* Integrated Action Button (inside search bar) */}
              <button
                onClick={handleSearchSubmit}
                className="mr-3 w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-500/30 active:scale-95 transition cursor-pointer"
              >
                <Icon name="arrow_forward" className="text-white" size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={onOpenChat}
              className={`relative overflow-hidden rounded-[24px] bg-gradient-to-br ${action.gradient} p-4 text-right shadow-lg active:scale-[0.98] transition-all duration-300 cursor-pointer`}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 blur-2xl rounded-full" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-2">
                  <Icon name={action.icon} className="text-white" size={20} />
                </div>
                <div className="text-xs font-bold text-white font-arabic leading-snug">{action.title}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Recent Searches / Suggestions */}
        <div className="mb-4">
          <div className="text-[10px] uppercase tracking-widest text-white/50 font-semibold mb-3 font-arabic">
            {isAr ? "المقترحات" : "Suggestions"}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              isAr ? "فضل سورة الملك" : "Virtue of Surah Al-Mulk",
              isAr ? "تفسير آية الكرسي" : "Tafsir of Ayat Al-Kursi",
              isAr ? "قصص الأنبياء" : "Stories of Prophets",
              isAr ? "أحكام التجويد" : "Tajweed Rules",
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={onOpenChat}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/80 hover:bg-white/10 transition cursor-pointer font-arabic"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-900/30 to-transparent pointer-events-none" />
    </div>
  );
}
