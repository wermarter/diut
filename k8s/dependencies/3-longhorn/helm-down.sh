#!/bin/bash

kubectl=/snap/bin/kubectl

$kubectl -n longhorn-system patch -p '{"value": "true"}' --type=merge lhs deleting-confirmation-flag
helm uninstall -n longhorn-system longhorn