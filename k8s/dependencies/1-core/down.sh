#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PARENT_DIR=$( dirname $SCRIPT_DIR )

kubectl=/snap/bin/kubectl

$kubectl -n longhorn-system patch -p '{"value": "true"}' --type=merge lhs deleting-confirmation-flag
helm uninstall -n core core
$kubectl delete -f $SCRIPT_DIR/contour-gateway-provisioner.yaml
$kubectl delete ns core
$kubectl delete ns longhorn-system