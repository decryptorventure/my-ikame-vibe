/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SSO_URL: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_KEYCLOAK_REALM: string;
  readonly VITE_KEYCLOAK_URL: string;
  readonly VITE_KEYCLOAK_CLIENT_ID: string;
  /** Set to 'true' to use mock data instead of real API (vibe coding mode) */
  readonly VITE_USE_MOCK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
