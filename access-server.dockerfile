###################
# DEVELOPMENT
###################

FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN mkdir -p ./libs/common
COPY libs/common/package.json ./libs/common

RUN mkdir -p ./apps/access-server
COPY apps/access-server/package.json ./apps/access-server

RUN mkdir -p ./apps/web-app
COPY apps/web-app/package.json ./apps/web-app

RUN npm ci --include-workspace-root -workspace=@diut/common -workspace=@diut/access-server

###################
# BUILD 
###################

FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/node_modules ./node_modules

COPY . .

RUN npx nx run @diut/access-server:build

RUN npm prune --omit=dev --include-workspace-root -workspace=@diut/common -workspace=@diut/access-server && npm cache clean --force

###################
# PRODUCTION
###################

FROM node:18-alpine AS production

RUN apk add --no-cache tini

USER node

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/libs/common ./node_modules/@diut/common

COPY --from=build /usr/src/app/apps/access-server/dist ./dist

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "dist/main.js"]
