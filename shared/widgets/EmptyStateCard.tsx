import { Owl } from "../../components/Owl";

export function EmptyStateCard({ title, message }: { title: string; message: string }) {
  return (
    <div className="rounded-[24px] bg-white p-6 border border-slate-100 shadow-sm text-center">
      <Owl size={72} mood="wise" animated={false} className="mx-auto" />
      <div className="mt-3 text-sm font-bold text-slate-900">{title}</div>
      <div className="mt-1 text-xs text-slate-500 leading-relaxed">{message}</div>
    </div>
  );
}
