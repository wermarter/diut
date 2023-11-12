# Project Diut

## How to run

Prepare your own MongoDB instance for [free](https://www.mongodb.com/atlas/database)

Install NodeJS 18 (recommend [nvm](https://github.com/nvm-sh/nvm))

Install NPM workspace dependencies

```bash
git clone https://github.com/wermarter/diut
cd diut/ && npm install
```

Backend configs in `apps/levansy-access-service/config.yml` and `apps/levansy-access-service/.env`

Frontend configs in `apps/levansy-web-app/.env`

Start everything!

```bash
yarn dev
```

## Generators

Scaffold new backend API resource in `apps/acess-server/src/resources`

```bash
cd apps/levansy-access-service
yarn g:resource "new resource" "new resources"
```

Auto-generate frontend API code from backend openAPI spec with configs in `apps/levansy-web-app/openapi-config.cts`

```bash
cd apps/levansy-web-app
yarn g:api
```

## Database scripting with NestJS

Should be run from `apps/levansy-access-service` with MongoDB's URI in `apps/levansy-access-service/.env`

```bash
cd apps/levansy-access-service && ./scripts/duplicate-test-element.ts
```
