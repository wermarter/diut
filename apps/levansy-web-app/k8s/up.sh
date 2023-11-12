#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PARENT_DIR=$( dirname $SCRIPT_DIR )

helm upgrade --install -n diut-levansy web-app $SCRIPT_DIR/helm-chart --render-subchart-notes