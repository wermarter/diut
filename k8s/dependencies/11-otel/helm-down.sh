#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

kubectl delete -f $SCRIPT_DIR/lowa.yaml
helm uninstall -n observability otel
kubectl delete secret -n observability otel-opentelemetry-operator-controller-manager-service-cert