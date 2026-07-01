import { Icon } from "../../components/Icon";

export function SearchField({ placeholder }: { placeholder: string }) {
  return (
    <div className="h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center px-4 gap-2">
      <Icon name="search" className="text-slate-400" size={20} />
      <span className="text-sm text-slate-400 flex-1">{placeholder}</span>
      <Icon name="mic" className="text-emerald-700" size={20} />
    </div>
  );
}
