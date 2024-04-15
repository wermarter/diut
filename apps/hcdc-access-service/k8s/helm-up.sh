#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PARENT_DIR=$( dirname $SCRIPT_DIR )

docker build -t wermarter/diut-hcdc-access-service:0 -f  ./apps/hcdc-access-service/k8s/Dockerfile . && \
docker push wermarter/diut-hcdc-access-service:0 && \
yq -i '.appVersion = "0"' $SCRIPT_DIR/helm-chart/Chart.yaml && \
helm upgrade --install -n diut-hcdc hcdc-access-service-local $SCRIPT_DIR/helm-chart --render-subchart-notes