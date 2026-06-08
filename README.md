# Multi-Vendor E-Commerce Marketplace

Production-oriented monorepo for a dynamic multi-vendor e-commerce marketplace.

## Current Status

Phase 0 foundation is scaffolded:

- npm workspace monorepo
- Express TypeScript API shell
- Next.js TypeScript web shell
- Shared contracts package
- Prisma schema for identity, RBAC, catalog, commerce, CMS, and business configuration
- Seed script for default roles, permissions, order statuses, global commission, and admin user
- Docker Compose for PostgreSQL and Redis
- OpenAPI documentation mount at `/docs`

## Local Setup

1. Install dependencies:

```powershell
npm.cmd install
```

2. Copy environment files:

```powershell
Copy-Item .env.example .env
Copy-Item apps/api/.env.example apps/api/.env
Copy-Item apps/web/.env.example apps/web/.env.local
```

3. Start infrastructure:

```powershell
docker compose up -d
```

4. Generate Prisma client and migrate:

```powershell
npm.cmd run prisma:generate
npm.cmd run prisma:migrate
npm.cmd run prisma:seed
```

5. Start development servers:

```powershell
npm.cmd run dev
```

## Default Seed Admin

- Email: `admin@example.com`
- Password: `ChangeMeNow!12345`

Change this immediately after first login in any real environment.

## Architecture Notes

The backend is organized by clean architecture boundaries: routes, controllers, validators, services, repositories, middleware, config, database, and shared utilities. The frontend uses Next.js App Router with route areas for storefront, admin, vendor, and account experiences.

All configurable business concepts should be stored in PostgreSQL and exposed through admin workflows. Default seed data is allowed only as editable initial configuration.
