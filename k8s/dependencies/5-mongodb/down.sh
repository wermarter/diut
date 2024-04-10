#!/bin/bash

helm uninstall -n diut mongodb
kubectl -n diut delete secret mongodb-credentials