ARG APP_PATH=/usr/src/app

###################
# build
###################

FROM node:20-alpine AS build
ARG APP_PATH

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack prepare pnpm@8.15.7 --activate && corepack enable

COPY . ${APP_PATH}
WORKDIR ${APP_PATH}

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prefer-offline
RUN pnpm --filter "@diut/hcdc-web-app..." run build

###################
# runtime
###################

FROM nginx:alpine AS production
ARG APP_PATH

RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime && \
    echo "Asia/Ho_Chi_Minh" > /etc/timezone

COPY --from=build ${APP_PATH}/apps/hcdc-web-app/dist /usr/share/nginx/web-app
COPY --from=build ${APP_PATH}/apps/hcdc-web-app/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
