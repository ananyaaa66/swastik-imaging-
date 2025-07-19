# ---- Build Frontend ----
FROM node:20 AS frontend-builder
WORKDIR /app

# Copy only package.json and lock file first for caching
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./
COPY public/ ./public/
COPY src/ ./src/
RUN npm ci
RUN npm run build

# ---- Build Backend ----
FROM node:20 AS backend

WORKDIR /app

# Install backend dependencies
COPY swastik\ backend/package*.json ./swastik-backend/
RUN cd swastik-backend && npm ci

# Copy backend code
COPY swastik\ backend ./swastik-backend

# Copy frontend build output to backend (if backend is serving static files)
COPY --from=frontend-builder /app/dist ./swastik-backend/public

# Set env (add your own)
ENV NODE_ENV=production

# Expose backend port (adjust if your backend uses another)
EXPOSE 5000

WORKDIR /app/swastik-backend

CMD ["node", "server.js"]
