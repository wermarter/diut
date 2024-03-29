#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PARENT_DIR=$( dirname $SCRIPT_DIR )

echo -n 'password' > $SCRIPT_DIR/mongodb-root-password
openssl rand -base64 756 > $SCRIPT_DIR/mongodb-replica-set-key
kubectl -n diut create secret generic mongodb-credentials --from-file=$SCRIPT_DIR/mongodb-root-password --from-file=$SCRIPT_DIR/mongodb-replica-set-key

helm upgrade --install -n diut mongodb $SCRIPT_DIR --render-subchart-notes