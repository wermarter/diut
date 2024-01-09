###################
# DEVELOPMENT
###################

FROM node:20-alpine AS development

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack prepare pnpm@8.7.6 --activate
RUN corepack enable

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prefer-offline

CMD pnpm --filter "@diut/hcdc-web-app..." run --parallel dev

EXPOSE 5173

###################
# BUILD
###################

FROM development AS build

RUN pnpm --filter "@diut/hcdc-web-app" run build

###################
# FINAL
###################

FROM nginx:alpine AS production

COPY --from=build /usr/src/app/apps/hcdc-web-app/dist /usr/share/nginx/web-app

COPY --from=build /usr/src/app/apps/hcdc-web-app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
