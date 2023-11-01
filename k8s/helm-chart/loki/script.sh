echo -n 'minioadmin' > ./LOKI_MINIO_ACCESS_KEY
echo -n 'minioadmin' > ./LOKI_MINIO_SECRET_KEY

kubectl -n observability create secret generic loki-credentials --from-file=./LOKI_MINIO_ACCESS_KEY --from-file=LOKI_MINIO_SECRET_KEY