docker build -t localhost:5000/diut_bathanghai_server:11 --target production -f ./apps/bathanghai-server/Dockerfile  .
docker push localhost:5000/diut_bathanghai_server:11