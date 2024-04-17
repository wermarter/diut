#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PARENT_DIR=$( dirname $SCRIPT_DIR )

kubectl=/snap/bin/kubectl

$kubectl -n diut delete secret minio-credentials

$kubectl delete -f $SCRIPT_DIR/argocd-application.yaml
