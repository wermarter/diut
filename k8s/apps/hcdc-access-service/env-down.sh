#!/bin/bash
kubectl=/snap/bin/kubectl

$kubectl -n hcdc delete configmap access-service-env
