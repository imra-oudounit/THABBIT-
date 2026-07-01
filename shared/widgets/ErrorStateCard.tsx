import { Icon } from "../../components/Icon";

export function ErrorStateCard({ title, message, onRetry }: { title: string; message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-[24px] bg-white p-6 border border-rose-100 shadow-sm text-center">
      <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center mx-auto">
        <Icon name="error" className="text-rose-600" size={26} />
      </div>
      <div className="mt-3 text-sm font-bold text-slate-900">{title}</div>
      <div className="mt-1 text-xs text-slate-500 leading-relaxed">{message}</div>
      {onRetry && (
        <button onClick={onRetry} className="mt-4 h-10 px-4 rounded-2xl bg-slate-900 text-white text-xs font-semibold">
          Retry
        </button>
      )}
    </div>
  );
}
