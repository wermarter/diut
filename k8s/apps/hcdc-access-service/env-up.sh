#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
APP_DIR=$SCRIPT_DIR/../../../apps/hcdc-access-service

kubectl=/snap/bin/kubectl

$kubectl -n hcdc create configmap --from-env-file $APP_DIR/.env access-service-env