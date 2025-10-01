# Cinema Platform Frontend

Movie streaming platform frontend built with React, TypeScript, Vite, and SASS.

## 🚀 Technologies

- **Framework**: React 19
- **Language**: TypeScript 5
- **Build Tool**: Vite
- **Styles**: SASS/SCSS
- **Router**: React Router DOM
- **HTTP Client**: Native Fetch API

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher
- Backend API running at `http://localhost:5000` (or configured in `.env`)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dhchicaiza/cinema_platform_front.git
   cd cinema_platform_front
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Edit `.env.local` with your backend URL**
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

## 🎯 Available Scripts

```bash
# Development server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── common/         # Header, Footer, Layout
│   ├── forms/          # Form components
│   ├── ui/             # Buttons, Modals, Cards
│   └── movies/         # Movie-specific components
├── pages/              # Main pages
│   ├── auth/           # Login, Register, ForgotPassword
│   ├── movies/         # Catalog, MovieDetail, Player
│   ├── user/           # Profile, Favorites
│   └── static/         # Home, About, Help
├── hooks/              # Custom React hooks
├── services/           # API calls (authService, movieService)
├── types/              # TypeScript type definitions
├── styles/             # SCSS files
│   ├── abstracts/      # Variables, mixins
│   ├── base/           # Reset, typography
│   ├── components/     # Component styles
│   └── layouts/        # Layouts and grid
├── utils/              # Utility functions
├── constants/          # App constants
└── main.tsx            # Entry point
```

## 🎨 Design System

### Color Palette

```scss
$color-primary: #e50914;        // Primary red (Netflix-style)
$bg-dark: #141414;              // Dark background
$bg-card: #1f1f1f;              // Card background
$color-white: #ffffff;
```

### Responsive Breakpoints

```scss
$breakpoint-xs: 320px;   // Small mobile
$breakpoint-sm: 576px;   // Mobile
$breakpoint-md: 768px;   // Tablet
$breakpoint-lg: 1024px;  // Desktop
$breakpoint-xl: 1280px;  // Large desktop
```

### Mixins Usage

```scss
@import 'styles/abstracts/variables';
@import 'styles/abstracts/mixins';

.my-component {
  @include flex-center;        // Centered flexbox
  @include button-primary;     // Primary button style
  @include card;               // Card style

  @include respond-to(md) {    // Responsive media query
    padding: $spacing-lg;
  }
}
```

## 🔐 Authentication

The authentication system uses JWT tokens stored in `localStorage`:

```typescript
// Login
const response = await authService.login({ email, password });
localStorage.setItem('cinema_auth_token', response.data.token);

// Authenticated requests
// Token is automatically sent in Authorization header
```

## 📡 API Services

### Usage Example

```typescript
import { authService } from './services/authService';

// Login
const response = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Get profile (requires authentication)
const profile = await authService.getProfile();
```

### API Response Structure

```typescript
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string | null;
  errors?: string[] | null;
}
```

## 🧩 Main Components (To Be Implemented)

### Sprint 1 - Authentication
- [ ] Main layout (Header, Footer)
- [ ] Login page
- [ ] Registration page
- [ ] Profile page
- [ ] Password recovery
- [ ] Protected routes

### Sprint 2 - Movies and Favorites
- [ ] Movie catalog
- [ ] Search and filters
- [ ] Favorites system
- [ ] Rating system

### Sprint 3 - Comments and Subtitles
- [ ] Video player
- [ ] Comments system
- [ ] Subtitles (ES/EN)

## 🎯 Project Status

**Current Sprint**: Sprint 1 Preparation
**Status**: Base structure created ✅

### Completed
- ✅ Initial Vite + React + TypeScript setup
- ✅ Folder structure according to architecture
- ✅ SASS configuration with variables and mixins
- ✅ TypeScript type system
- ✅ Base API service with fetch
- ✅ Authentication service
- ✅ Constants and configuration

### Pending
- [ ] Base UI components implementation
- [ ] Authentication pages
- [ ] Context API for global state
- [ ] Custom hooks (useAuth, useForm)
- [ ] Error handling and validations
- [ ] Routing system

## 🔧 Configuration

### TypeScript

The project uses TypeScript with strict configuration. Types are centralized in `src/types/index.ts`.

### Vite

Default Vite configuration for React + TypeScript. Development port: `5173`.

### SASS

Styles are organized following the 7-1 methodology:
- `abstracts/` - Variables and mixins
- `base/` - Reset and base styles
- `components/` - Component styles
- `layouts/` - Main layouts

## 📝 Code Conventions

### Naming
- **Components**: PascalCase (`LoginForm.tsx`)
- **Services**: camelCase (`authService.ts`)
- **Types**: PascalCase with I prefix for interfaces (`IUser`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)

### Comments
All files should include JSDoc:
```typescript
/**
 * @fileoverview File description
 * @description Additional details
 * @version 1.0.0
 * @author Cinema Platform Team
 * @since 2025-09-30
 */
```

### Imports
```typescript
// 1. External libraries
import React from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Services and utilities
import { authService } from '../services/authService';

// 3. Types
import { LoginData } from '../types';

// 4. Styles
import './LoginForm.scss';
```

## 🚀 Deployment

The frontend will be deployed on **Vercel** with automatic deployment from the `main` branch.

```bash
# Production build
npm run build

# Local preview of build
npm run preview
```

## 🐛 Troubleshooting

### Backend connection error
Verify that:
1. Backend is running at `http://localhost:5000`
2. `VITE_API_BASE_URL` variable is correctly configured in `.env.local`
3. CORS is enabled on the backend

### SASS styles not applying
1. Make sure to import `main.scss` in `main.tsx`
2. Verify the import path is correct

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [SASS Documentation](https://sass-lang.com/documentation/)
- [React Router](https://reactrouter.com/)

## 👥 Team

Cinema Platform Team

## 📄 License

ISC

---

**Cinema Platform Frontend** - Built with ❤️ for movie enthusiasts
