docker build -t wermarter/diut-hcdc-access-service:dev --target production -f ./apps/hcdc-access-service/Dockerfile  .
docker push wermarter/diut-hcdc-access-service:dev