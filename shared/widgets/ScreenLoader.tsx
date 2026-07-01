import { Owl } from "../../components/Owl";

export function ScreenLoader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="h-full w-full flex items-center justify-center bg-[#fafafa]">
      <div className="text-center">
        <Owl size={80} mood="thinking" />
        <div className="mt-4 text-xs text-slate-500 font-arabic">{label}</div>
      </div>
    </div>
  );
}
