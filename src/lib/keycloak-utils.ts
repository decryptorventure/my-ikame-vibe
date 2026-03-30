/**
 * Keycloak SSO utility functions
 */

/**
 * Extract ssoToken from URL hash fragment
 * @returns ssoToken if found, null otherwise
 */
export function extractTokenFromHash(): string | null {
  const hash = window.location.hash.substring(1);
  if (!hash) return null;
  
  const hashParams = new URLSearchParams(hash);
  return hashParams.get('ssoToken');
}

/**
 * Parse JWT token payload
 * @param token - JWT token string
 * @returns Parsed token payload or null if invalid
 */
export function parseTokenPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/**
 * Check if token is expired
 * @param token - JWT token string
 * @returns true if token is expired or invalid, false otherwise
 */
export function isTokenExpired(token: string): boolean {
  const payload = parseTokenPayload(token);
  if (!payload || !payload.exp) return true;

  const expirationTime = (payload.exp as number) * 1000;
  return Date.now() >= expirationTime;
}
