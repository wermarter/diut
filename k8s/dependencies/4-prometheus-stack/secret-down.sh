#!/bin/bash

kubectl=/snap/bin/kubectl

$kubectl -n observability delete secret grafana-credentials
