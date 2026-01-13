#!/bin/bash
kubectl=/snap/bin/kubectl

$kubectl -n hcdc-dev delete configmap access-service-env
