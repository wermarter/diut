ARG APP_PATH=/usr/src/app

###################
# build
###################

FROM oven/bun:1.3.5-alpine AS build
ARG APP_PATH

COPY . ${APP_PATH}
WORKDIR ${APP_PATH}

RUN bun install --frozen-lockfile
RUN bun run --filter "@diut/hcdc-web-app" build

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
