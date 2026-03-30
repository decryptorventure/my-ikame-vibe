import { useCallback } from 'react';
import UserService from '@/lib/keycloak-config';

const SSO_URL = import.meta.env.VITE_SSO_URL || 'https://sso.ikameglobal.com';

interface UseAuthActionsReturn {
  login: () => void;
  logout: () => void;
}

/**
 * Hook to handle login and logout actions
 */
export function useAuthActions(isAuthenticated: boolean): UseAuthActionsReturn {
  const login = useCallback(() => {
    if (isAuthenticated) return;
    
    const currentUrl = window.location.href.split('#')[0];
    const loginUrl = `${SSO_URL}/?urlDirect=${encodeURIComponent(currentUrl)}`;
    window.location.href = loginUrl;
  }, [isAuthenticated]);

  const logout = useCallback(() => {
    UserService.doLogout();
  }, []);

  return {
    login,
    logout,
  };
}
