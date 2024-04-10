#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PARENT_DIR=$( dirname $SCRIPT_DIR )

helm uninstall -n core core
kubectl delete -f $SCRIPT_DIR/contour-gateway-provisioner.yaml
kubectl delete ns core
kubectl delete ns longhorn-system