#!/bin/sh
set -e

echo "📦 Running database migrations..."

MAX_RETRIES=3
RETRY_DELAY=5
ATTEMPT=1

# Run migrations with retries
while [ "$ATTEMPT" -le "$MAX_RETRIES" ]; do
  echo "🔄 Migration attempt $ATTEMPT/$MAX_RETRIES..."

  # Try to run migrations
  if npm run typeorm:migration:run; then
    echo "✅ Migrations completed successfully"
    break
  fi

  # If failed but not last attempt → retry
  if [ "$ATTEMPT" -lt "$MAX_RETRIES" ]; then
    echo "⚠️  Migration attempt $ATTEMPT failed, retrying in ${RETRY_DELAY}s..."
    sleep "$RETRY_DELAY"
    ATTEMPT=$((ATTEMPT + 1))
  else
    # Last attempt failed
    echo "⚠️  Migration failed after $MAX_RETRIES attempts"
    echo "⚠️  Continuing anyway — migrations may already be applied."
    break
  fi
done

echo "🚀 Starting application..."
exec node dist/main.js
