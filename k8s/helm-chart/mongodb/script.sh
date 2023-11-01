echo -n 'password' > ./mongodb-root-password
openssl rand -base64 756 > ./mongodb-replica-set-key

kubectl create ns diut
kubectl -n diut create secret generic mongodb-credentials --from-file=./mongodb-root-password --from-file=./mongodb-replica-set-key