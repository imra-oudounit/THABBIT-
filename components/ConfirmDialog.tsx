import { Icon } from "./Icon";
import { useLanguage } from "../i18n/LanguageContext";

type Props = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  icon?: string;
  iconColor?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmDialog({
  open, title, message, confirmLabel, cancelLabel,
  icon = "warning", iconColor = "text-amber-600",
  onCancel, onConfirm,
}: Props) {
  const { t } = useLanguage();
  if (!open) return null;

  return (
    <div data-nav-lock="true" className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-5">
      <div className="bg-white rounded-[28px] p-6 max-w-sm w-full shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-50 flex items-center justify-center">
            <Icon name={icon} className={iconColor} size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
          <p className="text-sm text-slate-600">{message}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 h-12 rounded-2xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition"
          >
            {cancelLabel || t("dialog.cancel")}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-12 rounded-2xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            {confirmLabel || t("dialog.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}
