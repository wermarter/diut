#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

kubectl=/snap/bin/kubectl

$kubectl apply -f $SCRIPT_DIR/contour-gateway-provisioner.yaml
helm upgrade --install -n core contour $SCRIPT_DIR --render-subchart-notes