ARG APP_PATH=/usr/src/app

###################
# build
###################

FROM node:20-alpine AS build
ARG APP_PATH

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack prepare pnpm@9.1.2 --activate && corepack enable

COPY . ${APP_PATH}
WORKDIR ${APP_PATH}

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prefer-offline
RUN pnpm --filter "@diut/hcdc-access-service..." run build && pnpm prune --prod

###################
# runtime
###################

FROM node:20-alpine AS runtime
ARG APP_PATH

RUN apk add --no-cache tzdata tini && \
    cp /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime && \
    echo "Asia/Ho_Chi_Minh" > /etc/timezone

USER node
WORKDIR ${APP_PATH}
COPY --from=build ${APP_PATH} .

STOPSIGNAL SIGTERM

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "./apps/hcdc-access-service/dist/main.js"]
