import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "firebase/auth";
import { isFirebaseConfigured } from "../lib/firebase";
import { authRepository } from "../features/auth/data/AuthRepository";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  configured: boolean;
  setMockUser: (user: any) => void;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  configured: isFirebaseConfigured,
  setMockUser: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authRepository.watchAuthState((nextUser) => {
      setUser((nextUser as unknown as User) || null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // setMockUser is kept for interface compatibility but is a no-op when Firebase is live
  const setMockUser = () => {};

  const value = useMemo(
    () => ({ user, loading, configured: isFirebaseConfigured, setMockUser }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
