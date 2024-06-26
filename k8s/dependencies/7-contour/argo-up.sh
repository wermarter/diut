#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

kubectl=/snap/bin/kubectl

$kubectl apply -f $SCRIPT_DIR/contour-gateway-provisioner.yaml
$kubectl apply -f $SCRIPT_DIR/argocd-application.yaml