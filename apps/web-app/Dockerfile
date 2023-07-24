###################
# DEVELOPMENT
###################

FROM node:18 AS development

WORKDIR /usr/src/app

COPY . .

RUN npm i --workspace=@diut/common --workspace=@diut/web-app --include-workspace-root

EXPOSE 5173

CMD npx nx run-many -t dev -p @diut/web-app @diut/common

###################
# BUILD
###################

FROM development as build

# WORKDIR /usr/src/app ?

RUN npx nx run @diut/web-app:build

###################
# FINAL
###################

FROM nginx:alpine as final

COPY --from=build /usr/src/app/apps/web-app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
