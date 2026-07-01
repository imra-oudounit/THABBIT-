import { useState, useEffect } from "react";
import { Icon } from "../../components/Icon";
import { Owl } from "../../components/Owl";
import { StatusBar } from "../../components/Phone";
import {
  loginWithGoogle,
  loginWithEmail,
  signInAsGuest,
  sendOTP,
  registerWithEmail,
  sendPasswordReset,
} from "../../services/authService";

export type AuthView = "welcome" | "login" | "register" | "forgot" | "phone-input" | "otp-verify";

function authErrorMessage(error: unknown) {
  const code =
    typeof error === "object" && error && "code" in error
      ? String((error as { code: string }).code)
      : "";
  if (code.includes("popup-closed-by-user")) return "Sign-in was cancelled.";
  if (code.includes("auth/invalid-phone-number")) return "Invalid phone number.";
  if (code.includes("auth/too-many-requests")) return "Too many requests. Try later.";
  if (code.includes("auth/invalid-verification-code")) return "Invalid verification code.";
  if (code.includes("auth/code-expired")) return "Code expired. Resend it.";
  if (code.includes("auth/email-already-in-use")) return "This email is already registered.";
  if (code.includes("auth/wrong-password") || code.includes("auth/invalid-credential")) return "Email or password is incorrect.";
  if (code.includes("auth/user-not-found")) return "No account found with this email.";
  if (code.includes("auth/weak-password")) return "Password must be at least 6 characters.";
  if (code.includes("auth/missing-email")) return "Please enter your email address.";
  if (code.includes("auth/invalid-email")) return "Please enter a valid email address.";
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}

function PrimaryButton({
  children, loading, onClick, type = "button", disabled,
}: {
  children: React.ReactNode; loading?: boolean; onClick?: () => void;
  type?: "button" | "submit"; disabled?: boolean;
}) {
  return (
    <button type={type} onClick={onClick} disabled={disabled || loading}
      className="w-full h-14 rounded-2xl bg-brand-gradient text-white font-semibold shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 active:scale-[0.98] transition disabled:opacity-70 cursor-pointer">
      {loading ? <span className="w-5 h-5 rounded-full border-2 border-white/40 border-t-white animate-spin" /> : children}
    </button>
  );
}

function Field({ label, icon, type = "text", value, onChange, placeholder }: {
  label: string; icon: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-500 ml-1">{label}</span>
      <span className="mt-1.5 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center px-4 gap-3 focus-within:border-emerald-200 focus-within:ring-2 focus-within:ring-emerald-100 transition">
        <Icon name={icon} className="text-slate-400" size={20} />
        <input className="min-w-0 flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
          type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
      </span>
    </label>
  );
}

// ─── Welcome Screen ──────────────────────────────────────────────────
export function WelcomeAuthScreen({ onNavigate }: { onNavigate: (v: AuthView) => void; configured?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGoogle() {
    setLoading(true); setError("");
    try { await loginWithGoogle(); } catch (e) { setError(authErrorMessage(e)); } finally { setLoading(false); }
  }
  async function handleGuest() {
    setLoading(true); setError("");
    try { await signInAsGuest(); } catch (e) { setError(authErrorMessage(e)); } finally { setLoading(false); }
  }

  return (
    <div className="h-full w-full bg-mesh relative flex flex-col justify-between overflow-hidden">
      <StatusBar />
      <div className="px-6 pt-12 text-center flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-400/10 blur-3xl rounded-full" />
          <Owl size={130} className="relative floaty" mood="happy" />
        </div>
        <h1 className="mt-4 text-3xl font-display font-bold tracking-wide text-slate-900">Thabbit</h1>
        <p className="mt-2 text-sm font-semibold text-emerald-800 font-arabic leading-snug">رفيقك اليومي لحفظ القرآن ومراجعته.</p>
        <p className="mt-1 text-xs text-slate-500 font-display leading-relaxed">Your Daily Companion for Quran Memorization and Review.</p>
      </div>
      <div className="px-6 pb-8 space-y-3">
        {error && <div className="rounded-2xl bg-rose-50 border border-rose-100 p-3 text-xs text-rose-700 text-center">{error}</div>}
        <PrimaryButton onClick={() => onNavigate("login")}>Sign In <Icon name="arrow_forward" size={20} /></PrimaryButton>
        <button onClick={() => onNavigate("register")} className="w-full h-14 rounded-2xl bg-white border border-slate-100 text-slate-900 font-semibold shadow-sm active:scale-[0.98] transition cursor-pointer">
          Create Account
        </button>
        <div className="flex items-center gap-3 pt-1">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-[10px] uppercase tracking-widest text-slate-400">or continue with</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <button onClick={handleGoogle} disabled={loading} className="h-14 rounded-2xl neu flex items-center justify-center cursor-pointer disabled:opacity-70">
            <span className="text-lg font-bold">G</span>
          </button>
          <button onClick={() => onNavigate("phone-input")} className="h-14 rounded-2xl neu flex items-center justify-center cursor-pointer">
            <Icon name="phone" className="text-emerald-700" size={22} />
          </button>
          <button onClick={handleGuest} disabled={loading} className="h-14 rounded-2xl neu flex items-center justify-center cursor-pointer disabled:opacity-70">
            <Icon name="person_outline" className="text-slate-600" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sign In Screen ──────────────────────────────────────────────────
export function SignInAuthScreen({ onNavigate }: { onNavigate: (v: AuthView) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGoogle() {
    setLoading(true); setError("");
    try { await loginWithGoogle(); } catch (e) { setError(authErrorMessage(e)); } finally { setLoading(false); }
  }
  async function handleGuest() {
    setLoading(true); setError("");
    try { await signInAsGuest(); } catch (e) { setError(authErrorMessage(e)); } finally { setLoading(false); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) { setError("Please fill in all fields."); return; }
    setLoading(true); setError("");
    try {
      await loginWithEmail(email, password);
      // onAuthStateChanged handles navigation
    } catch (err) { setError(authErrorMessage(err)); } finally { setLoading(false); }
  }

  return (
    <div className="h-full w-full bg-mesh relative overflow-y-auto phone-scroll">
      <StatusBar />
      <div className="px-7 pt-10">
        <button onClick={() => onNavigate("welcome")} className="w-11 h-11 rounded-2xl glass flex items-center justify-center cursor-pointer">
          <Icon name="arrow_back" className="text-slate-700" size={20} />
        </button>
      </div>
      <div className="px-7 mt-6 flex items-center gap-3">
        <Owl size={48} />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-xs text-slate-500">Sign in to continue your journey</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="px-7 mt-8 space-y-4">
        {error && <div className="rounded-2xl bg-rose-50 border border-rose-100 p-3 text-xs text-rose-700 text-center">{error}</div>}
        <div>
          <label className="text-xs font-semibold text-slate-500 ml-1">Email</label>
          <div className="mt-1.5 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center px-4 focus-within:border-emerald-200 focus-within:ring-2 focus-within:ring-emerald-100 transition">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="yusuf@thabbit.app"
              className="min-w-0 flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400" autoComplete="email" />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 ml-1">Password</label>
          <div className="mt-1.5 h-14 rounded-2xl bg-white shadow-sm border border-emerald-200 ring-2 ring-emerald-100 flex items-center px-4">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
              className="min-w-0 flex-1 bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400" autoComplete="current-password" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button type="button" onClick={() => setRemember(!remember)} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
            <span className={`w-5 h-5 rounded-md flex items-center justify-center ${remember ? "bg-brand-gradient" : "bg-slate-200"}`}>
              {remember && <Icon name="check" className="text-white" size={14} />}
            </span>
            Remember me
          </button>
          <button type="button" onClick={() => onNavigate("forgot")} className="text-xs font-semibold text-emerald-700 cursor-pointer">Forgot?</button>
        </div>
        <PrimaryButton type="submit" loading={loading}>Sign In <Icon name="arrow_forward" size={20} /></PrimaryButton>
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-[10px] uppercase tracking-widest text-slate-400">or continue with</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <button type="button" onClick={handleGuest} className="h-14 rounded-2xl neu flex items-center justify-center cursor-pointer">
            <Icon name="fingerprint" className="text-emerald-700" size={26} />
          </button>
          <button type="button" onClick={handleGoogle} disabled={loading} className="h-14 rounded-2xl neu flex items-center justify-center cursor-pointer disabled:opacity-70">
            <span className="text-lg font-bold">G</span>
          </button>
          <button type="button" onClick={() => onNavigate("phone-input")} className="h-14 rounded-2xl neu flex items-center justify-center cursor-pointer">
            <Icon name="phone" className="text-slate-600" size={22} />
          </button>
        </div>
        <p className="text-center text-xs text-slate-500 pt-3 pb-6">
          New to Thabbit? <button type="button" onClick={() => onNavigate("register")} className="font-semibold text-emerald-700 cursor-pointer">Create account</button>
        </p>
      </form>
    </div>
  );
}

// ─── Register Screen ─────────────────────────────────────────────────
export function RegisterAuthScreen({ onNavigate }: { onNavigate: (v: AuthView) => void }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim()) { setError("Please enter your name."); return; }
    if (!email.trim()) { setError("Please enter your email."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirmPw) { setError("Passwords do not match."); return; }
    setLoading(true); setError(""); setSuccess("");
    try {
      await registerWithEmail(fullName, email, password);
      setSuccess("Account created! A verification email has been sent to " + email + ". Please check your inbox.");
      // onAuthStateChanged will auto-login the user
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-full w-full bg-mesh relative overflow-y-auto phone-scroll">
      <StatusBar />
      <div className="px-7 pt-10">
        <button onClick={() => onNavigate("welcome")} className="w-11 h-11 rounded-2xl glass flex items-center justify-center cursor-pointer">
          <Icon name="arrow_back" className="text-slate-700" size={20} />
        </button>
      </div>
      <div className="px-7 mt-6">
        <h1 className="text-2xl font-bold text-slate-900">Create account</h1>
        <p className="text-xs text-slate-500 mt-1">Start your memorization journey with Thabbit.</p>
      </div>
      <form onSubmit={handleSubmit} className="px-7 mt-6 space-y-3.5 pb-8">
        {success && <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-3 text-xs text-emerald-700 text-center">{success}</div>}
        {error && <div className="rounded-2xl bg-rose-50 border border-rose-100 p-3 text-xs text-rose-700 text-center">{error}</div>}
        <Field label="Full Name" icon="person" value={fullName} onChange={setFullName} placeholder="Yusuf Rahman" />
        <Field label="Email" icon="mail" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
        <Field label="Password" icon="lock" value={password} onChange={setPassword} placeholder="At least 6 characters" type="password" />
        <Field label="Confirm Password" icon="lock_reset" value={confirmPw} onChange={setConfirmPw} placeholder="Repeat password" type="password" />
        <PrimaryButton type="submit" loading={loading}>Create Account <Icon name="arrow_forward" size={20} /></PrimaryButton>
        <p className="text-center text-xs text-slate-500 pt-2">
          Already have an account? <button type="button" onClick={() => onNavigate("login")} className="font-semibold text-emerald-700 cursor-pointer">Sign in</button>
        </p>
      </form>
    </div>
  );
}

// ─── Forgot Password Screen ─────────────────────────────────────────
export function ForgotPasswordScreen({ onNavigate }: { onNavigate: (v: AuthView) => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) { setError("Please enter your email address."); return; }
    setError(""); setMsg(""); setLoading(true);
    try {
      await sendPasswordReset(email);
      setMsg("Password reset email sent to " + email + ". Check your inbox and spam folder.");
    } catch (err) { setError(authErrorMessage(err)); } finally { setLoading(false); }
  }

  return (
    <div className="h-full w-full bg-mesh relative">
      <StatusBar />
      <div className="px-7 pt-10">
        <button onClick={() => onNavigate("login")} className="w-11 h-11 rounded-2xl glass flex items-center justify-center cursor-pointer">
          <Icon name="arrow_back" className="text-slate-700" size={20} />
        </button>
      </div>
      <div className="px-7 mt-12 text-center">
        <Owl size={92} mood="thinking" />
        <h1 className="mt-5 text-2xl font-bold text-slate-900">Forgot password?</h1>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">Enter your email and we'll send a reset link.</p>
      </div>
      <form onSubmit={handleSubmit} className="px-7 mt-8 space-y-4">
        {msg && <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-3 text-xs text-emerald-700 text-center">{msg}</div>}
        {error && <div className="rounded-2xl bg-rose-50 border border-rose-100 p-3 text-xs text-rose-700 text-center">{error}</div>}
        <Field label="Email" icon="mail" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
        <PrimaryButton type="submit" loading={loading}>Send Reset Link <Icon name="mark_email_read" size={20} /></PrimaryButton>
      </form>
    </div>
  );
}

// ─── Phone Login Screen ──────────────────────────────────────────────
export function PhoneLoginScreen({
  onNavigate, onSetConfirmationResult, onSetPhoneNumber,
}: {
  onNavigate: (v: AuthView) => void; onSetConfirmationResult: (r: any) => void; onSetPhoneNumber: (n: string) => void;
}) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!document.getElementById("recaptcha-container")) {
      const div = document.createElement("div");
      div.id = "recaptcha-container"; div.style.position = "absolute"; div.style.bottom = "0"; div.style.visibility = "hidden";
      document.body.appendChild(div);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phoneNumber.trim()) { setError("Please enter your phone number."); return; }
    setLoading(true); setError("");
    try {
      const formatted = phoneNumber.startsWith("+") ? phoneNumber : `+966${phoneNumber.replace(/^0+/, "")}`;
      const result = await sendOTP(formatted, "recaptcha-container");
      onSetConfirmationResult(result); onSetPhoneNumber(formatted); onNavigate("otp-verify");
    } catch (err) { setError(authErrorMessage(err)); } finally { setLoading(false); }
  }

  return (
    <div className="h-full w-full bg-mesh relative flex flex-col justify-between overflow-hidden">
      <div>
        <StatusBar />
        <div className="px-5 pt-10">
          <button onClick={() => onNavigate("welcome")} className="w-11 h-11 rounded-2xl glass flex items-center justify-center cursor-pointer">
            <Icon name="arrow_back" className="text-slate-700" size={20} />
          </button>
        </div>
        <div className="px-7 mt-6 flex items-center gap-3">
          <Owl size={48} mood="happy" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Phone Sign In</h1>
            <p className="text-xs text-slate-500">Enter your phone number to continue</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="px-7 mt-8 space-y-4">
          {error && <div className="rounded-2xl bg-rose-50 border border-rose-100 p-3 text-xs text-rose-700 text-center">{error}</div>}
          <div>
            <label className="block text-xs font-semibold text-slate-500 ml-1 mb-1">Phone Number</label>
            <div className="h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center px-4 gap-3 focus-within:border-emerald-200 focus-within:ring-2 focus-within:ring-emerald-100 transition" dir="ltr">
              <span className="text-sm font-semibold text-slate-400">+966</span>
              <Icon name="smartphone" className="text-slate-400" size={20} />
              <input type="tel" className="min-w-0 flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                placeholder="5XXXXXXXX" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} autoComplete="tel" />
            </div>
          </div>
          <PrimaryButton type="submit" loading={loading}>Send Code <Icon name="sms" size={20} /></PrimaryButton>
        </form>
      </div>
      <div className="text-center pb-6 text-[10px] text-slate-400 tracking-widest">ثبّت — رفيقك اليومي لحفظ القرآن ومراجعته.</div>
    </div>
  );
}

// ─── OTP Verification Screen ─────────────────────────────────────────
export function OTPVerifyScreen({
  onNavigate, confirmationResult, phoneNumber,
}: {
  onNavigate: (v: AuthView) => void; confirmationResult: any; phoneNumber: string;
}) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 6) { setError("Please enter the 6-digit code."); return; }
    setLoading(true); setError("");
    try { await confirmationResult.confirm(otp); } catch (err) { setError(authErrorMessage(err)); } finally { setLoading(false); }
  }

  return (
    <div className="h-full w-full bg-mesh relative flex flex-col justify-between overflow-hidden">
      <div>
        <StatusBar />
        <div className="px-5 pt-10">
          <button onClick={() => onNavigate("phone-input")} className="w-11 h-11 rounded-2xl glass flex items-center justify-center cursor-pointer">
            <Icon name="arrow_back" className="text-slate-700" size={20} />
          </button>
        </div>
        <div className="px-7 mt-6 flex items-center gap-3">
          <Owl size={48} mood="thinking" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Verification Code</h1>
            <p className="text-xs text-slate-500">Enter the code sent to {phoneNumber}</p>
          </div>
        </div>
        <form onSubmit={handleVerify} className="px-7 mt-8 space-y-4">
          {error && <div className="rounded-2xl bg-rose-50 border border-rose-100 p-3 text-xs text-rose-700 text-center">{error}</div>}
          <div>
            <label className="block text-xs font-semibold text-slate-500 ml-1 mb-1">OTP Code</label>
            <div className="h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center px-4 gap-3 focus-within:border-emerald-200 focus-within:ring-2 focus-within:ring-emerald-100 transition" dir="ltr">
              <Icon name="lock" className="text-slate-400" size={20} />
              <input type="text" maxLength={6} className="min-w-0 flex-1 bg-transparent outline-none text-center font-bold tracking-[0.4em] text-lg text-slate-900 placeholder:text-slate-300"
                placeholder="••••••" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ""))} />
            </div>
          </div>
          <PrimaryButton type="submit" loading={loading}>Verify & Sign In <Icon name="verified" size={20} /></PrimaryButton>
        </form>
      </div>
      <div className="text-center pb-6 text-[10px] text-slate-400 tracking-widest">ثبّت — رفيقك اليومي لحفظ القرآن ومراجعته.</div>
    </div>
  );
}
