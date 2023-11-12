docker build -t wermarter/diut-levansy-access-service:dev --target production -f ./apps/levansy-access-service/Dockerfile  .
docker push wermarter/diut-levansy-access-service:dev