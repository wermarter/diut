#!/bin/bash

kubectl=/snap/bin/kubectl

$kubectl -n longhorn-system delete secret longhorn-backup-secret
