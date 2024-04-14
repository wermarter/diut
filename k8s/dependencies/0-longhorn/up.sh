#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PARENT_DIR=$( dirname $SCRIPT_DIR )

# echo -n 'AWS_ACCESS_KEY_ID' > AWS_ACCESS_KEY_ID
# echo -n 'AWS_SECRET_ACCESS_KEY' > AWS_SECRET_ACCESS_KEY

kubectl=/snap/bin/kubectl

$kubectl create ns longhorn-system
$kubectl -n longhorn-system create secret generic longhorn-backup-secret --from-file=$SCRIPT_DIR/AWS_ACCESS_KEY_ID --from-file=$SCRIPT_DIR/AWS_SECRET_ACCESS_KEY
helm upgrade --install -n longhorn-system longhorn $SCRIPT_DIR --render-subchart-notes