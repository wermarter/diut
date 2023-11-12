docker build -t wermarter/diut-levansy-web-app:dev --target production -f ./apps/levansy-web-app/Dockerfile  .
docker push wermarter/diut-levansy-web-app:dev