# Install dependencies only when needed
FROM nwylynko/bun:0.2.1-alpine AS deps

WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install

FROM nwylynko/bun:0.2.1-alpine as schema

WORKDIR /app
COPY schema.graphql ./
COPY ./scripts ./scripts

RUN bun install zod

RUN bun run ./scripts/schema.ts validate http://35.232.159.102:8080 ./schema.graphql
RUN bun run ./scripts/schema.ts push http://35.232.159.102:8080 ./schema.graphql

FROM node:18.11.0-alpine as gen

WORKDIR /app

RUN yarn add @genql/cli

RUN yarn genql --endpoint http://35.232.159.102:8080/graphql --output ./generated

# Rebuild the source code only when needed
FROM node:18.11.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=gen /app/generated ./generated
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM node:18.11.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]