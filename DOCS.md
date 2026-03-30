# Project Documentation

Complete documentation for the React Vite boilerplate project with Keycloak SSO and RTK Query.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Architecture](#architecture)
3. [Authentication](#authentication)
4. [State Management](#state-management)
5. [API Integration](#api-integration)
6. [Component Development](#component-development)
7. [Styling Guide](#styling-guide)
8. [Testing](#testing)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
VITE_SSO_URL=https://sso.ikameglobal.com
VITE_API_BASE_URL=http://localhost:3000/api
VITE_KEYCLOAK_REALM=ikame-platform
```

5. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## Architecture

### System Overview

This document describes the architecture and design decisions of the frontend application.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Browser                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐      ┌──────────────┐               │
│  │   React App  │──────│ React Router │               │
│  └──────────────┘      └──────────────┘               │
│         │                                               │
│         ├──────────────────────────────────┐           │
│         │                                  │           │
│  ┌──────▼──────┐                   ┌──────▼──────┐     │
│  │ Components │                   │    Hooks   │     │
│  └──────┬──────┘                   └──────┬──────┘     │
│         │                                  │           │
│         └──────────┬───────────────────────┘           │
│                    │                                   │
│         ┌──────────▼──────────┐                       │
│         │   State Management  │                       │
│         │  ┌────────────────┐ │                       │
│         │  │  RTK Query      │ │                       │
│         │  │  Redux Toolkit │ │                       │
│         │  │  React Context │ │                       │
│         │  └────────────────┘ │                       │
│         └──────────┬──────────┘                       │
│                    │                                   │
└────────────────────┼───────────────────────────────────┘
                     │
         ┌───────────▼───────────┐
         │   Custom Fetch Base   │
         │  (Auth + Headers)     │
         └───────────┬───────────┘
                     │
         ┌───────────▼───────────┐
         │   Backend API         │
         └───────────────────────┘
```

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Ant Design component wrappers
│   ├── common/          # Shared/common components
│   └── [ComponentName].tsx
├── pages/              # Page components (feature-based)
│   └── [FeatureName]/
│       ├── [FeatureName].tsx
│       ├── components/
│       ├── hooks/
│       └── types.ts
├── state/              # State management
│   ├── contexts/       # React contexts
│   ├── slices/         # Redux Toolkit slices
│   └── store/          # Redux store
├── services/           # RTK Query API services
├── lib/                # Utility libraries
├── utils/              # Helper utilities
├── types/              # TypeScript type definitions
├── hooks/              # Global custom hooks
└── constants/          # Application constants
```

### Technology Stack

- **Framework**: Vite + React 18
- **Language**: TypeScript (strict mode)
- **UI Library**: Ant Design 5.x
- **State Management**: Redux Toolkit Query + Redux Toolkit
- **Routing**: React Router DOM v6
- **Authentication**: Keycloak SSO
- **Styling**: Tailwind CSS + Ant Design
- **Form Handling**: React Hook Form + Zod
- **Build Tool**: Vite

### State Management Architecture

#### Three-Layer State Management

1. **Server State (RTK Query)**
   - All API data
   - Automatic caching
   - Cache invalidation via tags

2. **Global Client State (Redux Toolkit)**
   - Application-wide state
   - UI state that needs to be shared
   - Example: selected account, theme preferences

3. **Local Component State (React useState)**
   - Component-specific state
   - Form inputs
   - UI toggles

### Component Architecture

#### Separation of Concerns

```
┌─────────────────────────────────────┐
│         Page Component              |
│  (Container - Uses Hooks)           │
└──────────────┬──────────────────────┘
               │
    ┌──────────┼──────────┐
    │          │          │
┌───▼───┐ ┌───▼───┐ ┌───▼───┐
│ Hook  │ │ Hook  │ │ Hook  │
│(Logic)│ │(Logic)│ │(Logic)│
└───┬───┘ └───┬───┘ └───┬───┘
    │          │          │
    └──────────┼──────────┘
               │
    ┌──────────▼──────────┐
    │  Presentational     │
    │  Components         │
    │  (UI Only)          │
    └─────────────────────┘
```

### Data Flow

#### Reading Data

```
Component
  ↓
use[Entity]Query Hook
  ↓
RTK Query Service
  ↓
customFetchBase
  ↓
API Endpoint
  ↓
Response → Cache → Component
```

#### Writing Data

```
Component
  ↓
use[Action]Mutation Hook
  ↓
RTK Query Service
  ↓
customFetchBase
  ↓
API Endpoint
  ↓
Response → Invalidate Tags → Refetch Queries
```

---

## Authentication

### Keycloak SSO Flow

The application uses Keycloak SSO for authentication. The flow works as follows:

1. **User visits app** → Check for existing token in localStorage
2. **No token** → Redirect to SSO login page
3. **User logs in** → SSO redirects back with token in URL hash
4. **Token extraction** → Extract token from hash fragment
5. **Token storage** → Store token in localStorage
6. **API requests** → Token automatically attached via `customFetchBase`

### Authentication Flow Diagram

```
User → App → ProtectedRoute
                │
                ├─ Not Authenticated → Redirect to SSO
                │
                └─ Authenticated → Load App
                                    │
                                    └─ API Calls → customFetchBase
                                                    │
                                                    └─ Attach Token
```

### Implementation Details

#### Keycloak Utilities (`src/lib/keycloak.ts`)

- `redirectToSSO(urlDirect)` - Redirect user to SSO login
- `extractTokenFromHash()` - Extract token from URL hash
- `decodeToken(token)` - Decode JWT (client-side only)
- `isTokenExpired(token)` - Check if token is expired

#### Auth Context (`src/state/contexts/auth-context.tsx`)

Provides authentication state and methods:
- `isAuthenticated` - Authentication status
- `token` - Current auth token
- `isInitialized` - Auth initialization status
- `login()` - Redirect to SSO
- `logout()` - Clear token and logout
- `handleSSOCallback()` - Handle SSO callback

#### Protected Routes (`src/components/ProtectedRoute.tsx`)

Wraps routes that require authentication:
- Automatically redirects to SSO if not authenticated
- Handles SSO callback
- Shows loading state during authentication

### Environment Variables

- `VITE_SSO_URL` - SSO endpoint URL
- `VITE_API_BASE_URL` - Backend API base URL
- `VITE_KEYCLOAK_REALM` - Keycloak realm name

---

## State Management

### Redux Toolkit Query (RTK Query)

RTK Query is used for all server state (API data).

#### Creating a Service

```typescript
// src/services/example.service.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from '@/lib/customFetchBase';
import type { ExampleItem } from '@/types/example.types';

export const exampleApi = createApi({
  reducerPath: 'exampleApi',
  baseQuery: customFetchBase,
  tagTypes: ['Example'],
  endpoints: (builder) => ({
    getExamples: builder.query<ExampleItem[], void>({
      query: () => '/examples',
      providesTags: ['Example'],
    }),
    createExample: builder.mutation<ExampleItem, CreateRequest>({
      query: (body) => ({
        url: '/examples',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Example'],
    }),
  }),
});
```

#### Using in Components

```typescript
import { useGetExamplesQuery, useCreateExampleMutation } from '@/services/example.service';

function MyComponent() {
  const { data, isLoading, error } = useGetExamplesQuery();
  const [createExample, { isLoading: isCreating }] = useCreateExampleMutation();
  
  // Use data, handle loading/error states
}
```

### Redux Toolkit Slices

Used for global client state:

```typescript
// src/state/slices/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});
```

### React Context

Used for theme/auth/global settings:
- `AuthContext` - Authentication state
- Future: `ThemeContext`, `SettingsContext`

---

## API Integration

### Base Configuration

#### Custom Fetch Base

Location: `src/lib/customFetchBase.ts`

Features:
- Automatically attaches `Authorization: Bearer {token}` header
- Handles 401 errors by redirecting to SSO
- Uses `VITE_API_BASE_URL` from environment variables

### Creating API Services

#### Service File Structure

```typescript
// src/services/[domain].service.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from '@/lib/customFetchBase';
import type { RequestType, ResponseType } from '@/types/[domain].types';

export const [domain]Api = createApi({
  reducerPath: '[domain]Api',
  baseQuery: customFetchBase,
  tagTypes: ['[DomainTag]'],
  endpoints: (builder) => ({
    // Endpoints here
  }),
});

export const {
  use[Action][Entity]Query,
  use[Action][Entity]Mutation,
} = [domain]Api;
```

#### Naming Conventions

- Service file: `[domain].service.ts` (e.g., `users.service.ts`)
- API export: `[domain]Api` (e.g., `usersApi`)
- reducerPath: `'[domain]Api'` (e.g., `'usersApi'`)
- tagTypes: `['[DomainTag]']` (e.g., `['User']`)

### Endpoint Patterns

#### Query Endpoint (GET)

```typescript
get[Entity]s: builder.query<Entity[], QueryParams>({
  query: (params) => ({
    url: '/entities',
    method: 'GET',
    params,
  }),
  transformResponse: (response: ApiResponse<Entity[]>) => response?.data ?? [],
  providesTags: ['Entity'],
}),
```

#### Create Mutation (POST)

```typescript
create[Entity]: builder.mutation<Entity, CreateRequest>({
  query: (body) => ({
    url: '/entities',
    method: 'POST',
    body,
  }),
  invalidatesTags: ['Entity'],
}),
```

#### Update Mutation (PUT/PATCH)

```typescript
update[Entity]: builder.mutation<Entity, { id: string; data: UpdateRequest }>({
  query: ({ id, data }) => ({
    url: `/entities/${id}`,
    method: 'PUT',
    body: data,
  }),
  invalidatesTags: (result, error, { id }) => [
    { type: 'Entity', id },
    'Entity',
  ],
}),
```

#### Delete Mutation (DELETE)

```typescript
delete[Entity]: builder.mutation<void, string>({
  query: (id) => ({
    url: `/entities/${id}`,
    method: 'DELETE',
  }),
  invalidatesTags: ['Entity'],
}),
```

### Using API Hooks

#### Query Hook

```typescript
import { useGetExamplesQuery } from '@/services/example.service';

function MyComponent() {
  const { 
    data,           // Response data
    error,          // Error object
    isLoading,      // Initial load
    isFetching,     // Any fetch (including refetch)
    refetch,        // Manual refetch function
  } = useGetExamplesQuery(
    params,         // Query parameters
    {
      skip: false,  // Skip query conditionally
      pollingInterval: 0, // Polling interval in ms
    }
  );
}
```

#### Mutation Hook

```typescript
import { useCreateExampleMutation } from '@/services/example.service';

function MyComponent() {
  const [
    createExample,           // Mutation function
    {
      data,                  // Response data
      error,                 // Error object
      isLoading,             // Loading state
      isSuccess,             // Success state
      isError,               // Error state
      reset,                 // Reset mutation state
    }
  ] = useCreateExampleMutation();

  const handleSubmit = async () => {
    try {
      const result = await createExample(payload).unwrap();
      // Handle success
    } catch (error) {
      // Handle error
    }
  };
}
```

### Error Handling

#### Standard Error Handling Pattern

```typescript
try {
  const result = await mutation(payload).unwrap();
  message.success('Operation successful');
  onSuccess?.(result);
} catch (error: any) {
  console.error('Operation failed:', error);
  const errorMessage = error?.data?.message || 'Operation failed';
  message.error(errorMessage);
}
```

#### RTK Query Error Structure

```typescript
interface RTKQueryError {
  status: number;
  data: {
    message?: string;
    errors?: Record<string, string[]>;
  };
}
```

### Cache Management

#### Tags

Tags are used for cache invalidation:

```typescript
tagTypes: ['User', 'Post'],

// Provide tags
providesTags: ['User'],
providesTags: (result, error, id) => [{ type: 'User', id }],

// Invalidate tags
invalidatesTags: ['User'],
invalidatesTags: (result, error, { id }) => [
  { type: 'User', id },
  'User',
],
```

#### Cache Behavior

- Queries are cached automatically
- Mutations invalidate related tags
- Refetch on window focus (configurable)
- Stale time: 0 (always refetch)

### Type Safety

#### Request/Response Types

Define types in `src/types/[domain].types.ts`:

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
}
```

### Common Patterns

#### Conditional Query

```typescript
const { data } = useGetUserQuery(userId, {
  skip: !userId, // Skip if userId is not available
});
```

#### Optimistic Updates

```typescript
updateUser: builder.mutation<User, { id: string; data: UpdateRequest }>({
  query: ({ id, data }) => ({
    url: `/users/${id}`,
    method: 'PUT',
    body: data,
  }),
  async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
    const patchResult = dispatch(
      usersApi.util.updateQueryData('getUser', id, (draft) => {
        Object.assign(draft, data);
      })
    );
    
    try {
      await queryFulfilled;
    } catch {
      patchResult.undo();
    }
  },
  invalidatesTags: ['User'],
}),
```

---

## Component Development

### Component Structure

Components should follow this structure:

```typescript
import React from 'react';
import type { ComponentProps } from './types';

interface ComponentProps {
  requiredProp: string;
  optionalProp?: number;
  onAction?: () => void;
}

export default function Component({ prop1, prop2 }: ComponentProps) {
  // 1. Hooks (state, effects, context)
  // 2. Derived state/values (useMemo)
  // 3. Event handlers (useCallback)
  // 4. Effects (useEffect)
  // 5. Early returns (loading, error states)
  // 6. Render
  
  return <div>...</div>;
}
```

### Component Types

#### Presentational Components

Components that only render UI and receive data via props:

```typescript
interface TableProps {
  data: DataType[];
  isLoading: boolean;
  onRowClick: (id: string) => void;
}

export default function DataTable({ data, isLoading, onRowClick }: TableProps) {
  if (isLoading) return <Spin />;
  if (!data.length) return <Empty />;
  
  return (
    <Table 
      dataSource={data} 
      onRow={(record) => ({
        onClick: () => onRowClick(record.id),
      })}
    />
  );
}
```

#### Container Components

Components that use hooks and manage state:

```typescript
export default function FeaturePage() {
  const { data, isLoading, error, handlers } = useFeature();
  
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

### Logic Separation

**CRITICAL**: Components should only render UI. All logic must be extracted to hooks.

```typescript
// ❌ BAD - Logic in component
function MyComponent() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch('/api/data').then(setData);
  }, []);
  return <div>{data}</div>;
}

// ✅ GOOD - Logic in hook
function MyComponent() {
  const { data } = useMyData();
  return <div>{data}</div>;
}

// hooks/useMyData.ts
export function useMyData() {
  const { data } = useGetDataQuery();
  return { data };
}
```

### File Organization

#### Feature-Based Structure

```
pages/FeatureName/
├── FeatureName.tsx          # Main component (<200 lines)
├── components/              # Sub-components
│   ├── FeatureHeader.tsx
│   ├── FeatureContent.tsx
│   └── FeatureForm.tsx
├── hooks/                  # Custom hooks
│   ├── useFeature.ts
│   └── index.ts
└── types.ts                # Component types
```

### Props Interface

#### Always Define Props Separately

```typescript
// ✅ GOOD
interface MyComponentProps {
  title: string;
  count?: number;
  onUpdate?: (value: string) => void;
}

export default function MyComponent(props: MyComponentProps) {
  // ...
}

// ❌ BAD - Inline types
export default function MyComponent(props: {
  title: string;
  count?: number;
}) {
  // ...
}
```

### Custom Hooks Pattern

```typescript
// hooks/useFeature.ts
interface UseFeatureProps {
  id?: string;
  onSuccess?: () => void;
}

export function useFeature({ id, onSuccess }: UseFeatureProps = {}) {
  // RTK Query hooks
  const { data, isLoading, error } = useGetFeatureQuery(id!, { skip: !id });
  const [createMutation, { isLoading: isCreating }] = useCreateFeatureMutation();
  
  // Local state
  const [localState, setLocalState] = useState();
  
  // Derived state
  const computedValue = useMemo(() => {
    return data?.map(item => transform(item));
  }, [data]);
  
  // Handlers
  const handleAction = useCallback(async () => {
    try {
      await createMutation(payload).unwrap();
      onSuccess?.();
    } catch (e) {
      console.error(e);
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

### Form Components

#### React Hook Form + Zod Pattern

```typescript
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, Input, Button } from 'antd';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
});

interface FormData {
  name: string;
  email: string;
}

export default function MyForm({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  
  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="Name"
        validateStatus={errors.name ? 'error' : ''}
        help={errors.name?.message}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      
      <Button type="primary" htmlType="submit">Submit</Button>
    </Form>
  );
}
```

### Performance Optimization

#### React.memo

Use for expensive components that re-render frequently:

```typescript
import React, { memo } from 'react';

export default memo(function ExpensiveComponent({ data }: Props) {
  // Expensive rendering
});
```

#### useMemo

For expensive calculations:

```typescript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
```

#### useCallback

For handlers passed to child components:

```typescript
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);
```

### Error Handling

#### Error Boundaries

```typescript
import { ErrorBoundary } from '@/components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <YourComponent />
    </ErrorBoundary>
  );
}
```

#### Component Error Handling

```typescript
function MyComponent() {
  const { data, error, isLoading } = useGetDataQuery();
  
  if (error) {
    return <Alert type="error" message="Failed to load data" />;
  }
  
  if (isLoading) {
    return <Spin />;
  }
  
  return <div>{/* Render data */}</div>;
}
```

### File Size Limit

**NO FILES GREATER THAN 200 LINES**

If a component exceeds 200 lines:

1. **Extract sub-components**
2. **Extract logic to hooks**
3. **Extract types to separate files**
4. **Move utilities to separate files**

### Best Practices Checklist

- [ ] Component is under 200 lines
- [ ] Props interface is defined separately
- [ ] Logic is extracted to hooks
- [ ] Uses path aliases for imports
- [ ] Follows import order convention
- [ ] Handles loading and error states
- [ ] Uses proper TypeScript types
- [ ] No inline type definitions
- [ ] No business logic in component
- [ ] Uses React.memo if needed
- [ ] Proper key props for lists
- [ ] Cleanup in useEffect hooks

---

## Styling Guide

### Tailwind CSS

Use Tailwind for:
- Layout (flex, grid, spacing)
- Utility classes (margin, padding, colors)
- Responsive design

```typescript
<div className="flex items-center justify-between p-4 bg-white">
  Content
</div>
```

### Ant Design

Use Ant Design for:
- Complex components (Table, Form, Modal)
- Data display components
- Form inputs

```typescript
import { Button, Table, Form } from 'antd';

<Button type="primary">Click me</Button>
```

### Best Practices

- Prefer Tailwind for layout and spacing
- Use Ant Design for complex UI components
- Keep Tailwind classes readable (max 5-6 per element)
- Avoid inline styles unless necessary for dynamic values

---

## Testing

### Running Tests

```bash
npm run test
```

### Test Structure

```
src/
├── __tests__/
│   ├── components/
│   ├── hooks/
│   └── utils/
```

### Testing Guidelines

- Test components in isolation
- Test custom hooks
- Test utility functions
- Mock API calls in tests
- Use React Testing Library

---

## Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Environment Variables

Set production environment variables:
- `VITE_SSO_URL` - Production SSO URL
- `VITE_API_BASE_URL` - Production API URL
- `VITE_KEYCLOAK_REALM` - Keycloak realm

### Deployment Checklist

- [ ] Update environment variables
- [ ] Run build command
- [ ] Test production build locally
- [ ] Deploy to hosting platform
- [ ] Verify SSO integration
- [ ] Test API endpoints
- [ ] Check error handling

---

## Troubleshooting

### Common Issues

#### 1. Login not working

**Problem**: User clicks login but nothing happens

**Solution**: 
- Check `VITE_SSO_URL` in `.env`
- Verify SSO endpoint is accessible
- Check browser console for errors
- Ensure token extraction logic is correct

#### 2. API calls failing with 401

**Problem**: API requests return 401 Unauthorized

**Solution**:
- Check if token exists in localStorage
- Verify token is not expired
- Check `customFetchBase` is attaching token correctly
- Verify API endpoint expects Bearer token

#### 3. Import errors with path aliases

**Problem**: Cannot resolve path aliases

**Solution**:
- Check `tsconfig.json` paths configuration
- Verify `vite.config.ts` resolve aliases
- Restart development server
- Check import path starts with `@/`

#### 4. File exceeds 200 lines

**Problem**: Linter error about file size

**Solution**:
- Extract logic to custom hooks
- Split component into smaller components
- Move utilities to separate files
- Extract types to separate files

### Debugging Tips

1. **Check browser console** for errors
2. **Use React DevTools** for component debugging
3. **Use Redux DevTools** for state debugging
4. **Check network tab** for API requests
5. **Verify environment variables** are loaded correctly

---

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Ant Design Documentation](https://ant.design/)
- [Redux Toolkit Query](https://redux-toolkit.js.org/rtk-query/overview)
- [React Router](https://reactrouter.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Contributing

When contributing to this project:

1. Follow the coding standards in `.cursorrules`
2. Keep files under 200 lines
3. Extract logic to hooks
4. Use path aliases for imports
5. Write self-documenting code
6. Add JSDoc comments for complex functions
7. Test your changes thoroughly

## Support

For issues or questions:
- Check the troubleshooting section
- Review the README.md
- Check `.cursorrules` for coding standards
- Contact the development team
