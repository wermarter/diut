# Project Diut

## How to run

Prepare your own MongoDB instance for [free](https://www.mongodb.com/atlas/database)

Install NodeJS 18 (recommend [nvm](https://github.com/nvm-sh/nvm))

`corepack enable` to install Yarn v1

`git clone https://github.com/wermarter/diut`

`cd diut/ && yarn` to install all dependencies in this Yarn workspace

Backend configs in `apps/access-server/config.yml`

Frontend configs in `apps/web-app/.env`

`yarn dev` to start everything!

## Tooling

`cd apps/access-server && yarn g:resource "new resource" "new resources"` to generate `new-resource` in `src/resources`

`cd apps/web-app && yarn g:rtk` to generate API from backend openAPI spec with configs in `apps/web-app/openapi-config.cts`
