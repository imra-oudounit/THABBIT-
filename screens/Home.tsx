import { useState } from "react";
import { Icon } from "../components/Icon";
import { Owl } from "../components/Owl";
import { StatusBar } from "../components/Phone";
import { ProfileMenu } from "../components/ProfileMenu";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { useUserProfile } from "../hooks/useUserProfile";
import { useLanguage } from "../i18n/LanguageContext";
import { logout } from "../services/authService";

type HomeProps = {
  onOpenProfile?: () => void;
  onOpenSettings?: () => void;
};

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 6) return "طاب مساؤك";
  if (h < 12) return "صباح الخير";
  if (h < 17) return "طاب يومك";
  return "مساء الخير";
}

function toArabicNum(n: number): string {
  return n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);
}

export function HomeScreen({ onOpenProfile, onOpenSettings }: HomeProps = {}) {
  const { profile, loading } = useUserProfile();
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);

  const displayName = profile.displayName || (profile.isAnonymous ? "زائر" : "مستخدم");
  const firstName = displayName.split(" ")[0];

  const streak = profile.streak ?? 0;
  const goalTotal = profile.dailyGoalVerses || 3;
  const goalDone = profile.dailyGoalCompleted || 0;
  const goalPct = goalTotal > 0 ? Math.min(100, Math.round((goalDone / goalTotal) * 100)) : 0;
  const goalRemaining = Math.max(0, goalTotal - goalDone);

  const reviewTotal = profile.dailyReviewGoal || 5;
  const reviewDone = profile.dailyReviewCompleted || 0;
  const reviewPct = reviewTotal > 0 ? Math.min(100, Math.round((reviewDone / reviewTotal) * 100)) : 0;

  const totalMinutes = profile.totalMinutesToday || 0;
  const totalVersesMemorized = profile.totalVersesMemorized || 0;
  const memPct = profile.memorizationProgress || 0;

  const lastSurah = profile.lastSurah || "سورة الملك";
  const lastVerse = profile.lastVerse || "إِنَّ الَّذِينَ يَخْشَوْنَ رَبَّهُم بِالْغَيْبِ لَهُم مَّغْفِرَةٌ وَأَجْرٌ كَبِيرٌ...";

  const recentActivity = profile.recentActivity?.length
    ? profile.recentActivity
    : [
        { label: "حفظ ٣ آيات من سورة الملك", time: "قبل ساعة", icon: "auto_stories" },
        { label: "مراجعة سورة يس", time: "اليوم", icon: "replay" },
        { label: "اختبار سريع — ٩٠٪", time: "أمس", icon: "psychology" },
      ];

  if (loading) {
    return (
      <div className="h-full w-full bg-[#fafafa] flex items-center justify-center">
        <div className="text-center">
          <Owl size={80} mood="thinking" />
          <div className="mt-4 text-xs text-slate-500 font-arabic">جاري التحميل...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-[#fafafa] relative overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto phone-scroll pb-24">
        <StatusBar />
        <div className="px-5 pt-12 pb-6">

        {/* 1. Welcome + Streak + Sign Out */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-arabic tracking-wide">{getGreeting()}</div>
            <h1 className="text-2xl font-bold text-slate-900 font-arabic mt-1">{firstName}</h1>
            {profile.isAnonymous && (
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-arabic mt-1 inline-block">وضع الزائر</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* Streak badge */}
            {streak > 0 && (
              <div className="h-10 px-3 rounded-2xl bg-amber-50 border border-amber-100 flex items-center gap-1.5">
                <Icon name="local_fire_department" className="text-amber-500" size={16} filled />
                <span className="text-xs font-bold text-amber-700">{toArabicNum(streak)}</span>
              </div>
            )}
            {/* Avatar / Owl with dropdown menu */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center cursor-pointer active:scale-95 transition"
              >
                {profile.photoURL ? (
                  <img src={profile.photoURL} alt="" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <Owl size={36} mood="happy" />
                )}
              </button>
              <ProfileMenu
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                onProfile={() => onOpenProfile?.()}
                onSettings={() => onOpenSettings?.()}
                onSignOut={() => setSignOutOpen(true)}
              />
            </div>
          </div>
        </div>

        {/* 2. Daily Progress Card — connected to Firestore */}
        <div className="mt-6 rounded-[28px] bg-brand-gradient p-6 text-white shadow-xl shadow-emerald-600/20 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex items-center justify-between">
            <div>
              <div className="text-xs text-emerald-100 font-arabic font-medium">تقدم اليوم</div>
              <div className="text-3xl font-bold mt-1 font-arabic">{toArabicNum(totalMinutes)} دقيقة</div>
              <div className="text-[10px] text-emerald-200 mt-1 font-arabic">
                {totalVersesMemorized > 0
                  ? `تم حفظ ${toArabicNum(totalVersesMemorized)} آيات`
                  : "ابدأ جلسة الحفظ الأولى"}
              </div>
            </div>
            {/* Progress Ring */}
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.2)" strokeWidth="5" fill="none" />
                <circle cx="32" cy="32" r="26" stroke="#fff" strokeWidth="5" fill="none"
                  strokeDasharray={`${2 * Math.PI * 26}`}
                  strokeDashoffset={`${2 * Math.PI * 26 * (1 - memPct / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">{memPct}%</div>
            </div>
          </div>
        </div>

        {/* 3. Three Primary Actions */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <button className="bg-emerald-50 border border-emerald-100 rounded-[24px] p-4 flex flex-col items-center justify-center gap-3 h-32 active:scale-95 transition cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-emerald-600">
              <Icon name="replay" size={24} filled />
            </div>
            <span className="text-xs font-bold text-slate-800 font-arabic">مراجعة</span>
          </button>
          <button className="bg-teal-50 border border-teal-100 rounded-[24px] p-4 flex flex-col items-center justify-center gap-3 h-32 active:scale-95 transition cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-teal-600">
              <Icon name="auto_stories" size={24} filled />
            </div>
            <span className="text-xs font-bold text-slate-800 font-arabic">حفظ جديد</span>
          </button>
          <button className="bg-amber-50 border border-amber-100 rounded-[24px] p-4 flex flex-col items-center justify-center gap-3 h-32 active:scale-95 transition cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-amber-600">
              <Icon name="psychology" size={24} filled />
            </div>
            <span className="text-xs font-bold text-slate-800 font-arabic">اختبر نفسك</span>
          </button>
        </div>

        {/* 4. Memorization Goal */}
        <div className="mt-6 rounded-[28px] bg-slate-50 p-5 border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-bold text-slate-900 font-arabic flex items-center gap-2">
              <Icon name="flag" size={16} className="text-emerald-600" filled /> هدف الحفظ
            </div>
            <div className="text-xs text-emerald-700 font-bold font-arabic bg-emerald-100 px-2 py-1 rounded-lg">
              {toArabicNum(goalDone)} / {toArabicNum(goalTotal)} آيات
            </div>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${goalPct}%` }} />
          </div>
          <div className="text-[10px] text-slate-500 mt-2 font-arabic text-center">
            {goalRemaining > 0
              ? `${goalRemaining === 1 ? "آية واحدة متبقية" : goalRemaining === 2 ? "آيتان متبقيتان" : `${toArabicNum(goalRemaining)} آيات متبقية`} لإكمال هدف اليوم`
              : "أحسنت! أكملت هدف الحفظ اليوم 🎉"}
          </div>
        </div>

        {/* 5. Review Goal */}
        <div className="mt-4 rounded-[28px] bg-slate-50 p-5 border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-bold text-slate-900 font-arabic flex items-center gap-2">
              <Icon name="replay" size={16} className="text-teal-600" filled /> هدف المراجعة
            </div>
            <div className="text-xs text-teal-700 font-bold font-arabic bg-teal-100 px-2 py-1 rounded-lg">
              {toArabicNum(reviewDone)} / {toArabicNum(reviewTotal)} آيات
            </div>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-teal-500 rounded-full transition-all duration-500" style={{ width: `${reviewPct}%` }} />
          </div>
        </div>

        {/* 6. Continue Last Session */}
        <div className="mt-6 rounded-[28px] bg-white p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-bold text-slate-500 font-arabic flex items-center gap-1.5">
              <Icon name="history" size={14} className="text-slate-400" /> تابع من حيث توقفت
            </div>
            <span className="text-[10px] px-2 py-1 rounded-full bg-slate-100 text-slate-600 font-arabic">{lastSurah}</span>
          </div>
          <div className="font-quran text-xl text-slate-900 text-right leading-loose mb-4" dir="rtl">
            {lastVerse}
          </div>
          <button className="w-full h-12 rounded-2xl bg-slate-900 text-white text-sm font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition cursor-pointer">
            <Icon name="play_arrow" size={18} filled /> استمر في الحفظ
          </button>
        </div>

        {/* 7. Recent Activity */}
        <div className="mt-6">
          <div className="text-sm font-bold text-slate-900 font-arabic mb-3 flex items-center gap-2">
            <Icon name="schedule" size={16} className="text-slate-500" /> النشاط الأخير
          </div>
          <div className="space-y-2">
            {recentActivity.map((item, i) => (
              <div key={i} className="rounded-2xl bg-white p-3.5 border border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <Icon name={item.icon} className="text-emerald-700" size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-800 font-arabic truncate">{item.label}</div>
                  <div className="text-[10px] text-slate-500 font-arabic">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 8. Quick Stats Summary */}
        <div className="mt-6 grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-white border border-slate-100 p-3 text-center">
            <Icon name="menu_book" className="text-emerald-700 mx-auto" size={18} />
            <div className="text-lg font-bold text-slate-900 mt-1">{toArabicNum(totalVersesMemorized)}</div>
            <div className="text-[9px] text-slate-500 font-arabic">آيات محفوظة</div>
          </div>
          <div className="rounded-2xl bg-white border border-slate-100 p-3 text-center">
            <Icon name="local_fire_department" className="text-amber-500 mx-auto" size={18} />
            <div className="text-lg font-bold text-slate-900 mt-1">{toArabicNum(streak)}</div>
            <div className="text-[9px] text-slate-500 font-arabic">يوم متواصل</div>
          </div>
          <div className="rounded-2xl bg-white border border-slate-100 p-3 text-center">
            <Icon name="schedule" className="text-teal-600 mx-auto" size={18} />
            <div className="text-lg font-bold text-slate-900 mt-1">{toArabicNum(totalMinutes)}</div>
            <div className="text-[9px] text-slate-500 font-arabic">دقيقة اليوم</div>
          </div>
        </div>

        </div>
      </div>

      <ConfirmDialog
        open={signOutOpen}
        title={t("dialog.signout_title")}
        message={t("dialog.signout_message")}
        confirmLabel={t("dialog.signout_menu")}
        onCancel={() => setSignOutOpen(false)}
        onConfirm={async () => { setSignOutOpen(false); await logout(); }}
      />
    </div>
  );
}
