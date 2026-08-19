# Architecture Overview

The SkillSync AI frontend is a Single Page Application (SPA) built with React and Vite. It utilizes a modular, feature-based directory structure to support three distinct user roles (Student, Recruiter, Admin) within a single unified codebase.

## Directory Structure

```text
frontend/
├── public/                 # Static assets (images, icons)
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Buttons, Cards, Loaders, Toasts
│   │   └── ...
│   ├── context/            # React Context (AuthContext)
│   ├── layouts/            # Role-specific layouts (Sidebar, Topbar)
│   │   ├── StudentLayout.jsx
│   │   ├── RecruiterLayout.jsx
│   │   └── AdminLayout.jsx
│   ├── pages/              # Application Pages
│   │   ├── admin/          # Admin Portal pages
│   │   ├── auth/           # Login, Register, Password Reset
│   │   ├── error/          # 404, 500 pages
│   │   ├── public/         # Landing Page
│   │   ├── recruiter/      # Recruiter Portal pages
│   │   └── student/        # Student Portal & AI features
│   ├── services/           # API integration logic
│   │   └── api.js          # Axios instance with Interceptors
│   ├── App.jsx             # Main Routing tree & Lazy Loading configuration
│   ├── index.css           # Tailwind & Global CSS
│   └── main.jsx            # React Bootstrap
```

## Security & Routing
- `react-router-dom` handles client-side routing.
- The `ProtectedRoute.jsx` component validates the user's `role` against the route's `allowedRoles` array.
- JWT tokens are stored in `localStorage` and automatically attached to API requests via Axios interceptors.
