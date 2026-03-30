import { useCallback } from 'react';
import UserService from '@/lib/keycloak-config';
import { extractTokenFromHash, parseTokenPayload } from '@/lib/keycloak-utils';

interface UseSSOCallbackReturn {
  handleSSOCallback: () => boolean;
}

/**
 * Hook to handle SSO callback and extract token from hash fragment
 */
export function useSSOCallback(
  onTokenReceived: () => void
): UseSSOCallbackReturn {
  const handleSSOCallback = useCallback((): boolean => {
    const ssoToken = extractTokenFromHash();
    if (!ssoToken) return false;

    // Store token in Keycloak instance
    const keycloakInstance = UserService.getKeyCloack();
    keycloakInstance.token = ssoToken;
    keycloakInstance.authenticated = true;
    
    // Parse and store token payload
    const payload = parseTokenPayload(ssoToken);
    if (payload) {
      keycloakInstance.tokenParsed = payload;
    }

    // Remove hash fragment from URL
    window.history.replaceState({}, '', window.location.pathname + window.location.search);
    
    // Notify that token was received
    onTokenReceived();
    return true;
  }, [onTokenReceived]);

  return {
    handleSSOCallback,
  };
}
