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

RUN npm prune --production

ENV NODE_ENV=production
ENV PORT=5001

EXPOSE 5001

CMD ["npm", "run", "start"]
