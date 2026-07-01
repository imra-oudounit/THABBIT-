import { Icon } from "./Icon";
import { Owl } from "./Owl";

type Props = { locale?: "en" | "ar" };

export function FeatureMatrix({ locale = "en" }: Props) {
  const ar = locale === "ar";
  const groups = ar ? [
    {
      title: "الحفظ اليومي",
      items: ["هدف اليوم", "متابعة آخر جلسة", "اختبار سريع", "حفظ جديد"],
      icon: "auto_stories",
    },
    {
      title: "المراجعة الذكية",
      items: ["مراجعة يومية", "آيات ضعيفة", "بطاقات تذكر", "جدولة تكيفية"],
      icon: "replay",
    },
    {
      title: "الذكاء الاصطناعي",
      items: ["استماع للتلاوة", "كشف الأخطاء", "درجة النطق", "تصحيح لطيف"],
      icon: "psychology",
    },
    {
      title: "القرآن والتعلم",
      items: ["تصفح السور", "كلمة بكلمة", "تفسير", "نحو ومعاني"],
      icon: "menu_book",
    },
    {
      title: "التقدم والتحفيز",
      items: ["إحصائيات", "سلسلة يومية", "إنجازات", "مكافآت"],
      icon: "bar_chart",
    },
    {
      title: "الراحة والوصول",
      items: ["RTL كامل", "وضع داكن", "حجم خط كبير", "عمل دون اتصال"],
      icon: "accessibility_new",
    },
  ] : [
    {
      title: "Daily Memorization",
      items: ["Today's goal", "Continue session", "Quick test", "New memorization"],
      icon: "auto_stories",
    },
    {
      title: "Smart Review",
      items: ["Daily review", "Weak verses", "Flashcards", "Adaptive schedule"],
      icon: "replay",
    },
    {
      title: "AI Recitation",
      items: ["Listen to recitation", "Mistake detection", "Pronunciation score", "Gentle correction"],
      icon: "psychology",
    },
    {
      title: "Quran Learning",
      items: ["Surah browser", "Word by word", "Tafsir", "Grammar and meaning"],
      icon: "menu_book",
    },
    {
      title: "Progress and Motivation",
      items: ["Statistics", "Daily streak", "Achievements", "Rewards"],
      icon: "bar_chart",
    },
    {
      title: "Comfort and Access",
      items: ["Full RTL", "Dark mode", "Large text", "Offline mode"],
      icon: "accessibility_new",
    },
  ];

  return (
    <section className="rounded-[24px] sm:rounded-[32px] bg-white p-5 sm:p-8 shadow-xl shadow-slate-900/5 border border-slate-100" dir={ar ? "rtl" : "ltr"}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-emerald-700 font-semibold font-arabic">
            {ar ? "كل الميزات" : "All Features"}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 font-arabic">
            {ar ? "كل قدرات ثبّت في مكان واحد" : "Every THABBIT capability in one place"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-arabic max-w-2xl">
            {ar
              ? "تم نقل التفاصيل الثانوية إلى هذه المنطقة حتى تبقى الشاشة الرئيسية بسيطة وواضحة."
              : "Secondary details live here so the home screen stays simple and immediately understandable."}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3 border border-emerald-100">
          <Owl size={42} mood="wise" animated={false} />
          <div className="text-xs font-semibold text-emerald-800 font-arabic">
            {ar ? "ميزات منظمة" : "Organized features"}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {groups.map((group) => (
          <div key={group.title} className="rounded-[22px] bg-slate-50 border border-slate-100 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                <Icon name={group.icon} className="text-emerald-700" size={20} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-arabic">{group.title}</h3>
            </div>
            <div className="space-y-2">
              {group.items.map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs text-slate-600 font-arabic">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}