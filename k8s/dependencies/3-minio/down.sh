#!/bin/bash

kubectl=/snap/bin/kubectl

$kubectl -n observability delete secret minio-credentials

$kubectl delete -f argocd-application.yaml
