#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PARENT_DIR=$( dirname $SCRIPT_DIR )

echo -n 'minioadmin' > $SCRIPT_DIR/LOKI_MINIO_ACCESS_KEY
echo -n 'minioadmin' > $SCRIPT_DIR/LOKI_MINIO_SECRET_KEY
kubectl -n observability create secret generic loki-credentials --from-file=$SCRIPT_DIR/LOKI_MINIO_ACCESS_KEY --from-file=$SCRIPT_DIR/LOKI_MINIO_SECRET_KEY

helm upgrade --install -n observability loki $SCRIPT_DIR --render-subchart-notes