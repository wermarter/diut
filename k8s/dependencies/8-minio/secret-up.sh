#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

kubectl=/snap/bin/kubectl

# echo -n 'minioadmin' > root-user
# echo -n 'minioadmin' > root-password
$kubectl -n infra create secret generic minio-credentials --from-file=$SCRIPT_DIR/root-user --from-file=$SCRIPT_DIR/root-password
