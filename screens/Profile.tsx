import { useState } from "react";
import { Icon } from "../components/Icon";
import { Owl } from "../components/Owl";
import { StatusBar } from "../components/Phone";
import { ProfileMenu } from "../components/ProfileMenu";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { useUserProfile } from "../hooks/useUserProfile";
import { useLanguage } from "../i18n/LanguageContext";
import { logout } from "../services/authService";

function toArabicNum(n: number | string): string {
  return n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);
}

type Props = {
  onBack?: () => void;
  onOpenSettings?: () => void;
  onOpenPremium?: () => void;
};

export function ProfileScreen({ onBack, onOpenSettings, onOpenPremium }: Props) {
  const { profile } = useUserProfile();
  const { locale, isAr, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);

  const displayName = profile.displayName || (profile.isAnonymous ? "Guest" : "User");
  const streak = profile.streak || 0;
  const totalVerses = profile.totalVersesMemorized || 1247;
  const totalSurahs = Math.floor(totalVerses / 7);
  const memProgress = profile.memorizationProgress || 78;

  const badgePosition = locale === "ar" ? "left-3" : "right-3";

  const formatNum = (n: number | string) => isAr ? toArabicNum(n) : n.toString();

  return (
    <div className="h-full w-full bg-mesh relative overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto phone-scroll pb-24">
        <StatusBar />

        {/* Top App Bar */}
        <div className="px-5 pt-10 flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-2xl glass flex items-center justify-center shrink-0">
            <Icon name="arrow_back" className="text-slate-700" size={20} />
          </button>
          <h1 className="text-xl font-bold text-slate-900">{t("dialog.profile")}</h1>
        </div>

        {/* Hero */}
      <div className="mx-5 mt-5 rounded-[28px] bg-night-gradient p-5 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className={`absolute top-3 ${badgePosition} flex gap-2`}>
          <button
            onClick={onOpenPremium}
            className="px-2 py-1 rounded-full bg-gold-gradient text-[9px] font-bold text-amber-900 flex items-center gap-1 cursor-pointer hover:scale-105 transition"
          >
            <Icon name="workspace_premium" size={12} /> Premium
          </button>
        </div>
        <div className="flex items-center gap-3 relative">
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-16 h-16 rounded-2xl bg-white p-1 cursor-pointer hover:scale-105 transition"
            >
              <div className="w-full h-full rounded-xl bg-emerald-50 flex items-center justify-center overflow-hidden">
                {profile.photoURL ? (
                  <img src={profile.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <Owl size={48} />
                )}
              </div>
            </button>
            <ProfileMenu
              open={menuOpen}
              onClose={() => setMenuOpen(false)}
              onProfile={() => { /* already on profile */ }}
              onSettings={() => onOpenSettings?.()}
              onSignOut={() => setSignOutOpen(true)}
            />
          </div>
          <div>
            <div className="text-base font-bold">{displayName}</div>
            <div className="text-[11px] text-slate-300">Level 12 · Hafidh in training</div>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 font-semibold flex items-center gap-1">
                <Icon name="local_fire_department" size={10} filled /> {formatNum(streak)} days
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-200 font-semibold flex items-center gap-1">
                <Icon name="paid" size={10} filled /> {formatNum("1,240")}
              </span>
            </div>
          </div>
        </div>
        {/* XP bar */}
        <div className="mt-4 relative">
          <div className="flex items-center justify-between text-[10px] text-slate-300">
            <span>Lv 12</span>
            <span>{formatNum("2,340")} / {formatNum("3,000")} XP</span>
            <span>Lv 13</span>
          </div>
          <div className="mt-1.5 h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gold-gradient rounded-full relative" style={{ width: `${memProgress}%` }}>
              <span className="absolute inset-0 shimmer" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="mx-5 mt-4 grid grid-cols-3 gap-2">
        {[
          { v: formatNum(totalVerses), l: "Verses", i: "menu_book" },
          { v: formatNum(totalSurahs), l: "Surahs", i: "library_books" },
          { v: "186h", l: "Time", i: "schedule" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl bg-white p-3 border border-slate-100 shadow-sm">
            <Icon name={s.i} className="text-emerald-700" size={18} />
            <div className="text-lg font-bold text-slate-900 mt-1">{s.v}</div>
            <div className="text-[10px] text-slate-500">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Calendar heatmap */}
      <div className="mx-5 mt-4 rounded-2xl bg-white p-4 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-slate-900">Activity</div>
          <span className="text-[10px] text-slate-500">last 8 weeks</span>
        </div>
        <div className="mt-3 grid grid-cols-8 gap-1.5">
          {Array.from({ length: 56 }).map((_, i) => {
            const lvl = (i * 37) % 5;
            const colors = ["bg-slate-100", "bg-emerald-100", "bg-emerald-300", "bg-emerald-500", "bg-emerald-700"];
            return <span key={i} className={`h-4 rounded-md ${colors[lvl]}`} />;
          })}
        </div>
        <div className="mt-2 flex items-center justify-end gap-1 text-[9px] text-slate-500">
          Less
          <span className="h-2 w-2 rounded bg-slate-100" />
          <span className="h-2 w-2 rounded bg-emerald-200" />
          <span className="h-2 w-2 rounded bg-emerald-400" />
          <span className="h-2 w-2 rounded bg-emerald-700" />
          More
        </div>
      </div>

      {/* Achievements row */}
      <div className="mx-5 mt-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-slate-900">Achievements</div>
          <span className="text-[10px] text-emerald-700 font-semibold">28 / 86</span>
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto phone-scroll">
          {[
            { i: "local_fire_department", c: "from-orange-400 to-rose-500", l: "Streak" },
            { i: "auto_awesome", c: "from-emerald-400 to-teal-600", l: "AI Pro" },
            { i: "diamond", c: "from-sky-400 to-blue-600", l: "Hafidh" },
            { i: "stars", c: "from-amber-400 to-yellow-600", l: "5★" },
            { i: "bolt", c: "from-violet-400 to-purple-600", l: "Fast" },
          ].map((a, i) => (
            <div key={i} className="shrink-0 w-20 text-center">
              <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${a.c} flex items-center justify-center shadow-lg`}>
                <Icon name={a.i} className="text-white" size={28} filled />
              </div>
              <div className="text-[10px] text-slate-700 mt-1 font-semibold">{a.l}</div>
            </div>
          ))}
        </div>
      </div>
      </div>

      <ConfirmDialog
        open={signOutOpen}
        title={t("dialog.signout_title")}
        message={t("dialog.signout_message")}
        confirmLabel={t("dialog.signout_menu")}
        onCancel={() => setSignOutOpen(false)}
        onConfirm={async () => { setSignOutOpen(false); await logout(); }}
      />
    </div>
  );
}
