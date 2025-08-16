# Technology Stack

## Build System & Package Management
- **Package Manager**: pnpm with workspace configuration
- **Node.js**: Version 20 (specified in engines)
- **Monorepo**: pnpm workspaces with apps and libs structure

## Backend Stack
- **Framework**: NestJS with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Cache**: Redis
- **Authentication**: JWT with argon2 password hashing
- **Authorization**: CASL for permissions
- **File Storage**: AWS S3 compatible (MinIO)
- **PDF Generation**: Puppeteer + pdf-lib
- **Observability**: OpenTelemetry with Prometheus metrics and distributed tracing

## Frontend Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **State Management**: Redux Toolkit with RTK Query
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router v6

## Development & Deployment
- **Containerization**: Docker with Kubernetes deployment
- **CI/CD**: ArgoCD for GitOps
- **Code Quality**: Prettier, TypeScript strict mode, syncpack for dependency management

## Common Commands

### Root Level
```bash
# Install dependencies
pnpm install

# Build all libraries
pnpm build-libs

# Run development mode for all libs
pnpm dev

# Lint all packages
pnpm lint
```

### Backend Services (NestJS)
```bash
# Development with hot reload
pnpm dev

# Build for production
pnpm build

# Type checking and linting
pnpm lint
```

### Frontend (React)
```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Generate API client from OpenAPI
pnpm api:access-service
```

### Kubernetes
```bash
# Deploy with Helm
./helm-up.sh

# Deploy with ArgoCD
./argo-up.sh
```