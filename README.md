# Project Diut

## How to install

Prepare your own MongoDB instance for [free](https://www.mongodb.com/atlas/database)

Install NodeJS 18 (recommend [nvm](https://github.com/nvm-sh/nvm))

`corepack enable` to install Yarn v1

`git clone https://github.com/wermarter/diut`

`cd diut/ && yarn` to install all dependencies in this Yarn workspace

## What to run

## Backend

`yarn be` to start NestJS server in "--watch" mode, config in `apps/access-server/config.yml`

`cd apps/access-server && yarn g:resource "new resource" "new resources"` to generate `new-resource` in `src/resources`

## Frontend

`yarn fe` to start ViteJS dev server with configs from `apps/web-app/.env`

`cd apps/web-app && yarn g:rtk` to generate API from backend openAPI spec, configs in `apps/web-app/openapi-config.cts`

## Lib common

`yarn common` to update `@diut/common` package in backend services
