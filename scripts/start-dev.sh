#!/bin/sh
set -e

echo "Running database migrations (development)..."

npm run migration:run || {
  echo "Migration failed or no migrations to run (this is OK if already applied)"
}

echo "Starting development server..."
exec npm run start:dev
