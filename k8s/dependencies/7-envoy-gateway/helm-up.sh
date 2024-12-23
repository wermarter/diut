#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

kubectl=/snap/bin/kubectl

helm upgrade --install -n envoy-gateway-system envoy-gateway $SCRIPT_DIR --render-subchart-notes --create-namespace