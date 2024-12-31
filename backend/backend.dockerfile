# Build Stage
FROM node:lts AS builder

# Set working directory
WORKDIR /app

# Copy only package files first (for caching npm install)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema and migrations
COPY prisma ./prisma/

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Remove development dependencies
# RUN npm prune --production

# Production Stage
FROM node:lts AS runtime

WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app /app

ENV NODE_ENV=production

EXPOSE 4000

CMD ["npm", "run", "start"]
