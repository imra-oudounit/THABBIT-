import { Icon } from "./Icon";

type Props = {
  locale?: "en" | "ar";
  variant?: "dark" | "light" | "color";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function DownloadButtons({ locale = "en", variant = "dark", size = "md", className = "", compact = false }: Props & { compact?: boolean }) {
  const ar = locale === "ar";
  const h = size === "sm" ? "h-10 sm:h-11" : size === "lg" ? "h-12 sm:h-14" : "h-11 sm:h-12";
  const px = size === "sm" ? "px-2.5 sm:px-3" : "px-3 sm:px-4";
  const minW = compact ? "min-w-0 flex-1 sm:flex-none sm:min-w-[140px]" : "min-w-[140px] sm:min-w-[148px]";

  const base =
    variant === "dark"
      ? "bg-slate-900 text-white hover:bg-slate-800"
      : variant === "light"
      ? "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50"
      : "bg-brand-gradient text-white shadow-lg shadow-emerald-600/25";

  const stores = ar ? [
    { key: "ios", name: "آب ستور", sub: "حمّل من", icon: "apple", href: "#ios" },
    { key: "android", name: "جوجل بلاي", sub: "متوفر على", icon: "android", href: "#android" },
    { key: "huawei", name: "AppGallery", sub: "اكتشف في", icon: "storefront", href: "#huawei" },
    { key: "web", name: "تطبيق ويب", sub: "جرّب الآن", icon: "language", href: "#web" },
  ] : [
    { key: "ios", name: "App Store", sub: "Download on the", icon: "apple", href: "#ios" },
    { key: "android", name: "Google Play", sub: "GET IT ON", icon: "android", href: "#android" },
    { key: "mac", name: "Mac App Store", sub: "Download on", icon: "desktop_mac", href: "#mac" },
    { key: "web", name: "Web App", sub: "Try on", icon: "language", href: "#web" },
  ];

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {stores.map(s => (
        <a
          key={s.key}
          href={s.href}
          className={`${h} ${px} rounded-xl sm:rounded-2xl ${base} flex items-center gap-2 sm:gap-3 transition ${minW} justify-center sm:justify-start`}
        >
          <Icon name={s.icon} size={size === "lg" ? 22 : 18} className="shrink-0" />
          <span className="text-left leading-tight">
            <span className="block text-[8px] sm:text-[9px] uppercase tracking-wider opacity-80">{s.sub}</span>
            <span className="block text-[11px] sm:text-[13px] font-bold -mt-0.5 truncate">{s.name}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

export function StoreBadgesRow({ locale = "en" }: { locale?: "en" | "ar" }) {
  const ar = locale === "ar";
  return (
    <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 font-arabic">
      <span className="flex items-center gap-1"><Icon name="verified" size={14} className="text-emerald-600" filled /> {ar ? "٤٫٩ ★ · ١٢ ألف تقييم" : "4.9 ★ · 12k ratings"}</span>
      <span>·</span>
      <span>{ar ? "١٠ ملايين+ تنزيل" : "10M+ downloads"}</span>
      <span>·</span>
      <span>{ar ? "اختيار المحرر" : "Editors' Choice"}</span>
    </div>
  );
}
