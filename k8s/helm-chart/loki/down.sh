#!/bin/bash

helm uninstall -n observability loki
kubectl -n observability delete secret loki-credentials