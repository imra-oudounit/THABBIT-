import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  label?: string;
  caption?: string;
  dark?: boolean;
};

export function Phone({ children, label, caption, dark }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 shrink-0">
      <div className="phone-frame">
        <div
          className="phone-screen phone-scroll relative"
          style={{
            width: 340,
            height: 720,
            background: dark ? "#0f172a" : "#fafafa",
            overflowY: "auto",
          }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50" />
          {children}
        </div>
      </div>
      {label && (
        <div className="text-center">
          <div className="text-sm font-semibold text-slate-800">{label}</div>
          {caption && <div className="text-xs text-slate-500 mt-0.5">{caption}</div>}
        </div>
      )}
    </div>
  );
}

export function StatusBar({ dark = false }: { dark?: boolean }) {
  const color = dark ? "text-white" : "text-slate-900";
  return (
    <div className={`flex items-center justify-between px-7 pt-3.5 pb-1 text-[11px] font-semibold ${color}`}>
      <span>9:41</span>
      <span className="w-28" />
      <span className="flex items-center gap-1">
        <span className="msr" style={{ fontSize: 14 }}>signal_cellular_alt</span>
        <span className="msr" style={{ fontSize: 14 }}>wifi</span>
        <span className="msr" style={{ fontSize: 14 }}>battery_full</span>
      </span>
    </div>
  );
}
