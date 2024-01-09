#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PARENT_DIR=$( dirname $SCRIPT_DIR )

helm upgrade --install -n diut-hcdc access-service $SCRIPT_DIR/helm-chart --render-subchart-notes