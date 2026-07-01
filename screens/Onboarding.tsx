import { Owl } from "../components/Owl";
import { Icon } from "../components/Icon";
import { StatusBar } from "../components/Phone";

export function OnboardingScreen() {
  return (
    <div className="h-full w-full bg-mesh relative">
      <StatusBar />
      <div className="px-6 pt-10 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500">2 / 4</span>
        <button className="text-xs font-semibold text-slate-500">Skip</button>
      </div>

      {/* Hero illustration */}
      <div className="mx-6 mt-6 h-72 rounded-[28px] bg-brand-soft relative overflow-hidden flex items-center justify-center">
        <div className="absolute top-6 left-6 w-10 h-10 rounded-2xl bg-white/70 backdrop-blur flex items-center justify-center shadow-sm">
          <Icon name="auto_awesome" className="text-emerald-700" size={20} />
        </div>
        <div className="absolute top-10 right-8 w-8 h-8 rounded-xl bg-gold-gradient floaty" />
        <div className="absolute bottom-6 right-6 w-12 h-12 rounded-2xl glass flex items-center justify-center floaty">
          <Icon name="graphic_eq" className="text-teal-700" size={22} />
        </div>
        <div className="absolute bottom-10 left-10 w-9 h-9 rounded-full bg-white/70 flex items-center justify-center shadow-sm">
          <Icon name="mic" className="text-emerald-700" size={18} />
        </div>
        <Owl size={180} className="floaty" />
        <svg className="absolute -bottom-12 left-0 right-0" viewBox="0 0 400 80">
          <path d="M0 40 Q100 0 200 40 T400 40 V80 H0 Z" fill="rgba(255,255,255,0.4)" />
        </svg>
      </div>

      <div className="px-7 mt-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900 leading-tight">
          AI listens, gently <br /> corrects your recitation
        </h2>
        <p className="mt-3 text-sm text-slate-500 leading-relaxed">
          Real-time mistake detection with Warsh-accurate pronunciation feedback —
          memorize with confidence.
        </p>
      </div>

      {/* Progress dots */}
      <div className="mt-7 flex items-center justify-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        <span className="h-1.5 w-8 rounded-full bg-brand-gradient" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
      </div>

      <div className="absolute bottom-8 left-6 right-6 flex items-center gap-3">
        <button className="w-14 h-14 rounded-2xl neu flex items-center justify-center">
          <Icon name="arrow_back" className="text-slate-600" size={22} />
        </button>
        <button className="flex-1 h-14 rounded-2xl bg-brand-gradient text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30">
          Continue
          <Icon name="arrow_forward" size={20} />
        </button>
      </div>
    </div>
  );
}
