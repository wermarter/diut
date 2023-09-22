###################
# DEVELOPMENT
###################

FROM node:20-alpine AS development

WORKDIR /usr/src/app

COPY . .

RUN corepack enable

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prefer-offline

EXPOSE 5173

CMD pnpm --filter "@diut/common" --filter "@diut/web-app" run --parallel dev

###################
# BUILD
###################

FROM development AS build

CMD pnpm --filter "@diut/common" --filter "@diut/web-app" run --stream build

###################
# FINAL
###################

FROM nginx:alpine AS final

COPY --from=build /usr/src/app/apps/web-app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
