import { useMemo, useState } from "react";
import { Icon } from "../components/Icon";
import { Owl } from "../components/Owl";
import { StatusBar } from "../components/Phone";
import { useLanguage } from "../i18n/LanguageContext";

type SourceCard = {
  id: string;
  source: string;
  surah: string;
  ayah: string;
  volume: string;
  page: string;
  book: string;
  excerpt: string;
};

export function WordByWordScreen({ onBack }: { onBack?: () => void } = {}) {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const isFr = locale === "fr";
  const [expandedSource, setExpandedSource] = useState<string | null>("ibn-kathir");
  const [showTafsirMode, setShowTafsirMode] = useState(false);

  const copyLabel = isAr ? "نسخ" : isFr ? "Copier" : "Copy";
  const shareLabel = isAr ? "مشاركة" : isFr ? "Partager" : "Share";
  const bookmarkLabel = isAr ? "حفظ" : isFr ? "Enregistrer" : "Bookmark";
  const likeLabel = isAr ? "إعجاب" : isFr ? "J'aime" : "Like";
  const dislikeLabel = isAr ? "لم يعجبني" : isFr ? "Je n'aime pas" : "Dislike";
  const reportLabel = isAr ? "إبلاغ" : isFr ? "Signaler" : "Report";

  const suggestions = useMemo(
    () => [
      isAr ? "اشرح هذه الآية" : isFr ? "Expliquer ce verset" : "Explain this verse",
      isAr ? "قارن التفاسير" : isFr ? "Comparer les tafsirs" : "Compare Tafsir",
      isAr ? "معنى هذه الكلمة" : isFr ? "Sens de ce mot" : "Meaning of this word",
      isAr ? "سبب النزول" : isFr ? "Cause de la révélation" : "Reason of Revelation",
      isAr ? "تأمل اليوم" : isFr ? "Réflexion du jour" : "Daily Reflection",
      isAr ? "لخّص السورة" : isFr ? "Résumer la sourate" : "Summarize Surah",
    ],
    [isAr, isFr],
  );

  const sources: SourceCard[] = useMemo(
    () => [
      {
        id: "ibn-kathir",
        source: "Tafsir Ibn Kathir",
        surah: isAr ? "سورة يس" : isFr ? "Sourate Yaseen" : "Surah Yaseen",
        ayah: "36:2",
        volume: isAr ? "المجلد ٦" : isFr ? "Volume 6" : "Volume 6",
        page: isAr ? "صفحة ٢١٨" : isFr ? "Page 218" : "Page 218",
        book: isAr ? "تفسير القرآن العظيم" : isFr ? "Tafsir al-Qur'an al-'Azim" : "Tafsir al-Qur'an al-'Azim",
        excerpt: isAr
          ? "يقسم الله تعالى بالقرآن الحكيم، أي المتقن ألفاظًا ومعاني، الدال على صدق الرسالة وكمال الحكمة."
          : isFr
            ? "Allah jure par le Coran plein de sagesse, parfait dans ses mots et ses sens, preuve de la véracité du message."
            : "Allah swears by the Wise Qur'an, perfect in wording and meaning, as proof of the truth of the message.",
      },
      {
        id: "tabari",
        source: "Tafsir Al-Tabari",
        surah: isAr ? "سورة يس" : isFr ? "Sourate Yaseen" : "Surah Yaseen",
        ayah: "36:2",
        volume: isAr ? "المجلد ٢٠" : isFr ? "Volume 20" : "Volume 20",
        page: isAr ? "صفحة ٥٠" : isFr ? "Page 50" : "Page 50",
        book: isAr ? "جامع البيان" : isFr ? "Jami' al-Bayan" : "Jami' al-Bayan",
        excerpt: isAr
          ? "والمراد بالحكيم: المحكم الذي لا اختلاف فيه، المشتمل على الأمر والنهي والهدى."
          : isFr
            ? "Le terme 'sage' signifie ici parfaitement établi, sans contradiction, contenant ordre, interdiction et guidée."
            : "The Wise means the perfectly established revelation, free of contradiction, containing guidance, commands, and prohibitions.",
      },
      {
        id: "saadi",
        source: "Tafsir Al-Sa'di",
        surah: isAr ? "سورة يس" : isFr ? "Sourate Yaseen" : "Surah Yaseen",
        ayah: "36:2",
        volume: isAr ? "المجلد ١" : isFr ? "Volume 1" : "Volume 1",
        page: isAr ? "صفحة ٦٩١" : isFr ? "Page 691" : "Page 691",
        book: isAr ? "تيسير الكريم الرحمن" : isFr ? "Taysir al-Karim ar-Rahman" : "Taysir al-Karim ar-Rahman",
        excerpt: isAr
          ? "من حكمته أنه يشتمل على العلوم النافعة والأوامر الحسنة والنواهي عن كل ما يضر."
          : isFr
            ? "Sa sagesse se manifeste dans les sciences utiles, les commandements nobles et l'interdiction de tout ce qui nuit."
            : "Its wisdom appears in beneficial knowledge, noble commands, and forbidding all that harms.",
      },
      {
        id: "qurtubi",
        source: "Tafsir Al-Qurtubi",
        surah: isAr ? "سورة يس" : isFr ? "Sourate Yaseen" : "Surah Yaseen",
        ayah: "36:2",
        volume: isAr ? "المجلد ١٥" : isFr ? "Volume 15" : "Volume 15",
        page: isAr ? "صفحة ٢" : isFr ? "Page 2" : "Page 2",
        book: isAr ? "الجامع لأحكام القرآن" : isFr ? "Al-Jami' li Ahkam al-Qur'an" : "Al-Jami' li Ahkam al-Qur'an",
        excerpt: isAr
          ? "الحكيم هنا قيل: ذو الحكمة، وقيل: المحكم الذي أُحكمت آياته وفُصلت معانيه."
          : isFr
            ? "Le terme 'sage' désigne soit le détenteur de sagesse, soit ce dont les versets sont parfaitement affermis et détaillés."
            : "The term Wise here refers either to possessing wisdom or to having verses perfected and meanings clarified.",
      },
    ],
    [isAr, isFr],
  );

  return (
    <div className="h-full w-full bg-mesh relative overflow-hidden flex flex-col" dir={isAr ? "rtl" : "ltr"}>
      <StatusBar />

      <div className="flex-1 overflow-y-auto phone-scroll pb-28">
        {/* Header */}
        <div className="px-5 pt-10 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="w-10 h-10 rounded-2xl glass flex items-center justify-center shrink-0">
              <Icon name="arrow_back" size={20} className="text-slate-700" />
            </button>
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-400/20 blur-2xl rounded-full" />
              <div className="relative w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center">
                <Owl size={34} mood="wise" />
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900">
                THABBIT Companion <span className="text-gold-gradient">✨</span>
              </div>
              <div className="text-[11px] text-slate-500">
                {isAr
                  ? "اسأل عن القرآن والتفسير"
                  : isFr
                    ? "Posez vos questions sur le Coran et le Tafsir"
                    : "Ask anything about the Quran & Tafsir"}
              </div>
            </div>
          </div>
          <button className="w-10 h-10 rounded-2xl glass flex items-center justify-center">
            <Icon name="tune" size={20} className="text-slate-700" />
          </button>
        </div>

        {/* Empty / welcome state */}
        <div className="mx-5 mt-6 rounded-[28px] bg-white border border-slate-100 shadow-sm p-6 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-emerald-50" />
          <div className="relative flex flex-col items-center">
            <Owl size={98} mood="happy" className="floaty" />
            <div className="mt-4 text-xl font-bold text-slate-900 font-arabic leading-snug">
              السلام عليكم 🌿
            </div>
            <p className="mt-2 text-sm text-slate-500 max-w-[260px] leading-relaxed">
              {isAr
                ? "كيف يمكنني مساعدتك في فهم القرآن اليوم؟"
                : isFr
                  ? "Comment puis-je vous aider à comprendre le Coran aujourd'hui ?"
                  : "How can I help you understand the Quran today?"}
            </p>
          </div>
        </div>

        {/* Suggestion chips */}
        <div className="mx-5 mt-4">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((chip) => (
              <button
                key={chip}
                className="px-3.5 h-9 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 shadow-sm"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation area */}
        <div className="mx-5 mt-5 space-y-4">
          {/* User bubble */}
          <div className="flex justify-end">
            <div className="max-w-[82%] rounded-[24px] rounded-br-[8px] bg-brand-gradient text-white px-4 py-3 shadow-md shadow-emerald-600/20">
              <div className="text-sm font-medium">
                {isAr
                  ? "اشرح لي معنى قوله تعالى: ﴿وَالْقُرْآنِ الْحَكِيمِ﴾"
                  : isFr
                    ? "Explique-moi le sens de : وَالْقُرْآنِ الْحَكِيمِ"
                    : "Explain the meaning of: وَالْقُرْآنِ الْحَكِيمِ"}
              </div>
              <div className="mt-1 text-[10px] text-white/75">09:41</div>
            </div>
          </div>

          {/* Assistant bubble/card */}
          <div className="rounded-[28px] bg-white border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 pt-5 pb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <Owl size={28} mood="wise" animated={false} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-900">THABBIT Companion</div>
                  <div className="mt-2 text-sm text-slate-700 leading-relaxed font-arabic" dir="rtl">
                    {isAr
                      ? "الآية تشير إلى عظمة القرآن وكمال حكمته. وصف القرآن بالحكيم يدل على إحكام ألفاظه، وصدق معانيه، وأنه مشتمل على الهدى والرحمة والأحكام النافعة للناس."
                      : isFr
                        ? "Ce verset met en évidence la grandeur du Coran et la perfection de sa sagesse. Le qualificatif « sage » indique la précision de ses mots, la véracité de ses sens et la guidance qu'il contient."
                        : "This verse highlights the greatness of the Qur'an and the perfection of its wisdom. Describing the Qur'an as Wise points to the precision of its wording, the truthfulness of its meanings, and the guidance it contains."}
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400">09:42</div>
                </div>
              </div>
            </div>

            {/* Trusted Sources */}
            <div className="px-5 pb-4">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                {isAr ? "المصادر الموثوقة" : isFr ? "Sources fiables" : "Trusted Sources"}
              </div>
              <div className="space-y-2">
                {sources.map((source) => {
                  const expanded = expandedSource === source.id;
                  return (
                    <div key={source.id} className="rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden">
                      <button
                        onClick={() => setExpandedSource(expanded ? null : source.id)}
                        className="w-full flex items-center justify-between px-4 py-3 text-start"
                      >
                        <div className="flex items-center gap-2">
                          <Icon name="menu_book" size={16} className="text-emerald-700" />
                          <span className="text-sm font-semibold text-slate-800">{source.source}</span>
                        </div>
                        <Icon name={expanded ? "expand_less" : "expand_more"} size={18} className="text-slate-500" />
                      </button>
                      {expanded && (
                        <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed">
                          <div className="font-arabic text-slate-700" dir="rtl">{source.excerpt}</div>
                          <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] text-slate-500">
                            <ReferencePill label={isAr ? "سورة" : isFr ? "Sourate" : "Surah"} value={source.surah} />
                            <ReferencePill label={isAr ? "آية" : isFr ? "Verset" : "Ayah"} value={source.ayah} />
                            <ReferencePill label={isAr ? "مجلد" : isFr ? "Volume" : "Volume"} value={source.volume} />
                            <ReferencePill label={isAr ? "صفحة" : isFr ? "Page" : "Page"} value={source.page} />
                            <ReferencePill label={isAr ? "كتاب" : isFr ? "Livre" : "Book"} value={source.book} wide />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick actions */}
            <div className="px-5 pb-4">
              <div className="flex flex-wrap gap-2">
                <ActionChip icon="content_copy" label={copyLabel} />
                <ActionChip icon="share" label={shareLabel} />
                <ActionChip icon="bookmark_border" label={bookmarkLabel} />
                <ActionChip icon="thumb_up" label={likeLabel} />
                <ActionChip icon="thumb_down" label={dislikeLabel} />
                <ActionChip icon="flag" label={reportLabel} />
              </div>
            </div>
          </div>
        </div>

        {/* Tafsir Mode */}
        <div className="mx-5 mt-6 rounded-[28px] bg-white border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 pt-5 pb-4 flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-slate-900">
                {isAr ? "وضع التفسير" : isFr ? "Mode Tafsir" : "Tafsir Mode"}
              </div>
              <div className="text-[11px] text-slate-500">
                {isAr ? "عند البحث عن آية" : isFr ? "Lors de la recherche d'un verset" : "When searching a verse"}
              </div>
            </div>
            <button
              onClick={() => setShowTafsirMode(!showTafsirMode)}
              className={`w-11 h-6 rounded-full relative ${showTafsirMode ? "bg-brand-gradient" : "bg-slate-200"}`}
            >
              <span className={`absolute top-0.5 ${showTafsirMode ? (isAr ? "left-0.5" : "right-0.5") : (isAr ? "right-0.5" : "left-0.5")} w-5 h-5 bg-white rounded-full shadow-sm transition`} />
            </button>
          </div>

          {showTafsirMode && (
            <div className="px-5 pb-5">
              {/* Verse card */}
              <div className="rounded-[24px] bg-brand-soft p-4 border border-emerald-100">
                <div className="text-[10px] uppercase tracking-widest text-emerald-700 font-semibold mb-2">
                  {isAr ? "الآية المختارة" : isFr ? "Verset sélectionné" : "Selected Verse"}
                </div>
                <div className="font-quran text-[22px] text-right leading-loose text-slate-900" dir="rtl">
                  وَالْقُرْآنِ الْحَكِيمِ
                </div>
              </div>

              {/* Sources counter */}
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm font-bold text-slate-900">
                  {isAr ? "٤ مصادر" : isFr ? "4 sources" : "4 Sources"}
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold">
                  {isAr ? "موثقة" : isFr ? "Authentifiées" : "Verified"}
                </div>
              </div>

              {/* Filter chips */}
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  isAr ? "الكل" : isFr ? "Tous" : "All",
                  "Ibn Kathir",
                  "Al-Tabari",
                  "Al-Sa'di",
                  "Al-Qurtubi",
                ].map((chip, i) => (
                  <button
                    key={chip}
                    className={`px-3.5 h-8 rounded-full text-[11px] font-semibold ${i === 0 ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Scrollable tafsir cards */}
              <div className="mt-4 space-y-3">
                {sources.map((source) => (
                  <div key={`tafsir-${source.id}`} className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-bold text-slate-900">{source.source}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{source.surah} · {source.ayah}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <MiniIconButton icon="bookmark_border" />
                        <MiniIconButton icon="content_copy" />
                        <MiniIconButton icon="share" />
                        <MiniIconButton icon="expand_more" />
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-slate-700 leading-relaxed font-arabic" dir="rtl">
                      {source.excerpt}
                    </div>
                    <div className="mt-3 text-[10px] text-slate-500">
                      {isAr ? "مرجع" : isFr ? "Référence" : "Reference"}: {source.book} · {source.volume} · {source.page}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating chat input */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-2 z-40 bg-gradient-to-t from-[#fafafa] via-[#fafafa]/95 to-transparent">
        <div className="rounded-[26px] glass shadow-xl shadow-slate-900/10 border border-white/60 p-3 flex items-center gap-2">
          <button className="w-10 h-10 rounded-2xl bg-slate-100/80 flex items-center justify-center opacity-60 cursor-not-allowed">
            <Icon name="attach_file" size={18} className="text-slate-500" />
          </button>
          <div className="flex-1 h-10 rounded-2xl bg-white/80 border border-slate-100 px-4 flex items-center text-sm text-slate-400">
            {isAr
              ? "اكتب سؤالك عن القرآن أو التفسير..."
              : isFr
                ? "Écrivez votre question sur le Coran ou le Tafsir..."
                : "Ask about the Quran or Tafsir..."}
          </div>
          <button className="w-10 h-10 rounded-2xl bg-slate-100/80 flex items-center justify-center opacity-60 cursor-not-allowed">
            <Icon name="mic" size={18} className="text-slate-500" />
          </button>
          <button className="w-10 h-10 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-lg shadow-emerald-600/25">
            <Icon name="arrow_forward" size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ActionChip({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="h-8 px-3 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold flex items-center gap-1.5">
      <Icon name={icon} size={14} />
      {label}
    </button>
  );
}

function ReferencePill({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <button className={`rounded-xl bg-white border border-slate-200 px-3 py-2 text-start ${wide ? "col-span-2" : ""}`}>
      <div className="text-[9px] text-slate-400 uppercase tracking-widest">{label}</div>
      <div className="text-[11px] font-semibold text-slate-700 mt-0.5">{value}</div>
    </button>
  );
}

function MiniIconButton({ icon }: { icon: string }) {
  return (
    <button className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
      <Icon name={icon} size={15} className="text-slate-500" />
    </button>
  );
}
