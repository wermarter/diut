#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PARENT_DIR=$( dirname $SCRIPT_DIR )

echo -n 'admin' > $SCRIPT_DIR/admin-user
echo -n 'admin' > $SCRIPT_DIR/admin-password
kubectl -n observability create secret generic grafana-credentials --from-file=$SCRIPT_DIR/admin-user --from-file=$SCRIPT_DIR/admin-password

helm upgrade --install -n observability prometheus-stack $SCRIPT_DIR --render-subchart-notes