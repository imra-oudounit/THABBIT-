import { Icon } from "./Icon";

type Props = {
  title?: string;
  subtitle?: string;
  cta?: string;
  icon?: string;
};

export function PremiumCard({
  title = "Unlock unlimited AI",
  subtitle = "Warsh-accurate recitation, offline mode, and advanced Tafsir.",
  cta = "Go Premium",
  icon = "workspace_premium",
}: Props) {
  return (
    <div className="rounded-[28px] bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 p-5 text-white relative overflow-hidden shadow-lg shadow-amber-500/30">
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/20 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-emerald-400/30 blur-xl" />
      <div className="relative flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-white/25 backdrop-blur flex items-center justify-center">
          <Icon name={icon} className="text-white" size={24} filled />
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold">{title}</div>
          <div className="text-[11px] text-white/90 mt-0.5 leading-snug">{subtitle}</div>
        </div>
        <button className="px-3 h-8 rounded-full bg-white text-amber-900 text-[11px] font-bold shadow-md">
          {cta}
        </button>
      </div>
    </div>
  );
}
