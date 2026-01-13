#!/bin/bash
kubectl=/snap/bin/kubectl

$kubectl -n infra-dev delete configmap browser-service-env
