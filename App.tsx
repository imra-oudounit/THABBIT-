import { useEffect, useRef, useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LanguageProvider } from "./i18n/LanguageContext";
import { LanguageSelectionScreen } from "./screens/LanguageSelection";
import type { AuthRoute, MainTabRoute, OverlayRoute } from "./core/routing";
import { SplashScreen } from "./screens/Splash";
import { HomeScreen } from "./screens/Home";
import { ProfileScreen } from "./screens/Profile";
import { SettingsScreen } from "./screens/Settings";
import { StatsScreen } from "./screens/Stats";
import { QuranScreen } from "./screens/Quran";
import { ReaderScreen } from "./screens/Reader";
import { PremiumScreen } from "./screens/Premium";
import { AIModeScreen } from "./screens/AIMode";
import { MissionsScreen } from "./screens/Missions";
import { RevisionScreen } from "./screens/Revision";
import { WordByWordScreen } from "./screens/WordByWord";
import { BottomNav } from "./components/BottomNav";
import { OnboardingFlow } from "./screens/auth/OnboardingFlow";
import {
  WelcomeAuthScreen,
  SignInAuthScreen,
  RegisterAuthScreen,
  ForgotPasswordScreen,
  PhoneLoginScreen,
  OTPVerifyScreen,
} from "./screens/auth/AuthScreens";
import { completeOnboarding, hasCompletedOnboarding } from "./utils/onboarding";
import { createOrUpdateUserDocument } from "./services/authService";

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ThabbitEntry />
      </AuthProvider>
    </LanguageProvider>
  );
}

function ThabbitEntry() {
  const { user, loading, configured } = useAuth();
  const [booting, setBooting] = useState(true);
  const [onboardingDone, setOnboardingDone] = useState(() => hasCompletedOnboarding());
  const [onboardingIndex, setOnboardingIndex] = useState(0);
  const [authView, setAuthView] = useState<AuthRoute>("welcome");
  const [langSelected, setLangSelected] = useState(() => localStorage.getItem("thabbit_language_selected") === "true");
  const [activeTab, setActiveTab] = useState<MainTabRoute>("home");
  const [overlay, setOverlay] = useState<OverlayRoute>("none");
  const [readerSurah, setReaderSurah] = useState<any>(null);
  const [readerFullscreen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const scrollStopTimer = useRef<number | null>(null);
  const lastScrollTop = useRef(0);

  // State for phone authentication
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  // Faster splash: check if user is already cached, skip long delay
  useEffect(() => {
    const hasCachedUser = localStorage.getItem("thabbit_profile_cache");
    const splashMs = hasCachedUser ? 400 : 800;
    const timer = window.setTimeout(() => setBooting(false), splashMs);
    return () => window.clearTimeout(timer);
  }, []);

  // Non-blocking Firestore profile sync
  useEffect(() => {
    if (!user) return;
    // Fire-and-forget: don't block UI
    createOrUpdateUserDocument(user).catch(() => undefined);
  }, [user]);

  // Keyboard visibility lock — never hide nav while keyboard is open
  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      const tag = el.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (el as HTMLElement).isContentEditable) {
        setKeyboardVisible(true);
        setNavVisible(true);
      }
    };
    const onFocusOut = () => {
      window.setTimeout(() => setKeyboardVisible(false), 50);
    };
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  // Intelligent nav auto-hide on scroll for non-critical screens only
  useEffect(() => {
    const critical = activeTab === "home" || activeTab === "quran" || activeTab === "ai" || activeTab === "wordbyword" || (overlay === "reader" && !readerFullscreen);
    if (critical || keyboardVisible || overlay === "settings" || overlay === "premium") {
      setNavVisible(overlay !== "settings" && overlay !== "premium");
      return;
    }

    const handler = (event: Event) => {
      if (document.querySelector('[data-nav-lock="true"]')) {
        setNavVisible(true);
        return;
      }
      const target = event.target as HTMLElement | null;
      if (!target || !(target instanceof HTMLElement)) return;
      const currentTop = target.scrollTop;
      const delta = currentTop - lastScrollTop.current;

      if (currentTop <= 8) {
        setNavVisible(true);
      } else if (delta > 4) {
        setNavVisible(false);
      } else if (delta < -4) {
        setNavVisible(true);
      }

      lastScrollTop.current = currentTop;
      if (scrollStopTimer.current) window.clearTimeout(scrollStopTimer.current);
      scrollStopTimer.current = window.setTimeout(() => setNavVisible(true), 220);
    };

    document.addEventListener("scroll", handler, true);
    return () => {
      document.removeEventListener("scroll", handler, true);
      if (scrollStopTimer.current) window.clearTimeout(scrollStopTimer.current);
    };
  }, [activeTab, overlay, keyboardVisible, readerFullscreen]);

  function finishOnboarding() {
    completeOnboarding();
    setOnboardingDone(true);
  }

  const handleNavigate = (tab: string) => {
    if (tab === "settings") { setOverlay("settings"); return; }
    setActiveTab(tab as MainTabRoute);
  };

  if (booting || loading) {
    return <AppSurface><SplashScreen /></AppSurface>;
  }

  if (!langSelected) {
    return (
      <AppSurface>
        <LanguageSelectionScreen onSelect={() => {
          localStorage.setItem("thabbit_language_selected", "true");
          setLangSelected(true);
        }} />
      </AppSurface>
    );
  }

  if (!onboardingDone) {
    return (
      <AppSurface>
        <OnboardingFlow
          index={onboardingIndex}
          onBack={() => setOnboardingIndex((current) => Math.max(0, current - 1))}
          onNext={() => {
            if (onboardingIndex >= 4) finishOnboarding();
            else setOnboardingIndex((current) => current + 1);
          }}
          onSkip={finishOnboarding}
        />
      </AppSurface>
    );
  }

  if (!user) {
    const nav = (v: AuthRoute) => setAuthView(v);
    return (
      <AppSurface>
        {authView === "welcome" && <WelcomeAuthScreen onNavigate={nav} configured={configured} />}
        {authView === "login" && <SignInAuthScreen onNavigate={nav} />}
        {authView === "register" && <RegisterAuthScreen onNavigate={nav} />}
        {authView === "forgot" && <ForgotPasswordScreen onNavigate={nav} />}
        {authView === "phone-input" && (
          <PhoneLoginScreen onNavigate={nav} onSetConfirmationResult={setConfirmationResult} onSetPhoneNumber={setPhoneNumber} />
        )}
        {authView === "otp-verify" && (
          <OTPVerifyScreen onNavigate={nav} confirmationResult={confirmationResult} phoneNumber={phoneNumber} />
        )}
      </AppSurface>
    );
  }

  // Overlay screens (full-screen, no bottom nav)
  if (overlay === "settings") {
    return (
      <AppSurface>
        <SettingsScreen
          onBack={() => setOverlay("none")}
          onOpenPremium={() => setOverlay("premium")}
        />
      </AppSurface>
    );
  }
  if (overlay === "premium") {
    return (
      <AppSurface>
        <PremiumScreen />
      </AppSurface>
    );
  }
  if (overlay === "reader") {
    return (
      <AppSurface>
        <ReaderScreen
          surah={readerSurah}
          onBack={() => setOverlay("none")}
          isFullscreen={readerFullscreen}
        />
      </AppSurface>
    );
  }

  // Bottom Navigation is ONLY visible on the Home hub.
  const isHome = activeTab === "home";
  const finalNavVisible = isHome && navVisible;
  const goHome = () => setActiveTab("home");

  return (
    <AppSurface>
      {activeTab === "home" && (
        <HomeScreen
          onOpenProfile={() => setActiveTab("profile")}
          onOpenSettings={() => setOverlay("settings")}
        />
      )}
      {activeTab === "quran" && (
        <QuranScreen onBack={goHome} onOpenReader={(s) => { setReaderSurah(s); setOverlay("reader"); }} />
      )}
      {activeTab === "ai" && <AIModeScreen onBack={goHome} />}
      {activeTab === "missions" && <MissionsScreen onBack={goHome} />}
      {activeTab === "wordbyword" && <WordByWordScreen onBack={goHome} />}
      {activeTab === "revision" && <RevisionScreen onBack={goHome} />}
      {activeTab === "stats" && <StatsScreen onBack={goHome} />}
      {activeTab === "profile" && (
        <ProfileScreen
          onBack={goHome}
          onOpenSettings={() => setOverlay("settings")}
          onOpenPremium={() => setOverlay("premium")}
        />
      )}
      {/* Single, centralized Bottom Navigation — only rendered on Home */}
      <BottomNav active="home" visible={finalNavVisible} onNavigate={handleNavigate} />
    </AppSurface>
  );
}

function AppSurface({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#eef2f7] flex items-center justify-center p-0 sm:p-6">
      <div className="w-full h-[100dvh] sm:w-[340px] sm:h-[720px] bg-[#fafafa] sm:rounded-[44px] overflow-hidden relative sm:shadow-2xl sm:shadow-slate-900/20">
        {children}
      </div>
    </main>
  );
}
