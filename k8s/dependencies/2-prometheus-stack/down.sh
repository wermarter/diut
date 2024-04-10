#!/bin/bash

helm uninstall -n observability prometheus-stack
kubectl -n observability delete secret grafana-credentials