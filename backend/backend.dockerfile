# Build Stage
FROM node:lts AS builder

# Set working directory
WORKDIR /app

# Copy only package files first (for caching npm install)
COPY package.json package-lock.json ./

# Install ALL dependencies (including dev dependencies for build)
RUN npm ci

# Copy all source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production Stage
FROM node:lts AS runtime
WORKDIR /app

COPY --from=builder /app /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5001

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5001/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

EXPOSE 5001

# Use exec form and add error handling
CMD ["sh", "-c", "npm run start || (echo 'Server failed to start' && exit 1)"]
