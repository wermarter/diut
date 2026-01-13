#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
APP_DIR=$SCRIPT_DIR/../../../apps/browser-service

kubectl=/snap/bin/kubectl

$kubectl -n infra create configmap --from-env-file $APP_DIR/.env browser-service-env