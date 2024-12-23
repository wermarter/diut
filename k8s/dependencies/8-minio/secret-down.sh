#!/bin/bash

kubectl=/snap/bin/kubectl

$kubectl -n infra delete secret minio-credentials
