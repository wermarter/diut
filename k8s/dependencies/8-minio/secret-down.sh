#!/bin/bash

kubectl=/snap/bin/kubectl

$kubectl -n diut delete secret minio-credentials
