#!/bin/bash

kubectl=/snap/bin/kubectl

$kubectl -n diut delete secret mongodb-credentials

$kubectl delete -f argocd-application.yaml