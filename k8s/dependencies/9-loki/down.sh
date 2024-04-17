#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PARENT_DIR=$( dirname $SCRIPT_DIR )

kubectl=/snap/bin/kubectl

$kubectl -n observability delete secret loki-credentials

$kubectl delete -f $SCRIPT_DIR/argocd-application.yaml
