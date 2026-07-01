import { Owl } from "../components/Owl";
import { useLanguage, type Locale } from "../i18n/LanguageContext";

export function LanguageSelectionScreen({ onSelect }: { onSelect: () => void }) {
  const { setLocale, t } = useLanguage();

  const handleSelect = (loc: Locale) => {
    setLocale(loc);
    onSelect();
  };

  return (
    <div className="h-full w-full bg-mesh relative flex flex-col justify-between overflow-hidden pt-12 pb-8 px-6">
      <div className="text-center flex flex-col items-center mt-6">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-400/20 blur-3xl rounded-full" />
          <Owl size={140} className="relative floaty" mood="happy" />
        </div>
        <h1 className="mt-8 text-2xl font-bold text-slate-900 font-display">
          {t("lang.select")}
        </h1>
        <p className="mt-2 text-sm text-slate-500 max-w-[240px]">
          Please select your preferred language to continue.
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => handleSelect("ar")}
          className="w-full h-14 rounded-2xl bg-white border border-slate-100 text-slate-900 font-bold text-lg font-arabic shadow-sm active:scale-[0.98] transition flex items-center justify-between px-6"
        >
          <span>العربية</span>
          <span className="text-xs text-slate-400 font-display font-normal">Arabic</span>
        </button>

        <button
          onClick={() => handleSelect("en")}
          className="w-full h-14 rounded-2xl bg-white border border-slate-100 text-slate-900 font-bold text-lg font-display shadow-sm active:scale-[0.98] transition flex items-center justify-between px-6"
        >
          <span>English</span>
        </button>

        <button
          onClick={() => handleSelect("fr")}
          className="w-full h-14 rounded-2xl bg-white border border-slate-100 text-slate-900 font-bold text-lg font-display shadow-sm active:scale-[0.98] transition flex items-center justify-between px-6"
        >
          <span>Français</span>
          <span className="text-xs text-slate-400 font-display font-normal">French</span>
        </button>
      </div>
      
      <div className="text-center text-[10px] text-slate-400 font-display">
        You can change this later in Settings
      </div>
    </div>
  );
}
