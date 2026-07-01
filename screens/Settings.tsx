import { useState } from "react";
import { Icon } from "../components/Icon";
import { StatusBar } from "../components/Phone";
import { PremiumCard } from "../components/PremiumCard";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { resetOnboarding } from "../utils/onboarding";
import { useLanguage, type Locale } from "../i18n/LanguageContext";
import { useUserProfile } from "../hooks/useUserProfile";
import { updateUserSettings, logout } from "../services/authService";

const langLabels: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
  fr: "Français",
};

type Props = {
  onBack?: () => void;
  onOpenPremium?: () => void;
};

export function SettingsScreen({ onBack, onOpenPremium }: Props) {
  const { locale, setLocale, t } = useLanguage();
  const { profile } = useUserProfile();
  const [settings, setSettings] = useState(profile.settings);
  const [signOutOpen, setSignOutOpen] = useState(false);

  const handleToggle = async (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    if (profile.uid) {
      await updateUserSettings(profile.uid, newSettings);
    }
  };

  return (
    <div className="h-full w-full bg-slate-50 relative pb-6 overflow-y-auto phone-scroll">
      <StatusBar />
      <div className="px-5 pt-10 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm cursor-pointer">
          <Icon name="arrow_back" size={20} />
        </button>
        <h1 className="text-xl font-bold text-slate-900">{t("settings.title")}</h1>
      </div>

      {/* Premium upsell — clicking navigates to Premium */}
      <div className="mx-5 mt-5 cursor-pointer" onClick={onOpenPremium}>
        <PremiumCard />
      </div>

      <Section title={t("settings.recitation")}>
        <Row icon="record_voice_over" label={t("settings.reciter")} value={settings.reciter || "Mishary Al-Afasy"} />
        <Row icon="library_music" label={t("settings.warsh_only")} toggle on={settings.warshOnly} onClick={() => handleToggle("warshOnly", !settings.warshOnly)} />
        <Row icon="speed" label={t("settings.speed")} value={`${settings.speed || "1.0"}×`} />
      </Section>

      <Section title={t("settings.ai_learning")}>
        <Row icon="psychology" label={t("settings.mistake_det")} toggle on={settings.notifications} onClick={() => handleToggle("notifications", !settings.notifications)} />
        <Row icon="auto_awesome" label={t("settings.adaptive_rev")} toggle on />
        <Row icon="hearing" label={t("settings.strictness")} value={settings.strictness || "Balanced"} />
      </Section>

      <Section title={t("settings.appearance")}>
        <Row icon="dark_mode" label={t("settings.dark_mode")} value={settings.darkMode || "System"} />
        <Row 
          icon="translate" 
          label={t("settings.language")} 
          value={langLabels[locale]} 
          onClick={() => {
            const next: Locale = locale === "ar" ? "en" : locale === "en" ? "fr" : "ar";
            setLocale(next);
          }}
        />
        <Row icon="format_size" label={t("settings.text_size")} value="Medium" />
      </Section>

      <Section title={t("settings.notifications")}>
        <Row icon="notifications" label={t("settings.daily_rem")} value="08:30" />
        <Row icon="cloud_off" label={t("settings.offline")} toggle on={settings.offlineMode} onClick={() => handleToggle("offlineMode", !settings.offlineMode)} />
        <Row icon="accessibility_new" label={t("settings.accessibility")} value="" chevron />
      </Section>

      <Section title={t("settings.app_journey")}>
        <Row
          icon="restart_alt"
          label={t("settings.reset_onb")}
          value={t("settings.reset_onb_sub")}
          onClick={() => {
            resetOnboarding();
            window.location.reload();
          }}
        />
        <Row
          icon="logout"
          label={t("dialog.signout_menu")}
          value=""
          onClick={() => setSignOutOpen(true)}
        />
      </Section>

      <ConfirmDialog
        open={signOutOpen}
        title={t("dialog.signout_title")}
        message={t("dialog.signout_message")}
        confirmLabel={t("dialog.signout_menu")}
        onCancel={() => setSignOutOpen(false)}
        onConfirm={async () => { setSignOutOpen(false); await logout(); }}
      />

      <div className="px-5 mt-6 text-center text-[10px] text-slate-400">
        {t("settings.footer")}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <div className="px-7 text-[10px] uppercase tracking-widest text-slate-500 font-semibold">{title}</div>
      <div className="mx-5 mt-1.5 rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm">
        {children}
      </div>
    </div>
  );
}

function Row({
  icon, label, value, toggle, on, chevron, onClick,
}: { icon: string; label: string; value?: string; toggle?: boolean; on?: boolean; chevron?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-3 border-b border-slate-50 last:border-b-0 text-left disabled:cursor-default"
      disabled={!onClick && !toggle}
    >
      <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
        <Icon name={icon} className="text-emerald-700" size={18} />
      </div>
      <div className="flex-1 text-sm text-slate-900">{label}</div>
      {value && <span className="text-xs text-slate-500">{value}</span>}
      {toggle && (
        <div className={`w-10 h-6 rounded-full relative ${on ? "bg-brand-gradient" : "bg-slate-200"}`} onClick={(e) => { e.stopPropagation(); onClick?.(); }}>
          <span className={`absolute top-0.5 ${on ? "right-0.5" : "left-0.5"} w-5 h-5 bg-white rounded-full shadow-sm transition`} />
        </div>
      )}
      {(chevron || (!toggle && value !== undefined && !onClick)) && (
        <Icon name="chevron_right" className="text-slate-400" size={18} />
      )}
    </button>
  );
}
