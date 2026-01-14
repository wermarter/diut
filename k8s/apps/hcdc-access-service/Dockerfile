ARG APP_PATH=/usr/src/app

###################
# build
###################

FROM oven/bun:1.3.5-alpine AS build
ARG APP_PATH

COPY . ${APP_PATH}
WORKDIR ${APP_PATH}

RUN bun install --frozen-lockfile && \
    bun run build-libs
RUN bun run --filter "@diut/hcdc-access-service" build

###################
# runtime
###################

FROM oven/bun:1.3.5-alpine AS runtime
ARG APP_PATH

RUN apk add --no-cache tzdata tini && \
    cp /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime && \
    echo "Asia/Ho_Chi_Minh" > /etc/timezone

WORKDIR ${APP_PATH}
COPY --from=build ${APP_PATH} .

STOPSIGNAL SIGTERM

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["bun", "./apps/hcdc-access-service/dist/main.js"]
