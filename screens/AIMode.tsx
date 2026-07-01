import { useEffect, useRef, useState } from "react";
import { Icon } from "../components/Icon";
import { StatusBar } from "../components/Phone";
import { useLanguage } from "../i18n/LanguageContext";

type CorrectionStatus = "ready" | "listening" | "processing" | "complete";

type WordHighlight = {
  text: string;
  type: "normal" | "correct" | "mispronounced" | "tajweed";
};

// Continuous verse dataset styled matching SQLite metadata rules
const surahInfo = {
  n: 67,
  ar: "سورة الملك",
  name: "Al-Mulk",
  type: "Meccan",
  verses: 30,
};

const versesData: WordHighlight[][] = [
  // Verse 1
  [
    { text: "تَبَـٰرَكَ", type: "correct" },
    { text: "ٱلَّذِي", type: "correct" },
    { text: "بِيَدِهِ", type: "correct" },
    { text: "ٱلْمُلْكُ", type: "correct" },
    { text: "وَهُوَ", type: "correct" },
    { text: "عَلَىٰ", type: "correct" },
    { text: "كُلِّ", type: "correct" },
    { text: "شَيْءٍ", type: "correct" },
    { text: "قَدِيرٌ", type: "correct" },
  ],
  // Verse 2
  [
    { text: "ٱلَّذِي", type: "correct" },
    { text: "خَلَقَ", type: "correct" },
    { text: "ٱلْمَوْتَ", type: "correct" },
    { text: "وَٱلْحَيَوٰةَ", type: "correct" },
    { text: "لِيَبْلُوَكُمْ", type: "tajweed" }, // soft gold underline for tajweed
    { text: "أَيُّكُمْ", type: "correct" },
    { text: "أَحْسَنُ", type: "correct" },
    { text: "عَمَلًا", type: "mispronounced" }, // soft red underline for mispronounced
    { text: "وَهُوَ", type: "normal" },
    { text: "ٱلْعَزِيزُ", type: "normal" },
    { text: "ٱلْغَفُورُ", type: "normal" },
  ],
];

export function AIModeScreen({ onBack }: { onBack?: () => void } = {}) {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  
  const [status, setStatus] = useState<CorrectionStatus>("ready");
  const [resultOpen, setResultOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const hasPushedHistory = useRef(false);

  useEffect(() => {
    if (!hasPushedHistory.current) {
      hasPushedHistory.current = true;
      window.history.pushState({ thabbit_route: "ai" }, "", window.location.href);
    }
    const handlePopState = (e: PopStateEvent) => {
      if (e.state?.thabbit_route === "ai" && onBack) onBack();
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      hasPushedHistory.current = false;
    };
  }, [onBack]);

  const handleBack = () => {
    onBack?.();
  };

  const handleStartRecording = () => {
    setStatus("listening");
    setResultOpen(false);
  };

  const handleStopRecording = () => {
    setStatus("processing");
    setTimeout(() => {
      setStatus("complete");
      setResultOpen(true);
    }, 2000); // Simulated AI processing lag
  };

  const handleReplay = () => {
    // simulated play effect
    setStatus("listening");
    setTimeout(() => setStatus("complete"), 1500);
  };

  const currentStatusLabel = {
    ready: isAr ? "جاهز للقراءة" : "Ready to Read",
    listening: isAr ? "جاري الاستماع..." : "Listening...",
    processing: isAr ? "جاري التحليل..." : "Processing...",
    complete: isAr ? "اكتمل التصحيح" : "Correction Complete",
  }[status];

  return (
    <div className="h-full w-full bg-[#fdfbf7] text-slate-800 relative overflow-hidden flex flex-col" dir="rtl">
      <StatusBar dark={false} />

      {/* Top Bar */}
      <div className="px-5 pt-10 pb-3 flex items-center gap-3 border-b border-slate-100 z-10 bg-[#fdfbf7]">
        <button onClick={handleBack} className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm cursor-pointer active:scale-95 transition">
          <Icon name="arrow_back" className="text-slate-700" size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-slate-900 font-arabic leading-none">التصحيح الفوري</h1>
          <p className="text-[10px] text-slate-500 mt-1 font-arabic leading-snug">اقرأ وسيتولى الذكاء الاصطناعي تحليل تلاوتك لحظة بلحظة</p>
        </div>
      </div>

      {/* Continuous Mushaf Reading Area */}
      <div className="flex-1 overflow-y-auto phone-scroll px-5 py-4 pb-44">
        
        {/* Calligraphic Surah Frame */}
        <div className="relative mx-1 mb-6 flex flex-col items-center">
          <div className="w-full max-w-[340px] aspect-[7/1] relative flex items-center justify-center">
            <svg viewBox="0 0 700 100" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              <path d="M55,10 H645 Q675,10 670,30 V70 Q670,90 640,90 H55 Q25,90 30,70 V30 Q25,10 55,10 Z" fill="none" stroke="#cbd5e1" strokeWidth="1.4" />
              <rect x="65" y="14" width="570" height="72" fill="none" stroke="#94a3b8" strokeWidth="0.6" />
              <path d="M30,30 Q15,30 15,40 Q15,50 30,50 M30,50 Q15,50 15,60 Q15,70 30,70 M15,50 L8,50" fill="none" stroke="#475569" strokeWidth="1.4" />
              <path d="M670,30 Q685,30 685,40 Q685,50 670,50 M670,50 Q685,50 685,60 Q685,70 670,70 M685,50 L692,50" fill="none" stroke="#475569" strokeWidth="1.4" />
            </svg>
            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="font-arabic text-2xl font-bold text-emerald-800">{surahInfo.ar}</div>
              <div className="text-[9px] font-semibold text-emerald-700/80 mt-0.5">{surahInfo.type === "Meccan" ? "مكية" : "مدنية"} · {surahInfo.verses} آية</div>
            </div>
          </div>
        </div>

        {/* Bismillah Centered Card */}
        <div className="text-center mb-6">
          <div className="font-quran text-2xl text-slate-800 leading-loose">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</div>
        </div>

        {/* Continuous Mushaf Text Layout */}
        <div className="mx-1 p-5 rounded-2xl border border-slate-100 bg-white/70 shadow-sm leading-[2.8]">
          <div className="font-quran text-right text-2xl text-slate-900" dir="rtl">
            {versesData.map((verse, vIndex) => (
              <span key={vIndex} className="inline">
                {verse.map((word, wIndex) => {
                  const isCorrect = word.type === "correct" && status === "complete";
                  const isMispronounced = word.type === "mispronounced" && status === "complete";
                  const isTajweed = word.type === "tajweed" && status === "complete";

                  return (
                    <span
                      key={wIndex}
                      className={`inline-block mx-0.5 px-0.5 transition-all duration-300 ${
                        isCorrect ? "text-emerald-700 font-bold bg-emerald-500/10 rounded-md" : ""
                      }`}
                      style={{
                        borderBottom: isMispronounced 
                          ? "2px solid #ef4444" 
                          : isTajweed 
                            ? "2px dashed #f59e0b" 
                            : "none"
                      }}
                    >
                      {word.text}
                    </span>
                  );
                })}
                <span className="inline-flex items-center justify-center mx-1.5 align-middle text-emerald-700 font-bold text-sm">
                  ۝{vIndex + 1}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action / Recording Panel */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-3 z-20 bg-gradient-to-t from-[#fdfbf7] via-[#fdfbf7]/90 to-transparent flex flex-col items-center">
        
        {/* Result Card overlay */}
        {resultOpen && (
          <div className="w-full max-w-[340px] mb-4 bg-white border border-slate-100 shadow-xl rounded-3xl p-4 animate-fade-up">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-emerald-700 font-semibold font-arabic">تحليل التلاوة</div>
                <div className="text-lg font-bold text-slate-900 font-arabic mt-1">المعدل: ٩٢٪</div>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold font-arabic">ممتاز</div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
              <span className="text-xs text-slate-500 font-arabic">عدد الأخطاء: ١ خطأ نطق · ١ تجويد</span>
              <button onClick={() => setDetailsOpen(true)} className="text-xs font-bold text-emerald-700 font-arabic flex items-center gap-1 cursor-pointer">
                عرض التفاصيل <Icon name="expand_less" size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Recitation Info */}
        <div className="mb-4 flex flex-col items-center">
          {status === "listening" && (
            <div className="flex items-end gap-1 h-6 mb-2">
              {Array.from({ length: 15 }).map((_, i) => (
                <span
                  key={i}
                  className="w-[3px] rounded-full bg-emerald-500 wave-bar"
                  style={{
                    height: `${8 + Math.abs(Math.sin(i * 0.5)) * 14}px`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
          )}
          <span className="text-xs font-bold text-slate-600 font-arabic tracking-wide">{currentStatusLabel}</span>
        </div>

        {/* Circular Floating Action Buttons (Start, Stop, Replay) */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handleReplay} 
            disabled={status !== "complete"}
            className="w-12 h-12 rounded-full bg-white border border-slate-100 shadow-md flex items-center justify-center text-slate-600 disabled:opacity-40 active:scale-95 transition cursor-pointer"
          >
            <Icon name="replay" size={22} />
          </button>

          <button 
            onClick={status === "listening" ? handleStopRecording : handleStartRecording}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 active:scale-95 cursor-pointer ${
              status === "listening" ? "bg-rose-500 shadow-rose-500/20 pulse-ring" : "bg-brand-gradient shadow-emerald-500/20"
            }`}
          >
            <Icon name={status === "listening" ? "stop" : "mic"} className="text-white" size={28} filled />
          </button>

          <button 
            onClick={handleStopRecording} 
            disabled={status !== "listening"}
            className="w-12 h-12 rounded-full bg-white border border-slate-100 shadow-md flex items-center justify-center text-slate-600 disabled:opacity-40 active:scale-95 transition cursor-pointer"
          >
            <Icon name="stop" size={22} />
          </button>
        </div>
      </div>

      {/* Details Bottom Sheet */}
      {detailsOpen && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end">
          <div className="w-full rounded-t-[32px] p-6 bg-white text-slate-900 shadow-2xl animate-fade-up">
            <div className="w-12 h-1.5 rounded-full bg-slate-200 mx-auto mb-4" />
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-bold font-arabic">ملاحظات التلاوة بالتفصيل</h3>
                <p className="text-[10px] text-slate-500">مراجعة أخطاء النطق والتجويد لآيات سورة الملك</p>
              </div>
              <button onClick={() => setDetailsOpen(false)} className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center cursor-pointer">
                <Icon name="close" size={18} />
              </button>
            </div>
            
            <div className="space-y-3 max-h-[220px] overflow-y-auto phone-scroll">
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-100 flex items-start gap-3">
                <Icon name="error" className="text-rose-600 shrink-0" size={18} filled />
                <div>
                  <div className="text-xs font-bold font-arabic text-rose-800">خطأ في النطق: الكلمة "عَمَلًا"</div>
                  <div className="text-[10px] text-slate-600 mt-0.5 font-arabic">لم تظهر الفتحة بشكل واضح في نهاية الكلمة. يُنصح بالتركيز على النبر الصحيح.</div>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-100 flex items-start gap-3">
                <Icon name="auto_awesome" className="text-amber-600 shrink-0" size={18} />
                <div>
                  <div className="text-xs font-bold font-arabic text-amber-800">ملاحظة تجويد: الكلمة "لِيَبْلُوَكُمْ"</div>
                  <div className="text-[10px] text-slate-600 mt-0.5 font-arabic">قلقلة غير كافية لحرف الباء الساكن. يُرجى قلقلة الحرف بوضوح أكثر.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
