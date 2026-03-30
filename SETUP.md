# Setup Instructions

## Prerequisites
- Node.js 18+ 
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```
VITE_SSO_URL=https://sso.ikameglobal.com
VITE_API_BASE_URL=http://localhost:3000/api
VITE_KEYCLOAK_REALM=ikame-platform
```

## Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

See `README.md` for detailed project structure and coding standards.

## Keycloak SSO Integration

The app uses Keycloak SSO for authentication. When a user visits the app:

1. If not authenticated, they are redirected to SSO login
2. After successful login, SSO redirects back with `ssoToken` in URL hash
3. Token is extracted and stored in localStorage
4. Token is automatically attached to all API requests via RTK Query

## Example Page

The Example page demonstrates:
- RTK Query for API calls
- React Hook Form + Zod for form validation
- Ant Design components
- Protected routes
