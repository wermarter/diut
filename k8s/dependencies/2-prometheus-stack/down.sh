#!/bin/bash

kubectl=/snap/bin/kubectl

$kubectl -n observability delete secret grafana-credentials

$kubectl delete -f argocd-application.yaml