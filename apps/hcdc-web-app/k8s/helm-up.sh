#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PARENT_DIR=$( dirname $SCRIPT_DIR )

docker build -t wermarter/diut-hcdc-web-app:0 -f  ./apps/hcdc-web-app/k8s/Dockerfile . && \
docker push wermarter/diut-hcdc-web-app:0 && \
yq -i '.appVersion = "0"' $SCRIPT_DIR/helm-chart/Chart.yaml && \
helm upgrade --install -n diut-hcdc hcdc-web-app-local $SCRIPT_DIR/helm-chart --render-subchart-notes