#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

kubectl=/snap/bin/kubectl

# echo -n 'minioadmin' > TEMPO_MINIO_ACCESS_KEY
# echo -n 'minioadmin' > TEMPO_MINIO_SECRET_KEY
$kubectl -n observability create secret generic tempo-credentials --from-file=$SCRIPT_DIR/TEMPO_MINIO_ACCESS_KEY --from-file=$SCRIPT_DIR/TEMPO_MINIO_SECRET_KEY
