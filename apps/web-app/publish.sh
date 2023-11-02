docker build -t localhost:5000/diut_bathanghai_web:11 --target production -f ./apps/web-app/Dockerfile  .
docker push localhost:5000/diut_bathanghai_web:11