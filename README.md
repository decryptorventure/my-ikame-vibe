# Cursor Rules for Vite + React + Ant Design Project

## Project Overview
This is a Vite + React + TypeScript project with Ant Design UI components, Redux Toolkit Query for state management, and Keycloak for authentication. The project has been migrated from Next.js to Vite.

## Tech Stack
- **Framework**: Vite + React 18
- **Language**: TypeScript
- **UI Library**: Ant Design (antd)
- **State Management**: Redux Toolkit Query (RTK Query) + Redux Toolkit
- **Routing**: React Router DOM
- **Authentication**: Keycloak
- **Styling**: Tailwind CSS + Ant Design
- **Form Handling**: React Hook Form + Zod validation
- **Build Tool**: Vite

## Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Ant Design component wrappers (if any)
│   ├── common/          # Shared/common components
│   ├── features/       # Feature-specific shared components
│   └── [ComponentName].tsx  # Global components (AccountSelector, Header, etc.)
├── pages/              # Page components (feature-based organization)
│   ├── [FeatureName]/
│   │   ├── [FeatureName].tsx      # Main page component
│   │   ├── components/            # Feature-specific components
│   │   │   ├── [SubComponent].tsx
│   │   │   └── [NestedFeature]/   # Nested component folders
│   │   │       ├── components/
│   │   │       ├── hooks/
│   │   │       └── index.ts
│   │   ├── hooks/                 # Feature-specific hooks
│   │   │   ├── use[FeatureName].ts
│   │   │   └── index.ts           # Barrel export
│   │   ├── types.ts               # Feature-specific types
│   │   └── index.ts               # Barrel export
├── state/              # State management
│   ├── contexts/       # React contexts (auth-context.tsx)
│   ├── slices/         # Redux Toolkit slices
│   │   └── [feature]Slice.ts
│   └── store/          # Redux store configuration
│       └── index.ts
├── services/           # API services (RTK Query)
│   └── [domain].service.ts
├── lib/                # Utility libraries (keycloak, customFetchBase, etc.)
├── utils/              # Helper utilities (legacy, prefer lib/)
├── types/              # TypeScript type definitions (domain-based)
│   ├── [domain].types.ts
│   └── abExperiment.types.ts
├── hooks/              # Global/shared custom React hooks
│   └── use[FeatureName].ts
└── constants/          # Application constants
```

## Path Aliases
Use these path aliases instead of relative imports:
- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/lib/*` → `./src/lib/*`
- `@/utils/*` → `./src/utils/*`
- `@/hooks/*` → `./src/hooks/*`
- `@/pages/*` → `./src/pages/*`
- `@/state/*` → `./src/state/*`
- `@/types/*` → `./src/types/*`
- `@/services/*` → `./src/services/*`
- `@/constants/*` → `./src/constants/*`
- `@/assets/*` → `./src/assets/*`

## Base Code Rules

### TypeScript Standards
- Use strict TypeScript configuration
- Define interfaces for all data structures
- Use type inference where possible for local variables
- Prefer `interface` over `type` for object shapes (unless union/intersection needed)
- Use proper generic types for reusable components
- Always define proper return types for functions
- Use union types for state management and enums
- Implement proper error types
- Avoid `any` - use `unknown` if type is truly unknown, then narrow
- Use `as const` for literal types and readonly arrays

### React Component Standards
- Use functional components with hooks exclusively
- Prefer arrow functions for component definitions
- Use proper TypeScript interfaces for props (never inline types)
- Implement proper error boundaries where needed
- Use React.memo for performance optimization when needed
- Always define component props interface separately
- Use proper key props for list items (never index as key)
- Implement proper cleanup in useEffect hooks
- Components should be focused on rendering UI only
- Extract business logic to custom hooks

### File Naming Conventions
- **Components**: PascalCase (e.g., `AccountSelector.tsx`, `MediationGroupsTable.tsx`)
- **Hooks**: camelCase starting with 'use' (e.g., `useAccount.ts`, `useAbTest.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`, `customFetchBase.ts`)
- **Types**: camelCase with `.types.ts` suffix (e.g., `mediation.types.ts`, `abExperiment.types.ts`)
- **Services**: camelCase with `.service.ts` suffix (e.g., `apps.service.ts`, `mediation.service.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)
- **Slices**: camelCase with `Slice.ts` suffix (e.g., `accountSlice.ts`)
- **Pages**: PascalCase matching folder name (e.g., `AppManagement.tsx`)

### Import Order
1. React and React-related imports
2. Third-party libraries (antd, react-router-dom, etc.)
3. Internal imports using path aliases (@/...)
   - Group by category: services, hooks, types, components, state, lib/utils
4. Relative imports (avoid when possible, use for same-level files only)
5. Type-only imports use `import type` keyword

Example:
```typescript
import React, { useCallback, useMemo } from 'react';
import { Select, Spin, Typography, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useGetAdmobAccountsQuery } from '@/services/admobAccounts.service';
import useAccount from '@/hooks/useAccount';
import type { RootState } from '@/state/store';
import { setIsSwitching } from '@/state/slices/accountSlice';
```

### Component Structure Template
```typescript
import React from 'react';
import { ComponentProps } from 'antd';
import { useAuth } from '@/state/contexts/auth-context';
import type { MyComponentProps } from './types';

interface MyComponentProps {
  // Define props here
  requiredProp: string;
  optionalProp?: number;
  onAction?: () => void;
}

export default function MyComponent({ requiredProp, optionalProp, onAction }: MyComponentProps) {
  // 1. Hooks (state, effects, context)
  // 2. Derived state/values (useMemo)
  // 3. Event handlers (useCallback)
  // 4. Effects (useEffect)
  // 5. Early returns (loading, error states)
  // 6. Render
  return (
    // JSX
  );
}
```

### Type Definition Standards
- **Separate types into domain-specific files**: `types/[domain].types.ts`
- **Use descriptive interface names**: `MediationGroup`, `AbExperimentRequest`, etc.
- **Export types that are used across modules**
- **Group related types together** in the same file
- **Use type aliases for simple unions**: `type PlatformType = 'ANDROID' | 'IOS'`
- **Use interfaces for object shapes**
- **Document complex types with comments**

Example structure:
```typescript
// types/abExperiment.types.ts
export type PlatformType = 'ANDROID' | 'IOS';
export type AdFormatType = 'BANNER' | 'INTERSTITIAL' | 'REWARDED' | 'NATIVE' | 'APP_OPEN';

export interface AbExperimentTargeting {
  adUnitIds: string[];
}

export interface CombinedCreateAbExperimentRequest {
  mediationGroupId: string;
  targeting: AbExperimentTargeting;
  // ...
}
```

### Environment Variables
- Use `VITE_` prefix for all environment variables
- Define types in `src/env.d.ts`
- Use `import.meta.env` instead of `process.env`
- Always provide fallback values for environment variables
- Document required env vars in README

### Error Handling
- Implement proper error boundaries for route-level errors
- Use try-catch blocks for async operations
- Show user-friendly error messages using Ant Design `message` component
- Log errors for debugging (console.error in development)
- Use proper error types and interfaces
- Handle loading and error states in RTK Query hooks

### Performance
- Use React.memo for expensive components that re-render frequently
- Implement proper loading states (use RTK Query isLoading flags)
- Use lazy loading for large components (React.lazy + Suspense)
- Optimize bundle size (tree-shaking, code splitting)
- Avoid unnecessary re-renders (use useMemo, useCallback appropriately)
- Use useMemo for expensive calculations
- Use useCallback for handlers passed to child components

### Code Quality
- Use ESLint and Prettier for code formatting
- Follow consistent naming conventions
- Write self-documenting code
- Use meaningful variable and function names
- Keep functions small and focused (< 50 lines ideally)
- Add JSDoc comments for complex functions and public APIs
- Remove unused imports and variables
- No console.log in production code (use console.error for errors if needed)

### File Size Limits
- **NO FILES GREATER THAN 200 LINES** - This is a hard limit
- Split large files into smaller, focused modules
- Extract custom hooks into separate files
- Break down large components into smaller sub-components
- Move utility functions to dedicated utility files
- Extract complex logic into custom hooks or utility functions
- Use barrel exports (index.ts) to maintain clean imports

### Code Optimization & Splitting Guidelines

#### Component Splitting Strategy
- **Large Components (>200 lines)**: Split into multiple smaller components
- **Complex Logic**: Extract into custom hooks (use[FeatureName].ts)
- **Utility Functions**: Move to dedicated utility files
- **Constants**: Extract to separate constants files
- **Types**: Move to dedicated type definition files
- **Sub-components**: Place in `components/` subfolder of feature

#### Feature Organization Pattern
```
pages/FeatureName/
├── FeatureName.tsx          # Main page component (<200 lines)
├── components/              # Feature-specific components
│   ├── FeatureHeader.tsx
│   ├── FeatureContent.tsx
│   └── NestedFeature/
│       ├── NestedComponent.tsx
│       ├── components/
│       ├── hooks/
│       └── index.ts
├── hooks/                   # Feature-specific hooks
│   ├── useFeatureName.ts    # Main hook
│   ├── useFeatureData.ts    # Data fetching hook
│   ├── useFeatureActions.ts # Actions handler
│   └── index.ts             # Barrel export
├── types.ts                 # Feature-specific types
└── index.ts                 # Barrel export
```

#### Hook Extraction Rules
- Extract any logic that can be reused
- Extract complex state management
- Extract API calls and data fetching (use RTK Query hooks)
- Extract form logic (React Hook Form)
- Extract event handlers with complex logic
- One hook per file
- Export hooks from index.ts for cleaner imports

#### When to Split Files
- File exceeds 200 lines
- Component has multiple responsibilities
- Complex state management logic
- Multiple custom hooks in one component
- Large form components
- Complex data fetching logic
- Multiple API endpoints in one file

## Logic vs UI Separation (Mandatory)
- Do NOT place business logic, API calls, or side-effects directly in React components
- Components should only render UI and invoke callbacks
- Extract all logic into custom hooks (e.g., `useFeatureX`) or utilities under `hooks/` or `lib/`
- Form handling logic (validation, mapping, side-effects) must live in hooks
- Components receive `form`, `handlers`, and `state` via props or hooks
- Keep components stateless where feasible; use hooks to manage state

### Variable Naming
- Use descriptive variable names (avoid abbreviations unless widely known)
- Use camelCase for variables and functions
- Use PascalCase for components, interfaces, and types
- Use UPPER_SNAKE_CASE for constants
- Use meaningful names that explain intent
- Boolean variables should start with `is`, `has`, `can`, `should`
- Handler functions should start with `handle` (e.g., `handleSubmit`, `handleChange`)

### Code Organization
- Group related functionality together
- Keep related imports together
- Use consistent indentation and spacing (2 spaces)
- Remove unused imports and variables
- Keep files focused on single responsibility
- Use meaningful file and folder names
- Group exports at the end of file when using barrel exports

### Comments and Documentation
- Write self-documenting code (prefer code clarity over comments)
- Add comments for complex business logic only
- Use JSDoc for public functions and complex utilities
- Keep comments up to date with code changes
- Avoid obvious comments that repeat the code
- Explain why, not what (comments should explain reasoning)

## API Calling Rules (Redux Toolkit Query)

### RTK Query Structure
- Use RTK Query for ALL API calls (no direct fetch/axios)
- Create separate service files for different domains
- Use customFetchBase for authentication and headers
- Implement proper error handling
- Use proper TypeScript types for all API requests/responses
- Follow RESTful API patterns
- One service file per domain (apps, mediation, adUnits, admobAccounts)

### Service File Structure
```typescript
import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from '@/lib/customFetchBase';
import type {
  ResponseType,
  RequestType,
} from '@/types/[domain].types';

export const [domain]Api = createApi({
  reducerPath: '[domain]Api',
  baseQuery: customFetchBase,
  tagTypes: ['[DomainTag]'],
  endpoints: (builder) => ({
    // Define endpoints here
  }),
});

export const {
  use[Action][Entity]Query,
  use[Action][Entity]Mutation,
} = [domain]Api;
```

### Service File Naming
- Service files: `[domain].service.ts` (e.g., `mediation.service.ts`, `apps.service.ts`)
- Export: `[domain]Api` (e.g., `mediationApi`, `appsApi`)
- reducerPath: `'[domain]Api'` (e.g., `'mediationApi'`, `'appsApi'`)
- tagTypes: `['[DomainTag]']` (e.g., `['MediationGroup']`, `['APPS']`)

### API Endpoint Patterns
- Use descriptive endpoint names that match their purpose
- Implement proper caching with tags
- Use optimistic updates when appropriate
- Always handle loading and error states
- Use proper TypeScript types for all endpoints
- Transform responses to match frontend data structure
- Use `transformResponse` to normalize API responses

### Common API Patterns

#### Query Endpoint Pattern
```typescript
get[Entity]s: builder.query<Entity[], QueryParams>({
  query: (params) => ({
    url: `/api/path`,
    method: 'GET',
    params, // Or build query string manually
  }),
  transformResponse: (response: ApiResponse<Entity[]>) => response?.data ?? [],
  providesTags: ['EntityTag'],
}),
```

#### Mutation Endpoint Pattern
```typescript
create[Entity]: builder.mutation<Entity, CreateRequest>({
  query: (body) => ({
    url: `/api/path`,
    method: 'POST',
    body,
  }),
  invalidatesTags: ['EntityTag'],
}),

update[Entity]: builder.mutation<Entity, { id: string; data: UpdateRequest }>({
  query: ({ id, data }) => ({
    url: `/api/path/${id}`,
    method: 'PUT',
    body: data,
  }),
  invalidatesTags: ['EntityTag'],
}),

delete[Entity]: builder.mutation<void, string>({
  query: (id) => ({
    url: `/api/path/${id}`,
    method: 'DELETE',
  }),
  invalidatesTags: ['EntityTag'],
}),
```

### Using API Hooks in Components
```typescript
// Query usage
const { data, error, isLoading, isFetching, refetch } = useGetDataQuery(params, {
  skip: !shouldFetch, // Conditional fetching
});

// Mutation usage
const [createData, { isLoading: isCreating, error: createError }] = useCreateDataMutation();

// In handler
await createData(payload).unwrap(); // unwrap() for try/catch error handling
```

### Type Safety in Services
- Always use typed request/response interfaces
- Extract shared types to `types/[domain].types.ts`
- Use `type` keyword for type-only imports
- Never use `any` - create proper interfaces
- Match backend API contracts exactly

### Store Integration
- Register all API reducers in `state/store/index.ts`
- Add all API middleware to store configuration
- Use proper tag invalidation for cache management
- Export all hooks from service files for easy imports

## Component & Features Organization

### Component Structure
- Keep components focused on single responsibility
- Use composition over inheritance
- Extract reusable logic into custom hooks
- Use proper prop interfaces (never inline)
- Implement proper error boundaries where needed
- Use React.memo for performance optimization when needed
- Components should be < 200 lines

### Feature Organization
- Group related components together by feature
- Use feature-based folder structure in `pages/`
- Keep feature-specific logic together
- Extract shared components to `components/common/` or `components/features/`
- Use proper barrel exports (index.ts files)
- Keep feature dependencies minimal
- Feature should be self-contained when possible

### Component Patterns

#### Presentational Component
```typescript
interface MyComponentProps {
  data: DataType[];
  isLoading: boolean;
  onAction: (id: string) => void;
}

export default function MyComponent({ data, isLoading, onAction }: MyComponentProps) {
  if (isLoading) return <Spin />;
  if (!data.length) return <Empty />;
  
  return (
    // Render UI
  );
}
```

#### Container Component (with hooks)
```typescript
export default function FeaturePage() {
  const {
    data,
    isLoading,
    error,
    handlers,
  } = useFeatureHook();
  
  if (isLoading) return <Spin />;
  if (error) return <Alert type="error" message={error} />;
  
  return (
    <FeatureContent
      data={data}
      onAction={handlers.handleAction}
    />
  );
}
```

### State Management
- Use RTK Query for server state (all API data)
- Use Redux Toolkit slices for global client state
- Use React Context for theme/auth/global settings
- Use local useState for component-specific state
- Keep state as close to where it's used as possible
- Use proper TypeScript types for all state

### Redux Slice Pattern
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FeatureState {
  selectedId: string | null;
  isSwitching: boolean;
}

const initialState: FeatureState = {
  selectedId: null,
  isSwitching: false,
};

const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    setSelectedId(state, action: PayloadAction<string | null>) {
      state.selectedId = action.payload;
    },
    setIsSwitching(state, action: PayloadAction<boolean>) {
      state.isSwitching = action.payload;
    },
  },
});

export const { setSelectedId, setIsSwitching } = featureSlice.actions;
export default featureSlice.reducer;
```

### Custom Hooks Pattern
```typescript
interface UseFeatureProps {
  id?: string;
  onSuccess?: () => void;
}

export function useFeature({ id, onSuccess }: UseFeatureProps) {
  // RTK Query hooks
  const { data, isLoading, error } = useGetFeatureQuery(id!, { skip: !id });
  const [createMutation, { isLoading: isCreating }] = useCreateFeatureMutation();
  
  // Local state
  const [localState, setLocalState] = useState();
  
  // Derived state
  const computedValue = useMemo(() => {
    // computation
  }, [data]);
  
  // Handlers
  const handleAction = useCallback(async () => {
    try {
      await createMutation(payload).unwrap();
      onSuccess?.();
    } catch (e) {
      // error handling
    }
  }, [createMutation, onSuccess]);
  
  return {
    data,
    isLoading,
    error,
    computedValue,
    handleAction,
  };
}
```

## Styling Rules

### Ant Design Usage
- Use Ant Design components instead of custom UI components when possible
- Follow Ant Design design patterns and spacing
- Use Ant Design's built-in theming system
- Prefer Ant Design's form components over custom forms
- Use Ant Design's layout components (Layout, Header, Content, Footer)
- Follow Ant Design's color palette and typography
- Use Ant Design's spacing system (8px grid)

### Tailwind CSS Usage
- Use Tailwind for utility classes (margin, padding, colors, etc.)
- Use Ant Design for complex components (Table, Form, Modal, etc.)
- Prefer Tailwind for layout and spacing
- Keep Tailwind classes readable (max 5-6 classes per element)
- Use Ant Design's design tokens when possible

### Inline Styles
- Avoid inline styles unless necessary for dynamic values
- Use Ant Design's style props when available
- Use Tailwind classes for static styling
- Inline styles only for calculated/dynamic values

## Common Patterns

### Error Handling Pattern
```typescript
try {
  const result = await mutation(payload).unwrap();
  message.success('Operation successful');
  onSuccess?.(result);
} catch (error: any) {
  console.error('Operation failed:', error);
  message.error(error?.data?.message || 'Operation failed');
}
```

### Loading State Pattern
```typescript
const { data, isLoading, isFetching, error } = useGetDataQuery(params);

if (isLoading) {
  return <Spin size="large" tip="Loading..." />;
}

if (error) {
  return <Alert type="error" message="Failed to load data" />;
}
```

### Form Handling Pattern
```typescript
const form = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: {},
});

const onSubmit = async (data: FormData) => {
  try {
    await mutation(data).unwrap();
    message.success('Saved successfully');
    form.reset();
  } catch (error) {
    message.error('Save failed');
  }
};
```

## Avoid
- Using Next.js specific imports or patterns
- Relative imports when path aliases are available
- Inline type definitions in component props
- Business logic in components
- Direct API calls without RTK Query
- Mixing different state management approaches
- `any` type (use proper interfaces)
- Files longer than 200 lines
- Duplicate code (extract to hooks/utilities)

## Preferred Libraries
- **UI**: Ant Design
- **Forms**: React Hook Form + Zod
- **State**: Redux Toolkit Query + Redux Toolkit
- **Routing**: React Router DOM
- **HTTP**: RTK Query (not fetch/axios directly)
- **Icons**: @ant-design/icons, lucide-react
- **Styling**: Tailwind CSS + Ant Design

## Migration Notes
- This project was migrated from Next.js to Vite
- All Next.js specific code has been removed
- Use Vite environment variables instead of Next.js ones
- Use React Router instead of Next.js routing
- Use native script loading instead of Next.js Script component
