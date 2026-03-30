import React, { useEffect, useRef } from 'react';
import { useAuth } from '@/state/contexts/auth-context';
import Loading from '@/components/common/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const IS_MOCK_MODE = import.meta.env.VITE_USE_MOCK === 'true';

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isInitialized, login, handleSSOCallback } = useAuth();
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Skip auth checks entirely in mock/vibe-coding mode
    if (IS_MOCK_MODE) return;
    if (!isInitialized) return;

    if (window.location.hash.includes('ssoToken=')) {
      const handled = handleSSOCallback();
      if (handled) {
        window.history.replaceState({}, '', window.location.pathname + window.location.search);
        hasRedirected.current = false;
        return;
      }
    }

    if (!isAuthenticated && !hasRedirected.current) {
      hasRedirected.current = true;
      login();
    }
  }, [isAuthenticated, isInitialized, login, handleSSOCallback]);

  // In mock mode, render children directly without auth checks
  if (IS_MOCK_MODE) return <>{children}</>;

  if (!isInitialized) {
    return <Loading tip="Initializing..." />;
  }

  if (!isAuthenticated) {
    return <Loading tip="Redirecting to login..." />;
  }

  return <>{children}</>;
}
