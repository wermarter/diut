#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PARENT_DIR=$( dirname $SCRIPT_DIR )

kubectl=/snap/bin/kubectl

# echo -n 'minioadmin' > root-user
# echo -n 'minioadmin' > root-password
$kubectl -n diut create secret generic minio-credentials --from-file=$SCRIPT_DIR/root-user --from-file=$SCRIPT_DIR/root-password

$kubectl apply -f $SCRIPT_DIR/argocd-application.yaml
