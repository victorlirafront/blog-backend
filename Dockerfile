# -------------------------------------------
# Build stage
# -------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build (includes compiled migrations inside dist/)
RUN npm run build


# -------------------------------------------
# Production stage
# -------------------------------------------
FROM node:20-alpine AS production

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs \
  && adduser -S nestjs -u 1001

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled app
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist

# Copy scripts used during production (e.g., migrations)
COPY --from=builder --chown=nestjs:nodejs /app/scripts ./scripts

# Copy entrypoint
COPY --chown=nestjs:nodejs docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

USER nestjs

EXPOSE 3001

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api || exit 1

ENTRYPOINT ["./docker-entrypoint.sh"]
