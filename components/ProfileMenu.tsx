import { useEffect, useRef } from "react";
import { Icon } from "./Icon";
import { useLanguage } from "../i18n/LanguageContext";

type Props = {
  open: boolean;
  onClose: () => void;
  onProfile: () => void;
  onSettings: () => void;
  onSignOut: () => void;
};

export function ProfileMenu({ open, onClose, onProfile, onSettings, onSignOut }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { t, isAr } = useLanguage();

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      data-nav-lock="true"
      className={`absolute top-12 ${isAr ? "left-0" : "right-0"} z-50 w-44 rounded-2xl bg-white shadow-xl shadow-slate-900/15 border border-slate-100 overflow-hidden`}
    >
      <button
        onClick={() => { onProfile(); onClose(); }}
        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition text-start"
      >
        <Icon name="person" size={18} className="text-emerald-700" />
        {t("dialog.profile")}
      </button>
      <button
        onClick={() => { onSettings(); onClose(); }}
        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition text-start border-t border-slate-100"
      >
        <Icon name="settings" size={18} className="text-slate-600" />
        {t("dialog.settings_menu")}
      </button>
      <button
        onClick={() => { onSignOut(); onClose(); }}
        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition text-start border-t border-slate-100"
      >
        <Icon name="logout" size={18} />
        {t("dialog.signout_menu")}
      </button>
    </div>
  );
}
