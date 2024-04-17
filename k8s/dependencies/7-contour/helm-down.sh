#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

kubectl=/snap/bin/kubectl

helm uninstall -n core contour
$kubectl delete -f $SCRIPT_DIR/contour-gateway-provisioner.yaml