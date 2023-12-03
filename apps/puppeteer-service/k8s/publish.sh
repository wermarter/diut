docker build -t wermarter/diut-puppeteer-service:dev --target production -f ./apps/puppeteer-service/Dockerfile  .
docker push wermarter/diut-puppeteer-service:dev