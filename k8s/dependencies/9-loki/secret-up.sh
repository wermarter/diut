#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

kubectl=/snap/bin/kubectl

# echo -n 'minioadmin' > LOKI_MINIO_ACCESS_KEY
# echo -n 'minioadmin' > LOKI_MINIO_SECRET_KEY
$kubectl -n observability create secret generic loki-credentials --from-file=$SCRIPT_DIR/LOKI_MINIO_ACCESS_KEY --from-file=$SCRIPT_DIR/LOKI_MINIO_SECRET_KEY
