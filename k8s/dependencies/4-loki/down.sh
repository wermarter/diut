#!/bin/bash

kubectl=/snap/bin/kubectl

$kubectl -n observability delete secret loki-credentials

$kubectl delete -f argocd-application.yaml
