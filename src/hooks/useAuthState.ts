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
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateAuthState = useCallback(() => {
    const isLoggedIn = UserService.isLoggedIn();
    const currentToken = isLoggedIn ? UserService.getToken() : null;
    
    setToken(currentToken || null);
    setIsAuthenticated(!!isLoggedIn && !!currentToken);
  }, []);

  return {
    token,
    isAuthenticated,
    updateAuthState,
  };
}
