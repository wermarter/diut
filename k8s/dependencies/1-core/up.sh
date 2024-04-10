#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PARENT_DIR=$( dirname $SCRIPT_DIR )

kubectl create ns core
kubectl create ns longhorn-system
kubectl apply -f $SCRIPT_DIR/contour-gateway-provisioner.yaml
helm upgrade --install -n core core $SCRIPT_DIR --render-subchart-notes
