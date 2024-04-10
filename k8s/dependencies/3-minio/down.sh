#!/bin/bash

helm uninstall -n diut minio
kubectl -n diut delete secret minio-credentials