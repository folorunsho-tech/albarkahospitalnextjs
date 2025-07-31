# Dependencies stage
FROM node:lts-alpine3.21 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --force && npm cache clean --force

# Builder stage
FROM node:lts-alpine3.21 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Accept build argument and set as environment variable
ARG NEXT_PUBLIC_SERVER_API
ENV NEXT_PUBLIC_SERVER_API=$NEXT_PUBLIC_SERVER_API
ENV NEXT_TELEMETRY_DEBUG=1

RUN npm run build

# Runner stage
FROM node:lts-alpine3.21 AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 5143

CMD ["node", "server.js"]