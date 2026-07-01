import { useState, useEffect, useRef } from "react";
import { Owl } from "../components/Owl";
import { Icon } from "../components/Icon";
import { StatusBar } from "../components/Phone";
import { playSound } from "../utils/audio";

type Step = "idle" | "listen" | "thinking" | "correct" | "remind" | "wrong" | "celebrate";

const verses = [
  { ar: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", tr: "Indeed, with hardship comes ease.", tr_ar: "فإنّ مع العسر يسرًا", ref: "94:6" },
  { ar: "وَالْقُرْآنِ الْحَكِيمِ", tr: "By the Wise Quran.", tr_ar: "والقرآن الحكيم", ref: "36:2" },
  { ar: "فَاذْكُرُونِي أَذْكُرْكُمْ", tr: "So remember Me; I will remember you.", tr_ar: "فاذكروني أذكركم", ref: "2:152" },
];

export function TryThabbitScreen({ locale = "en" }: { locale?: "en" | "ar" }) {
  const ar = locale === "ar";
  const [step, setStep] = useState<Step>("idle");
  const [score, setScore] = useState(94);
  const [streak, setStreak] = useState(3);
  const [vIdx, setVIdx] = useState(0);
  const [micLevel, setMicLevel] = useState<number[]>(Array(24).fill(4));
  const timer = useRef<number | null>(null);

  const v = verses[vIdx];

  useEffect(() => {
    if (step === "listen") {
      const id = window.setInterval(() => {
        setMicLevel(Array.from({ length: 24 }, () => 4 + Math.random() * 30));
      }, 90);
      return () => clearInterval(id);
    } else {
      setMicLevel(Array(24).fill(4));
    }
  }, [step]);

  const run = (outcome: Step) => {
    if (timer.current) window.clearTimeout(timer.current);
    playSound('click');
    setStep("listen");
    timer.current = window.setTimeout(() => {
      setStep("thinking");
      timer.current = window.setTimeout(() => {
        setStep(outcome);
        if (outcome === "correct") playSound('success');
        if (outcome === "celebrate") playSound('celebrate');
        if (outcome === "wrong") playSound('error');
        if (outcome === "remind") playSound('click'); // Soft click for remind
        
        if (outcome === "correct" || outcome === "celebrate") {
          setScore(s => Math.min(99, s + Math.floor(Math.random()*3)));
          setStreak(st => st + 1);
        } else if (outcome === "wrong") {
          setScore(s => Math.max(72, s - 3));
        }
        timer.current = window.setTimeout(() => setStep("idle"), 1650);
      }, 1100);
    }, 1500);
  };

  const nextVerse = () => setVIdx(i => (i + 1) % verses.length);

  const moodMap: Record<Step, any> = {
    idle: "happy",
    listen: "listen",
    thinking: "thinking",
    correct: "correct",
    celebrate: "celebrate",
    remind: "remind",
    wrong: "wrong",
  };

  const txt = ar ? {
    try: "جرّب ثبّت",
    live: "مباشر",
    surah: "سورة",
    next: "التالي",
    tap: "اضغط زرًا لمحاكاة التلاوة",
    listening: "يستمع… اتلُ بوضوح",
    thinking: "الذكاء الاصطناعي يحلل التجويد…",
    correct: "أحسنت! ممتاز.",
    celebrate: "ما شاء الله! أتقنت الآية 🎉",
    remind: "تذكير لطيف — أبطئ المد.",
    wrong: "تصحيح بسيط — أعد حرف القاف.",
    pron: "النطق",
    streak: "التتالي",
    demo: "عرض تفاعلي مصغّر · بدون ميكروفون",
    correctBtn: "صحيح",
    celebrateBtn: "احتفال",
    remindBtn: "تذكير",
    wrongBtn: "خطأ",
  } : {
    try: "Try Thabbit",
    live: "LIVE",
    surah: "Surah",
    next: "Next",
    tap: "Tap a button to simulate recitation",
    listening: "Listening… recite clearly",
    thinking: "AI analyzing tajweed…",
    correct: "أحسنت! Perfect.",
    celebrate: "MashaAllah! Verse mastered 🎉",
    remind: "Gentle reminder — slow the madd.",
    wrong: "Small correction — try the ق again.",
    pron: "Pronunciation",
    streak: "Streak",
    demo: "Mini interactive demo · no microphone required",
    correctBtn: "Correct",
    celebrateBtn: "Celebrate",
    remindBtn: "Remind",
    wrongBtn: "Wrong",
  };

  return (
    <div className="h-full w-full bg-mesh relative" dir={ar ? "rtl" : "ltr"}>
      <StatusBar />
      <div className="px-5 pt-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-emerald-700 font-semibold font-arabic">
            {txt.try}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-bold">{txt.live}</span>
        </div>
        <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
          <Icon name="local_fire_department" size={14} filled /> {streak}
        </div>
      </div>

      {/* Verse card */}
      <div className="mx-5 mt-4 rounded-[24px] bg-white p-5 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between text-[10px] text-slate-500">
          <span>{txt.surah} · {v.ref}</span>
          <button onClick={nextVerse} className="text-emerald-700 font-semibold flex items-center gap-1">
            {txt.next} <Icon name={ar ? "chevron_left" : "chevron_right"} size={14} />
          </button>
        </div>
        <div className="font-quran text-[24px] text-right leading-loose mt-3 text-slate-900" dir="rtl">
          {v.ar}
        </div>
        <div className="text-xs text-slate-500 italic mt-2" dir={ar ? "rtl" : "ltr"}>
          {ar ? v.tr_ar : v.tr}
        </div>
      </div>

      {/* Owl stage */}
      <div className="mt-5 flex flex-col items-center">
        <div className="relative">
          {step === "listen" && <span className="absolute inset-0 rounded-full pulse-ring" />}
          <div className="w-[150px] h-[150px] rounded-full bg-emerald-50 flex items-center justify-center">
            <Owl size={120} mood={moodMap[step]} />
          </div>
        </div>

        {/* Mic bars */}
        <div className="mt-4 flex items-end gap-[3px] h-10">
          {micLevel.map((h, i) => (
            <span
              key={i}
              className={`w-[5px] rounded-full transition-all duration-90 ${step==="listen" ? "bg-emerald-500" : "bg-slate-300"}`}
              style={{ height: `${h}px` }}
            />
          ))}
        </div>

        <div className="mt-3 text-xs font-semibold text-slate-800 min-h-[20px] text-center px-5 font-arabic">
          {step==="idle" && txt.tap}
          {step==="listen" && <span className="text-emerald-700">{txt.listening}</span>}
          {step==="thinking" && txt.thinking}
          {step==="correct" && <span className="text-emerald-700">{txt.correct}</span>}
          {step==="celebrate" && <span className="text-amber-600">{txt.celebrate}</span>}
          {step==="remind" && <span className="text-amber-700">{txt.remind}</span>}
          {step==="wrong" && <span className="text-rose-600">{txt.wrong}</span>}
        </div>
      </div>

      {/* Score strip */}
      <div className="mx-5 mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-2xl bg-white border border-slate-100 p-2">
          <div className="text-[10px] text-slate-500 font-arabic">{txt.pron}</div>
          <div className="text-lg font-bold text-emerald-700">{score}%</div>
        </div>
        <div className="rounded-2xl bg-white border border-slate-100 p-2">
          <div className="text-[10px] text-slate-500 font-arabic">{txt.streak}</div>
          <div className="text-lg font-bold text-amber-600">{streak}</div>
        </div>
        <div className="rounded-2xl bg-white border border-slate-100 p-2">
          <div className="text-[10px] text-slate-500">XP</div>
          <div className="text-lg font-bold text-teal-700">+25</div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-5 left-5 right-5">
        <div className="grid grid-cols-2 gap-2">
          <button onClick={()=>run("correct")} className="h-12 rounded-2xl bg-brand-gradient text-white text-xs font-semibold flex items-center justify-center gap-1 shadow-md shadow-emerald-600/25 font-arabic">
            <Icon name="check_circle" size={16} filled /> {txt.correctBtn}
          </button>
          <button onClick={()=>run("celebrate")} className="h-12 rounded-2xl bg-gold-gradient text-amber-950 text-xs font-semibold flex items-center justify-center gap-1 shadow-md font-arabic">
            <Icon name="celebration" size={16} filled /> {txt.celebrateBtn}
          </button>
          <button onClick={()=>run("remind")} className="h-12 rounded-2xl bg-amber-100 text-amber-800 text-xs font-semibold flex items-center justify-center gap-1 font-arabic">
            <Icon name="lightbulb" size={16} /> {txt.remindBtn}
          </button>
          <button onClick={()=>run("wrong")} className="h-12 rounded-2xl bg-rose-50 text-rose-700 text-xs font-semibold flex items-center justify-center gap-1 font-arabic">
            <Icon name="error" size={16} /> {txt.wrongBtn}
          </button>
        </div>
        <div className="text-center text-[9px] text-slate-400 mt-2 font-arabic">{txt.demo}</div>
      </div>
    </div>
  );
}
