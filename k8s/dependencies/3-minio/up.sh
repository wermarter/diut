#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PARENT_DIR=$( dirname $SCRIPT_DIR )

echo -n 'minioadmin' > $SCRIPT_DIR/root-user
echo -n 'minioadmin' > $SCRIPT_DIR/root-password
kubectl -n diut create secret generic minio-credentials --from-file=$SCRIPT_DIR/root-user --from-file=$SCRIPT_DIR/root-password

helm upgrade --install -n diut minio $SCRIPT_DIR --render-subchart-notes