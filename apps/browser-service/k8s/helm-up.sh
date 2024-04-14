#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PARENT_DIR=$( dirname $SCRIPT_DIR )

docker build -t wermarter/diut-browser-service:0 -f ./apps/browser-service/k8s/Dockerfile . && \
docker push wermarter/diut-browser-service:0 && \
yq -i '.appVersion = "0"' $SCRIPT_DIR/helm-chart/Chart.yaml && \
helm upgrade --install -n diut browser-service-local $SCRIPT_DIR/helm-chart --render-subchart-notes