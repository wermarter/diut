#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

helm upgrade --wait --install -n observability otel $SCRIPT_DIR --render-subchart-notes
kubectl apply -f $SCRIPT_DIR/lowa.yaml
