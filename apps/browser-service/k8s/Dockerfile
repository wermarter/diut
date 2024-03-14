###################
# base
###################

FROM node:20-alpine AS base

RUN apk add --no-cache tzdata
RUN cp /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime
RUN echo "Asia/Ho_Chi_Minh" > /etc/timezone

RUN apk add --no-cache chromium
RUN apk add --no-cache msttcorefonts-installer fontconfig && \
    update-ms-fonts && \
    fc-cache -f

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack prepare pnpm@8.7.6 --activate
RUN corepack enable

COPY . /usr/src/app

WORKDIR /usr/src/app

###################
# development
###################

FROM base AS development

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prefer-offline

CMD pnpm --filter "@diut/browser-service..." run --parallel dev

###################
# build 
###################

FROM development AS build

RUN pnpm --filter "@diut/browser-service" run build

RUN pnpm prune --prod

###################
# production
###################

FROM node:20-alpine AS production

RUN apk add --no-cache tzdata
RUN cp /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime
RUN echo "Asia/Ho_Chi_Minh" >  /etc/timezone

RUN apk add --no-cache chromium
RUN apk add --no-cache msttcorefonts-installer fontconfig && \
    update-ms-fonts && \
    fc-cache -f

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN apk add --no-cache tini

USER node

WORKDIR /usr/src/app

COPY --from=build /usr/src/app .

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "./apps/browser-service/dist/main.js"]
