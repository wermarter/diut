echo -n 'minioadmin' > ./root-user
echo -n 'minioadmin' > ./root-password

kubectl create ns diut
kubectl -n diut create secret generic minio-credentials --from-file=./root-user --from-file=root-password