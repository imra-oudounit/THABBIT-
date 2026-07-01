import { Owl } from "../components/Owl";
import { StatusBar } from "../components/Phone";

export function SplashScreen() {
  return (
    <div className="h-full w-full bg-night-gradient text-white relative overflow-hidden">
      <StatusBar dark />
      {/* Decorative arabesque rings */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full border border-white/10 spin-slow" />
      <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full border border-white/5 spin-slow" />
      <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full border border-emerald-400/20 spin-slow" />

      {/* Subtle islamic star */}
      <svg viewBox="0 0 100 100" className="absolute top-24 left-8 w-16 h-16 opacity-20">
        <polygon points="50,5 61,39 95,39 67,59 78,93 50,72 22,93 33,59 5,39 39,39"
          fill="none" stroke="#fde68a" strokeWidth="1" />
      </svg>

      <div className="h-full flex flex-col items-center justify-center px-8 -mt-10">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-400/30 blur-3xl rounded-full" />
          <div className="relative floaty">
            <Owl size={150} />
          </div>
        </div>

        <h1 className="mt-8 text-5xl font-arabic font-bold text-gold-gradient">ثبت</h1>
        <div className="mt-1 text-2xl font-display font-bold tracking-wide">THABBIT</div>
        <p className="mt-3 text-sm text-slate-300 text-center max-w-[240px]">
          The Intelligent Quran Memorization Companion
        </p>

        <div className="mt-14 flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0.15s" }} />
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0.3s" }} />
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center text-[10px] text-slate-400 tracking-widest">
        بسم الله الرحمن الرحيم
      </div>
    </div>
  );
}
