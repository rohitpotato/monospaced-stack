# Static export: Node builds `out/`, nginx serves files. Traefik routes to this pod.
FROM node:24-alpine AS build
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/out/ .
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
