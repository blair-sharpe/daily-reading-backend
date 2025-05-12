#!/bin/bash

set -e

# 1. Start PostgreSQL Docker container
echo "🚀 Starting PostgreSQL test container..."
docker run --rm --name nest-e2e-db \
  -e POSTGRES_USER=root\
  -e POSTGRES_PASSWORD=root\
  -e POSTGRES_DB=readings\
  -p 5434:5432 \
  -d postgres

# 2. Wait for the DB to be ready
echo "⏳ Waiting for database to be ready..."
until docker exec nest-e2e-db pg_isready -U testuser > /dev/null 2>&1; do
  sleep 1
done

# 3. Seed the DB (adjust to your project)
echo "🌱 Running DB migrations and seeders..."
# You could use a migration command or just rely on `synchronize: true`
# Example: npx typeorm migration:run --dataSource=...

# 4. Run Jest E2E tests
echo "🧪 Running E2E tests..."
cross-env NODE_ENV=test jest --config jest-e2e.json

# 5. Stop and clean up Docker container
echo "🧹 Cleaning up..."
docker stop nest-e2e-db
