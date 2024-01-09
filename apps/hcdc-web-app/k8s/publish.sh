docker build -t wermarter/diut-hcdc-web-app:dev --target production -f ./apps/hcdc-web-app/Dockerfile  .
docker push wermarter/diut-hcdc-web-app:dev