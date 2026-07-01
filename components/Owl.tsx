import { useEffect, useState } from "react";

export type Mood =
  | "correct"
  | "celebrate"
  | "remind"
  | "wrong"
  | "listen"
  | "thinking"
  | "listening"
  | "happy"
  | "wise"
  | "idle";

type Props = {
  mood?: Mood;
  size?: number;
  className?: string;
  animated?: boolean;
};

// Cute round green owl matching the uploaded sprite sheet style
// 9 emotional states: صحيح · ما شاء الله · تذكير لطيف · خطأ · إستماع · يفكر · يستمع · سعيد · حكيم
export function Owl({ mood = "idle", size = 120, className = "", animated = true }: Props) {
  const [blink, setBlink] = useState(false);
  const [float, setFloat] = useState(0);

  useEffect(() => {
    if (!animated) return;
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 3200);
    return () => clearInterval(blinkInterval);
  }, [animated]);

  useEffect(() => {
    if (!animated) return;
    const floatInterval = setInterval(() => {
      setFloat((f) => (f === 0 ? 1 : 0));
    }, 1600);
    return () => clearInterval(floatInterval);
  }, [animated]);

  const uid = `owl${Math.random().toString(36).slice(2, 8)}`;
  const bodyGrad = `body-${uid}`;
  const bellyGrad = `belly-${uid}`;
  const hatGrad = `hat-${uid}`;
  const shadowGrad = `shadow-${uid}`;

  // Animation class mapping
  const animClass = (() => {
    if (!animated) return "";
    switch (mood) {
      case "correct":
      case "celebrate":
      case "happy":
        return "animate-[bounce_0.6s_ease]";
      case "wrong":
        return "animate-[shake_0.45s_ease]";
      case "thinking":
        return "animate-[sway_2s_ease-in-out_infinite]";
      case "listen":
      case "listening":
        return "animate-[pulse_1.5s_ease-in-out_infinite]";
      default:
        return float === 1 ? "translate-y-[-3px]" : "";
    }
  })();

  return (
    <div className={`inline-block ${animClass} ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id={bodyGrad} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <linearGradient id={bellyGrad} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e0f7ef" />
            <stop offset="100%" stopColor="#b7ebd6" />
          </linearGradient>
          <linearGradient id={hatGrad} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#d4af37" />
          </linearGradient>
          <radialGradient id={shadowGrad} cx="0.5" cy="0.85" r="0.5">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`cheek-${uid}`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#fb7185" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="100" cy="188" rx="52" ry="7" fill={`url(#${shadowGrad})`} />

        {/* Body – round green */}
        <circle cx="100" cy="105" r="72" fill={`url(#${bodyGrad})`} />

        {/* Belly */}
        <ellipse cx="100" cy="130" rx="48" ry="44" fill={`url(#${bellyGrad})`} />

        {/* Eyes – big white circles with gold frames */}
        <circle cx="76" cy="90" r="24" fill="#fefce8" stroke="#d4af37" strokeWidth="3" />
        <circle cx="124" cy="90" r="24" fill="#fefce8" stroke="#d4af37" strokeWidth="3" />

        {/* Pupils – expression-dependent */}
        {blink ? (
          <>
            <line x1="64" y1="90" x2="88" y2="90" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            <line x1="112" y1="90" x2="136" y2="90" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : mood === "correct" || mood === "celebrate" || mood === "happy" ? (
          <>
            <path d="M64 88 q12 -14 24 0" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M112 88 q12 -14 24 0" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            {mood === "celebrate" && (
              <>
                <circle cx="60" cy="62" r="3" fill="#fde68a" />
                <circle cx="140" cy="58" r="2.5" fill="#fde68a" />
                <circle cx="80" cy="56" r="2" fill="#fb7185" />
                <circle cx="120" cy="54" r="2" fill="#fb7185" />
              </>
            )}
          </>
        ) : mood === "wrong" ? (
          <>
            <circle cx="78" cy="92" r="7" fill="#0f172a" />
            <circle cx="122" cy="92" r="7" fill="#0f172a" />
            <circle cx="80" cy="90" r="2.5" fill="#fff" />
            <circle cx="124" cy="90" r="2.5" fill="#fff" />
            <path d="M62 72 q10 -6 20 0" stroke="#0f172a" strokeWidth="2.5" fill="none" />
            <path d="M118 72 q10 -6 20 0" stroke="#0f172a" strokeWidth="2.5" fill="none" />
          </>
        ) : mood === "thinking" ? (
          <>
            <circle cx="74" cy="86" r="7" fill="#0f172a" />
            <circle cx="118" cy="86" r="7" fill="#0f172a" />
            <circle cx="76" cy="84" r="2.5" fill="#fff" />
            <circle cx="120" cy="84" r="2.5" fill="#fff" />
          </>
        ) : mood === "listen" || mood === "listening" ? (
          <>
            <path d="M64 88 q12 10 24 0" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M112 88 q12 10 24 0" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        ) : mood === "wise" ? (
          <>
            <circle cx="78" cy="88" r="9" fill="#0f172a" />
            <circle cx="122" cy="88" r="9" fill="#0f172a" />
            <circle cx="81" cy="85" r="3" fill="#fff" />
            <circle cx="125" cy="85" r="3" fill="#fff" />
          </>
        ) : mood === "remind" ? (
          <>
            <circle cx="78" cy="88" r="8" fill="#0f172a" />
            <circle cx="122" cy="88" r="8" fill="#0f172a" />
            <circle cx="80" cy="85" r="2.5" fill="#fff" />
            <circle cx="124" cy="85" r="2.5" fill="#fff" />
          </>
        ) : (
          <>
            <circle cx="78" cy="90" r="8" fill="#0f172a" />
            <circle cx="122" cy="90" r="8" fill="#0f172a" />
            <circle cx="81" cy="87" r="2.5" fill="#fff" />
            <circle cx="125" cy="87" r="2.5" fill="#fff" />
          </>
        )}

        {/* Cheeks (blush) */}
        <circle cx="58" cy="112" r="10" fill={`url(#cheek-${uid})`} />
        <circle cx="142" cy="112" r="10" fill={`url(#cheek-${uid})`} />

        {/* Beak */}
        <path d="M96 106 l4 7 l4 -7 z" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5" />

        {/* Mouth */}
        {mood === "wrong" ? (
          <path d="M92 116 q8 -5 16 0" stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round" />
        ) : mood === "celebrate" || mood === "happy" ? (
          <path d="M92 114 q8 7 16 0" stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round" />
        ) : mood === "remind" ? (
          <ellipse cx="100" cy="115" rx="5" ry="4" fill="#0f172a" opacity="0.15" />
        ) : null}

        {/* Feet */}
        <rect x="84" y="172" width="6" height="12" rx="3" fill="#d4af37" />
        <rect x="110" y="172" width="6" height="12" rx="3" fill="#d4af37" />

        {/* Golden lamp / tawbah on head */}
        <g transform="translate(100, 28)">
          <ellipse cx="0" cy="0" rx="18" ry="6" fill={`url(#${hatGrad})`} stroke="#b45309" strokeWidth="1" />
          <rect x="-4" y="-12" width="8" height="12" rx="2" fill="#d4af37" stroke="#b45309" strokeWidth="0.5" />
          <circle cx="0" cy="-14" r="3" fill="#fde68a" stroke="#b45309" strokeWidth="1" />
          <path d="M0 -11 q8 8 10 18" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="10" cy="18" r="3.5" fill="#16a34a" />
        </g>

        {/* ===== STATE-SPECIFIC ELEMENTS ===== */}

        {/* Correct: thumbs up + green check badge */}
        {mood === "correct" && (
          <g>
            <circle cx="30" cy="40" r="18" fill="#22c55e" stroke="#16a34a" strokeWidth="1.5" />
            <path d="M22 40 l6 6 l10 -10" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M38 100 Q20 90 18 72" stroke="#16a34a" strokeWidth="8" fill="none" strokeLinecap="round" />
            <rect x="12" y="64" width="14" height="20" rx="7" fill="#16a34a" stroke="#15803d" strokeWidth="0.5" />
          </g>
        )}

        {/* Celebrate: hearts + sparkles */}
        {mood === "celebrate" && (
          <g>
            <text x="38" y="52" fill="#fb7185" fontSize="14">♥</text>
            <text x="152" y="48" fill="#fb7185" fontSize="12">♥</text>
            <text x="28" y="80" fill="#fde68a" fontSize="10">✦</text>
            <text x="162" y="75" fill="#fde68a" fontSize="10">✦</text>
          </g>
        )}

        {/* Remind: pointing finger + heart card */}
        {mood === "remind" && (
          <g>
            <path d="M40 80 Q28 65 30 50" stroke="#16a34a" strokeWidth="7" fill="none" strokeLinecap="round" />
            <rect x="140" y="100" width="30" height="36" rx="4" fill="#fefce8" stroke="#d4af37" strokeWidth="1.5" />
            <text x="155" y="126" textAnchor="middle" fill="#fb7185" fontSize="18">♥</text>
          </g>
        )}

        {/* Wrong: red X badge + crossed arms */}
        {mood === "wrong" && (
          <g>
            <circle cx="30" cy="40" r="18" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5" />
            <path d="M22 32 l16 16 M38 32 l-16 16" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M55 130 Q70 140 85 130" stroke="#16a34a" strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M145 130 Q130 140 115 130" stroke="#16a34a" strokeWidth="7" fill="none" strokeLinecap="round" />
          </g>
        )}

        {/* Listen: headphones + sound waves */}
        {mood === "listen" && (
          <g>
            <path d="M50 78 Q50 50 100 42 Q150 50 150 78" stroke="#d4af37" strokeWidth="5" fill="none" />
            <rect x="38" y="74" width="18" height="28" rx="9" fill="#d4af37" stroke="#b45309" strokeWidth="1" />
            <rect x="144" y="74" width="18" height="28" rx="9" fill="#d4af37" stroke="#b45309" strokeWidth="1" />
            <path d="M30 88 Q24 88 22 82" stroke="#22c55e" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
            <path d="M24 92 Q16 92 14 86" stroke="#22c55e" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.4" />
            <path d="M170 88 Q176 88 178 82" stroke="#22c55e" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
            <path d="M176 92 Q184 92 186 86" stroke="#22c55e" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.4" />
          </g>
        )}

        {/* Thinking: hand on chin + lightbulb bubble */}
        {mood === "thinking" && (
          <g>
            <path d="M55 115 Q48 105 52 95" stroke="#16a34a" strokeWidth="7" fill="none" strokeLinecap="round" />
            <circle cx="52" cy="93" r="7" fill="#16a34a" />
            <circle cx="170" cy="50" r="18" fill="#fefce8" stroke="#d4af37" strokeWidth="1.5" />
            <text x="170" y="56" textAnchor="middle" fill="#f59e0b" fontSize="16">💡</text>
            <circle cx="155" cy="66" r="5" fill="#fefce8" stroke="#d4af37" strokeWidth="1" />
            <circle cx="148" cy="78" r="3" fill="#fefce8" stroke="#d4af37" strokeWidth="0.8" />
          </g>
        )}

        {/* Listening: hand to ear + waves */}
        {mood === "listening" && (
          <g>
            <path d="M148 100 Q160 90 155 78" stroke="#16a34a" strokeWidth="7" fill="none" strokeLinecap="round" />
            <circle cx="155" cy="76" r="7" fill="#16a34a" />
            <path d="M172 90 Q178 90 180 84" stroke="#22c55e" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
            <path d="M178 94 Q186 94 188 88" stroke="#22c55e" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.4" />
          </g>
        )}

        {/* Happy: arms out + sparkles */}
        {mood === "happy" && (
          <g>
            <path d="M38 110 Q20 100 18 85" stroke="#16a34a" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M162 110 Q180 100 182 85" stroke="#16a34a" strokeWidth="8" fill="none" strokeLinecap="round" />
            <text x="24" y="70" fill="#fde68a" fontSize="12">✦</text>
            <text x="172" y="68" fill="#fde68a" fontSize="12">✦</text>
            <text x="40" y="50" fill="#fde68a" fontSize="8">✦</text>
          </g>
        )}

        {/* Wise: pointing + open book */}
        {mood === "wise" && (
          <g>
            <path d="M42 78 Q30 65 32 50" stroke="#16a34a" strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M130 120 Q150 115 170 120 L170 155 Q150 150 130 155 Z" fill="#22c55e" stroke="#16a34a" strokeWidth="1.5" />
            <path d="M170 120 Q190 115 210 120 L210 155 Q190 150 170 155 Z" fill="#22c55e" stroke="#16a34a" strokeWidth="1.5" />
            <line x1="170" y1="118" x2="170" y2="157" stroke="#16a34a" strokeWidth="1.5" />
            <line x1="138" y1="132" x2="162" y2="130" stroke="#b7ebd6" strokeWidth="1" />
            <line x1="138" y1="140" x2="162" y2="138" stroke="#b7ebd6" strokeWidth="1" />
            <line x1="178" y1="130" x2="202" y2="132" stroke="#b7ebd6" strokeWidth="1" />
            <line x1="178" y1="138" x2="202" y2="140" stroke="#b7ebd6" strokeWidth="1" />
          </g>
        )}
      </svg>
    </div>
  );
}
