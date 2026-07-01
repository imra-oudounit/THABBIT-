import { useState, useEffect } from "react";
import { Owl } from "./Owl";
import { Icon } from "./Icon";
import { playSound } from "../utils/audio";

import type { Mood as OwlMood } from "./Owl";
type Mood = OwlMood | "idle";

export function OwlLab({ locale = "en" }: { locale?: "en" | "ar" }) {
  const ar = locale === "ar";

  const moods = [
    { key: "correct" as Mood, label: ar ? "صحيح!" : "Correct!", color: "bg-emerald-500", desc: ar ? "أحسنت! تلاوة متقنة." : "أحسنت! Perfect recitation.", icon: "check_circle", k: "1" },
    { key: "celebrate" as Mood, label: ar ? "ما شاء الله" : "MashaAllah", color: "bg-amber-500", desc: ar ? "تم حفظ السورة!" : "Surah completed!", icon: "celebration", k: "2" },
    { key: "remind" as Mood, label: ar ? "تذكير لطيف" : "Gentle nudge", color: "bg-yellow-500", desc: ar ? "جرّب الآية مجددًا بهدوء." : "Try that verse again softly.", icon: "lightbulb", k: "3" },
    { key: "wrong" as Mood, label: ar ? "خطأ" : "Mistake", color: "bg-rose-500", desc: ar ? "تصحيح تجويد بسيط." : "Small tajweed correction.", icon: "error", k: "4" },
    { key: "thinking" as Mood, label: ar ? "الذكاء يفكر" : "AI thinking", color: "bg-teal-500", desc: ar ? "يحلل النطق…" : "Analyzing pronunciation…", icon: "psychology", k: "5" },
    { key: "listen" as Mood, label: ar ? "يستمع" : "Listening", color: "bg-emerald-600", desc: ar ? "يستمع بعناية." : "Listening with care.", icon: "mic", k: "6" },
    { key: "happy" as Mood, label: ar ? "سعيد" : "Happy", color: "bg-emerald-400", desc: ar ? "جاهز للحفظ." : "Ready to memorize.", icon: "sentiment_satisfied", k: "—" },
    { key: "wise" as Mood, label: ar ? "حكيم" : "Wise", color: "bg-slate-700", desc: ar ? "وضع التركيز العميق." : "Deep focus mode.", icon: "auto_stories", k: "—" },
  ];

  const [mood, setMood] = useState<Mood>("idle");
  const [counter, setCounter] = useState(0);
  const [log, setLog] = useState<{t:string;m:Mood}[]>([
    { t: ar ? "بسم الله — جاهز" : "Bismillah — ready", m: "happy" }
  ]);

  const trigger = (m: Mood, text: string) => {
    playSound('click');
    if (m === "correct") playSound('success');
    if (m === "celebrate") playSound('celebrate');
    if (m === "wrong") playSound('error');
    
    setMood(m);
    setCounter(c => c + 1);
    setLog(l => [{ t: text, m }, ...l].slice(0, 6));
    setTimeout(() => setMood("idle"), m === "thinking" || m === "listen" ? 2600 : 1450);
  };

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const map: Record<string, Mood> = { "1":"correct", "2":"celebrate", "3":"remind", "4":"wrong", "5":"thinking", "6":"listen" };
      if (map[e.key]) {
        const found = moods.find(mm=>mm.key===map[e.key]);
        if (found) trigger(found.key, found.desc);
      }
    };
    window.addEventListener("keydown", h);
    return ()=>window.removeEventListener("keydown", h);
  }, [ar]);

  const current = moods.find(mo => mo.key === mood) ?? moods[6];

  return (
    <div className="bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-7 md:p-9 shadow-xl shadow-slate-900/5 border border-slate-100" dir={ar ? "rtl" : "ltr"}>
      <div className="flex items-start justify-between flex-wrap gap-3 sm:gap-4 mb-5 sm:mb-6">
        <div>
          <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-emerald-700 font-semibold">
            {ar ? "مختبر مشاعر هدهد" : "Hudhud Emotion Lab"}
          </div>
          <h2 className="text-lg sm:text-2xl font-bold text-slate-900 mt-1">
            {ar ? "تميمة البومة – ردود فعل حية" : "Owl Mascot – Live Reactions"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md">
            {ar ? "١٠ حالات تعبيرية · حركة ٢٠٠–٩٠٠ ملّثانية · مصممة للحظات تصحيح القرآن." : "10 expressive states · 200-900ms motion · crafted for Quran feedback moments."}
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold text-slate-600 bg-slate-50 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {ar ? "معاينة حيّة · اضغط ١–٦" : "Live preview · press 1–6"}
        </div>
      </div>

      <div className="grid lg:grid-cols-[380px_1fr] gap-5 lg:gap-7 items-start">
        {/* Stage */}
        <div className="rounded-[20px] sm:rounded-[28px] bg-mesh border border-slate-100 p-5 sm:p-7 text-center relative overflow-hidden min-h-[320px] sm:min-h-[360px] flex flex-col">
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 text-[9px] sm:text-[10px] font-semibold text-slate-500 bg-white/70 px-2 py-0.5 sm:py-1 rounded-full">thabbit.app/owl</div>
          <div className="flex-1 flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-emerald-100/60 blur-2xl" />
            </div>
            <div key={counter} className="relative">
              <Owl size={140} mood={mood === "idle" ? "happy" : mood} />
            </div>
          </div>
          {/* Speech bubble */}
          <div className="min-h-[56px] sm:min-h-[62px] flex items-center justify-center">
            <div className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${current.color} text-white shadow-lg max-w-full`}>
              {current.desc}
            </div>
          </div>
          <div className="text-[9px] sm:text-[10px] text-slate-500 mt-1.5 sm:mt-2">
            {ar ? "الحالة:" : "State:"} <span className="font-semibold text-slate-800">{mood}</span> · {ar ? "تنشيط" : "animation"} {counter}
          </div>
        </div>

        {/* Controls */}
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {moods.map((m) => (
              <button
                key={m.key}
                onClick={()=>trigger(m.key, m.desc)}
                className={`text-left rounded-2xl p-3 border transition ${
                  mood === m.key ? "border-emerald-400 bg-emerald-50 shadow-sm" : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <div className={`w-9 h-9 rounded-xl ${m.color} text-white flex items-center justify-center mb-2`}>
                  <Icon name={m.icon} size={18} filled />
                </div>
                <div className="text-xs font-bold text-slate-900">{m.label}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {m.k !== "—" ? (ar ? `اضغط ${{"1":"١","2":"٢","3":"٣","4":"٤","5":"٥","6":"٦"}[m.k]||m.k}` : `Press ${m.k}`) : "—"}
                </div>
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-100 p-4">
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
              {ar ? "سجل التفاعل" : "Reaction log"}
            </div>
            <div className="space-y-1.5 font-arabic">
              {log.map((l, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="font-semibold text-slate-800 w-24">{l.m}</span>
                  <span className="text-slate-600">{l.t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Motion specs */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-[10px]">
            {[
              { k: ar ? "صحيح" : "Correct", v: ar ? "٠٫٩ث ارتداد" : "0.9s bounce" },
              { k: ar ? "خطأ" : "Wrong", v: ar ? "٠٫٦٢ث اهتزاز" : "0.62s wobble" },
              { k: ar ? "تذكير" : "Remind", v: ar ? "١٫٢٥ث نبض" : "1.25s pulse" },
              { k: ar ? "تفكير" : "Thinking", v: ar ? "١٫٨ث تكرار" : "1.8s loop" },
              { k: ar ? "استماع" : "Listen", v: ar ? "١٫١ث توهج" : "1.1s glow" },
              { k: ar ? "احتفال" : "Celebrate", v: ar ? "٠٫٩ث + قصاصات" : "0.9s + confetti" },
            ].map(s=>(
              <div key={s.k} className="rounded-xl bg-white border border-slate-100 px-3 py-2">
                <div className="font-semibold text-slate-800">{s.k}</div>
                <div className="text-slate-500">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
