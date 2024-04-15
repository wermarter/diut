#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PARENT_DIR=$( dirname $SCRIPT_DIR )

# echo -n 'AWS_ACCESS_KEY_ID' > AWS_ACCESS_KEY_ID
# echo -n 'AWS_SECRET_ACCESS_KEY' > AWS_SECRET_ACCESS_KEY

kubectl=/snap/bin/kubectl

$kubectl create ns core
$kubectl apply -f $SCRIPT_DIR/contour-gateway-provisioner.yaml
helm upgrade --install -n core core $SCRIPT_DIR --render-subchart-notes