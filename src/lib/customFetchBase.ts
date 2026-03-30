import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import UserService from "./keycloak-config";
import mockFetchBase from "@/lib/mock-fetch-base";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

/**
 * Custom fetch base for RTK Query
 * Automatically attaches Authorization header with Keycloak token
 * Handles 401 errors by redirecting to login
 */
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: async (headers) => {
    // Get token from UserService
    if (UserService.isLoggedIn()) {
      // Ensure token is fresh
      try {
        await UserService.refreshToken();
      } catch (error) {
        // Token refresh failed, will be handled by 401 error
        console.error("Token refresh failed:", error);
      }

      const token = UserService.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Use mock data when VITE_USE_MOCK=true (vibe coding / UI prototyping mode)
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    return mockFetchBase(args, api, extraOptions);
  }

  const result = await baseQuery(args, api, extraOptions);

  // Handle 401 Unauthorized - redirect to login
  if (result.error && result.error.status === 401) {
    if (UserService.isLoggedIn()) {
      // User is logged in but token is invalid, redirect to SSO logout
      const SSO_URL =
        import.meta.env.VITE_SSO_URL || "https://sso.ikameglobal.com";
      const currentUrl = window.location.origin;
      const logoutUrl = `${SSO_URL}/?urlDirect=${encodeURIComponent(currentUrl)}`;
      window.location.href = logoutUrl;
    } else {
      // Not authenticated, redirect to login
      UserService.doLogin();
    }
  }

  return result;
};

export default customFetchBase;
