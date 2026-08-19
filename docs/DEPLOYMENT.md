# Deployment Guide

The SkillSync AI frontend is built using Vite, making it extremely easy to deploy to static hosting services.

## Vercel Deployment (Recommended)
1. Push your repository to GitHub.
2. Log in to Vercel and click "Add New Project".
3. Select the `skillsync-ai` repository.
4. Set the **Framework Preset** to `Vite`.
5. Set the **Root Directory** to `frontend`.
6. Under Environment Variables, add:
   - `VITE_API_URL` (Pointing to your production Spring Boot backend)
7. Click **Deploy**.

## Netlify Deployment
1. Log in to Netlify and click "Add new site" > "Import an existing project".
2. Select your GitHub repository.
3. Configure the build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
4. Add the `VITE_API_URL` environment variable.
5. Click **Deploy Site**.

## Docker Deployment (Nginx)
If you prefer containerization:

```dockerfile
# Build Stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Add a custom nginx.conf to route all requests to index.html for React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
