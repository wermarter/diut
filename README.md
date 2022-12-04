# Project Diut

## How to run

Prepare your own MongoDB instance for [free](https://www.mongodb.com/atlas/database)

Install NodeJS 16 (recommend [nvm](https://github.com/nvm-sh/nvm))

Install Yarn v1

```bash
corepack enable
```

Install Yarn workspace dependencies

```bash
git clone https://github.com/wermarter/diut
cd diut/ && yarn
```

Backend configs in `apps/access-server/config.yml`

Frontend configs in `apps/web-app/.env`

Start everything!

```bash
yarn dev
```

## Generators

Scaffold new backend API resource in `apps/acess-server/src/resources`

```bash
cd apps/access-server
yarn g:resource "new resource" "new resources"
```

Auto-generate frontend API code from backend openAPI spec with configs in `apps/web-app/openapi-config.cts`

```bash
cd apps/web-app
yarn g:api
```

## Database scripting with NestJS

Should be run from `apps/access-server` with MongoDB's URI in `apps/access-server/.env`

```bash
cd apps/access-server && ./scripts/duplicate-test-element.ts
```
