# Project Structure

## Monorepo Organization

```
diut/
├── apps/                    # Application packages
│   ├── hcdc-access-service/ # Main backend API (NestJS)
│   ├── browser-service/     # PDF generation service (NestJS)
│   └── hcdc-web-app/       # Frontend application (React)
├── libs/                    # Shared libraries
│   ├── common/             # Common utilities and types
│   ├── hcdc/               # Domain entities and business logic
│   ├── nestjs-infra/       # NestJS infrastructure adapters
│   └── services/           # Service definitions (gRPC, etc.)
├── k8s/                    # Kubernetes deployment configs
└── vendor/                 # Vendored dependencies
```

## NestJS Application Structure

Each NestJS app follows this pattern:
```
src/
├── app/                    # Feature modules (domain-driven)
│   ├── auth/              # Authentication module
│   ├── patient/           # Patient management
│   ├── sample/            # Sample tracking
│   └── [feature]/         # Other domain modules
├── config/                # Configuration modules
├── controller/            # API controllers (HTTP/gRPC)
├── domain/                # Domain interfaces and exceptions
├── infra/                 # Infrastructure adapters
├── main.ts               # Application entry point
└── otel.ts               # OpenTelemetry setup
```

## React Application Structure

```
src/
├── components/            # Reusable UI components
│   ├── form/             # Form-specific components
│   ├── layout/           # Layout components
│   ├── table/            # Table components
│   └── ui/               # Base UI components
├── features/             # Feature-based modules
│   ├── auth/            # Authentication
│   ├── patient/         # Patient management
│   └── [domain]/        # Other domain features
├── infra/               # Infrastructure (API, routing, theme)
├── shared/              # Shared utilities and types
└── main.tsx            # Application entry point
```

## Shared Libraries

- **@diut/common**: Cross-platform utilities, constants, and types
- **@diut/hcdc**: Domain entities, business logic, and authorization rules
- **@diut/nestjs-infra**: NestJS adapters for MongoDB, Redis, S3, etc.
- **@diut/services**: Service contracts and gRPC definitions

## Key Conventions

- **Domain-Driven Design**: Features organized by business domain
- **Workspace Dependencies**: Use `workspace:*` for internal packages
- **Module Metadata**: NestJS modules use `concatModuleMetadata` pattern
- **TypeScript Strict**: All packages use strict TypeScript configuration
- **Barrel Exports**: Each module exports through `index.ts` files
- **Environment Config**: `.env.local` files for local development