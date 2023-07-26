###################
# DEVELOPMENT
###################

FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY . .

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN npm i --workspace=@diut/common --workspace=@diut/access-server --include-workspace-root

RUN apk add --no-cache tzdata
RUN cp /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime
RUN echo "Asia/Ho_Chi_Minh" > /etc/timezone

RUN apk add --no-cache mongodb-tools
RUN apk add --no-cache chromium
RUN apk add --no-cache msttcorefonts-installer fontconfig && \
    update-ms-fonts && \
    fc-cache -f

EXPOSE 8081
EXPOSE 5000

CMD npx nx run-many -t dev -p @diut/access-server @diut/common

###################
# BUILD 
###################

FROM development AS build

RUN npx nx run @diut/access-server:build

RUN npm prune --omit=dev --workspaces --include-workspace-root
RUN npm cache clean --force

###################
# FINAL
###################

FROM node:18-alpine AS final

RUN apk add --no-cache tzdata
RUN cp /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime
RUN echo "Asia/Ho_Chi_Minh" > /etc/timezone

RUN apk add --no-cache mongodb-tools
RUN apk add --no-cache tini
RUN apk add --no-cache chromium
RUN apk add --no-cache msttcorefonts-installer fontconfig && \
    update-ms-fonts && \
    fc-cache -f

USER node

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/libs/common/package.json ./node_modules/@diut/common/package.json
COPY --from=build /usr/src/app/libs/common/dist ./node_modules/@diut/common/dist

COPY --from=build /usr/src/app/apps/access-server/dist ./dist

EXPOSE 8081
EXPOSE 5000

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "dist/main.js"]
