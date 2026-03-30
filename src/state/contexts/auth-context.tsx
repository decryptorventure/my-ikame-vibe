import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useAuthState } from '@/hooks/useAuthState';
import { useSSOCallback } from '@/hooks/useSSOCallback';
import { useAuthActions } from '@/hooks/useAuthActions';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  isInitialized: boolean;
  login: () => void;
  logout: () => void;
  handleSSOCallback: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const isInitializingRef = useRef(false);

  const { token, isAuthenticated, updateAuthState } = useAuthState();
  const { handleSSOCallback } = useSSOCallback(updateAuthState);
  const { login, logout } = useAuthActions(isAuthenticated);

  useEffect(() => {
    // Prevent multiple initializations
    if (isInitializingRef.current || isInitialized) return;
    isInitializingRef.current = true;

    // Check for SSO callback first
    if (window.location.hash.includes('ssoToken=')) {
      const handled = handleSSOCallback();
      if (handled) {
        setIsInitialized(true);
        return;
      }
    }

    // Check existing token from Keycloak
    updateAuthState();
    setIsInitialized(true);
  }, [handleSSOCallback, updateAuthState, isInitialized]);

  const value: AuthContextType = {
    isAuthenticated,
    token,
    isInitialized,
    login,
    logout,
    handleSSOCallback,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
