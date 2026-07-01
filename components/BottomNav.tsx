import { Icon } from "./Icon";
import { useLanguage } from "../i18n/LanguageContext";

type Props = { 
  active?: "home" | "quran" | "ai" | "missions" | "wordbyword" | "revision" | "stats" | "profile" | "settings"; 
  dark?: boolean;
  visible?: boolean;
  onNavigate?: (tab: string) => void;
};

type NavItem = { key: string; icon: string; labelKey: string; center?: boolean };
const items: NavItem[] = [
  { key: "home", icon: "home", labelKey: "nav.home" },
  { key: "quran", icon: "menu_book", labelKey: "nav.quran" },
  { key: "ai", icon: "auto_awesome", labelKey: "nav.ai" },
  { key: "wordbyword", icon: "translate", labelKey: "nav.wordbyword" },
  { key: "revision", icon: "psychology", labelKey: "nav.revision" },
  { key: "missions", icon: "flag", labelKey: "nav.missions" },
  { key: "stats", icon: "bar_chart", labelKey: "nav.stats" },
];

export function BottomNav({ active = "home", dark = false, visible = true, onNavigate }: Props) {
  const { t } = useLanguage();
  return (
    <div className={`absolute bottom-0 left-0 right-0 px-4 pb-3 pt-2 z-50 transition-all duration-250 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"}`}>
      <div className={`relative h-16 rounded-[28px] ${dark ? "glass-dark" : "glass"} shadow-xl shadow-slate-900/10 flex items-center justify-around px-3 pointer-events-auto`}>
        {items.map((item) => {
          const isActive = item.key === active;
          if (item.center) {
            return (
              <button
                key={item.key}
                className="relative -mt-7 p-2 -m-2"
                onClick={() => onNavigate?.(item.key)}
                aria-label={t(item.labelKey)}
              >
                <span className="absolute inset-2 rounded-full pulse-ring" />
                <span className="relative w-14 h-14 rounded-full bg-brand-gradient flex items-center justify-center shadow-lg shadow-emerald-600/40 border-4 border-white">
                  <Icon name={item.icon} className="text-white" size={22} filled />
                </span>
              </button>
            );
          }
          return (
            <button
              key={item.key}
              className="flex flex-col items-center gap-0.5 px-3 py-2 -my-2 min-w-[44px] min-h-[44px]"
              onClick={() => onNavigate?.(item.key)}
              aria-label={t(item.labelKey)}
            >
              <Icon
                name={item.icon}
                className={isActive ? "text-emerald-700" : dark ? "text-slate-400" : "text-slate-400"}
                filled={isActive}
                size={22}
              />
              <span className={`text-[9px] font-semibold ${isActive ? "text-emerald-700" : dark ? "text-slate-400" : "text-slate-500"}`}>
                {t(item.labelKey)}
              </span>
              {isActive && <span className="w-1 h-1 rounded-full bg-emerald-600 mt-0.5" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
