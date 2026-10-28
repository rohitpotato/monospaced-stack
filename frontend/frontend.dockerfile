# Static export: Node builds `out/`, nginx serves files. Traefik routes to this pod.
FROM node:24-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/out/ .
# nginx:alpine renders /etc/nginx/templates/*.template with envsubst at startup.
# Only defined env vars are replaced, so nginx's own $variables are left alone.
ENV NODE_NAME=unknown
COPY nginx.conf /etc/nginx/templates/default.conf.template
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
