import { Icon } from "../../components/Icon";
import { Owl } from "../../components/Owl";
import { StatusBar } from "../../components/Phone";
import { useLanguage } from "../../i18n/LanguageContext";

export function OnboardingFlow({ index, onNext, onBack, onSkip }: { index: number; onNext: () => void; onBack: () => void; onSkip: () => void }) {
  const { t } = useLanguage();

  const pages: {
    icon: string;
    title: string;
    body: string;
    mood: "happy" | "wise" | "listen" | "correct" | "celebrate";
  }[] = [
    {
      icon: "auto_stories",
      title: t("onboarding.p1_title"),
      body: t("onboarding.p1_body"),
      mood: "happy",
    },
    {
      icon: "replay",
      title: t("onboarding.p2_title"),
      body: t("onboarding.p2_body"),
      mood: "wise",
    },
    {
      icon: "flag",
      title: t("onboarding.p3_title"),
      body: t("onboarding.p3_body"),
      mood: "correct",
    },
    {
      icon: "bar_chart",
      title: t("onboarding.p4_title"),
      body: t("onboarding.p4_body"),
      mood: "listen",
    },
    {
      icon: "emoji_events",
      title: t("onboarding.p5_title"),
      body: t("onboarding.p5_body"),
      mood: "celebrate",
    },
  ];

  const page = pages[index];
  const isLast = index === pages.length - 1;

  return (
    <div className="h-full w-full bg-mesh relative">
      <StatusBar />
      <div className="px-6 pt-10 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 font-display">
          {t("onboarding.progress", { current: index + 1, total: pages.length })}
        </span>
        <button onClick={onSkip} className="text-xs font-semibold text-slate-500 font-arabic">
          {t("common.skip")}
        </button>
      </div>

      <div className="mx-6 mt-6 h-72 rounded-[28px] bg-brand-soft relative overflow-hidden flex items-center justify-center">
        <div className="absolute top-6 left-6 w-10 h-10 rounded-2xl bg-white/70 backdrop-blur flex items-center justify-center shadow-sm">
          <Icon name={page.icon} className="text-emerald-700" size={20} />
        </div>
        <div className="absolute bottom-6 right-6 w-12 h-12 rounded-2xl glass flex items-center justify-center floaty">
          <Icon name="auto_awesome" className="text-teal-700" size={22} />
        </div>
        <Owl size={180} mood={page.mood} className="floaty" />
        <svg className="absolute -bottom-12 left-0 right-0" viewBox="0 0 400 80">
          <path d="M0 40 Q100 0 200 40 T400 40 V80 H0 Z" fill="rgba(255,255,255,0.4)" />
        </svg>
      </div>

      <div className="px-7 mt-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900 leading-tight font-arabic">{page.title}</h2>
        <p className="mt-3 text-sm text-slate-500 leading-relaxed font-arabic">{page.body}</p>
      </div>

      <div className="mt-7 flex items-center justify-center gap-2">
        {pages.map((_, dotIndex) => (
          <span key={dotIndex} className={`${dotIndex === index ? "w-8 bg-brand-gradient" : "w-1.5 bg-slate-300"} h-1.5 rounded-full transition-all`} />
        ))}
      </div>

          <div className="absolute bottom-8 left-6 right-6 flex items-center gap-3">
            <button onClick={onBack} className="w-14 h-14 rounded-2xl neu flex items-center justify-center" disabled={index === 0}>
            </button>
            <button onClick={onNext} className="flex-1 h-14 rounded-2xl bg-brand-gradient text-white font-semibold flex items-center justify-center shadow-lg shadow-emerald-600/30 font-arabic">
              {isLast ? t("common.start") : t("common.continue")}
            </button>
          </div>
    </div>
  );
}