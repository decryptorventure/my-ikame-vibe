import { useState, useCallback } from 'react';
import UserService from '@/lib/keycloak-config';

interface UseAuthStateReturn {
  token: string | null;
  isAuthenticated: boolean;
  updateAuthState: () => void;
}

/**
 * Hook to manage authentication state
 */
export function useAuthState(): UseAuthStateReturn {
  const isMock = import.meta.env.VITE_USE_MOCK !== 'false';
  const [token, setToken] = useState<string | null>(isMock ? 'mock-pwa-token' : null);
  const [isAuthenticated, setIsAuthenticated] = useState(isMock);

  const updateAuthState = useCallback(() => {
    if (isMock) {
      setToken('mock-pwa-token');
      setIsAuthenticated(true);
      return;
    }
    const isLoggedIn = UserService.isLoggedIn();
    const currentToken = isLoggedIn ? UserService.getToken() : null;
    
    setToken(currentToken || null);
    setIsAuthenticated(!!isLoggedIn && !!currentToken);
  }, [isMock]);

  return {
    token,
    isAuthenticated,
    updateAuthState,
  };
}
