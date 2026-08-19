# Installation Guide

## Prerequisites
- Node.js (v18+)
- npm (v9+)
- A running instance of the SkillSync Spring Boot Backend (default: `localhost:8080`)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/skillsync-ai.git
   cd skillsync-ai/frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Copy the example environment file and update the values:
   ```bash
   cp .env.example .env.local
   ```
   *Ensure `VITE_API_URL` points to your Spring Boot instance.*

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

5. **Production Build**
   To build for production, run:
   ```bash
   npm run build
   ```
   The optimized files will be output to the `dist/` directory.
