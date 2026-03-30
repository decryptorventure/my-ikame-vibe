/**
 * Mock fetch base for RTK Query — used when VITE_USE_MOCK=true.
 * Intercepts all API calls and returns static mock data.
 * Remove this file when connecting real APIs.
 */

import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { MOCK_RESPONSES } from '@/lib/mock-data';

const SIMULATED_DELAY_MS = 400;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Extracts the path portion from a full URL or relative path string.
 * Handles both string args and FetchArgs objects.
 */
function extractPath(args: string | FetchArgs): string {
  const raw = typeof args === 'string' ? args : args.url;
  try {
    return new URL(raw).pathname;
  } catch {
    // Relative path — strip query string
    return raw.split('?')[0];
  }
}

/**
 * Looks up mock response data by URL path.
 * Tries exact match first, then prefix match for dynamic segments (e.g. /v3/posts/:id).
 */
function findMockResponse(path: string): unknown | null {
  // Exact match
  const exactKey = path as keyof typeof MOCK_RESPONSES;
  if (exactKey in MOCK_RESPONSES) {
    return MOCK_RESPONSES[exactKey];
  }

  // Prefix match for dynamic routes (e.g. /v3/posts/post-001 → /v3/posts/:id mock)
  for (const key of Object.keys(MOCK_RESPONSES)) {
    const segments = key.split('/');
    const pathSegments = path.split('/');
    if (segments.length === pathSegments.length) {
      const matches = segments.every((seg, i) => seg.startsWith(':') || seg === pathSegments[i]);
      if (matches) {
        return MOCK_RESPONSES[key as keyof typeof MOCK_RESPONSES];
      }
    }
  }

  return null;
}

const mockFetchBase: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
) => {
  await sleep(SIMULATED_DELAY_MS);

  const path = extractPath(args);
  const mockData = findMockResponse(path);
  if (mockData !== null) {

    const body = (args as any)?.body;
    const data = typeof mockData === 'function' ? mockData(body, path) : mockData;
    return { data };

  }


  console.warn(`[MockFetchBase] No mock found for: ${path}`);
  return {
    error: {
      status: 'CUSTOM_ERROR',
      error: `Mock not found for path: ${path}`,
    } as FetchBaseQueryError,
  };
};

export default mockFetchBase;
