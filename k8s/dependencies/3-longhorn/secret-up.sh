#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

kubectl=/snap/bin/kubectl

# echo -n 'AWS_ACCESS_KEY_ID' > AWS_ACCESS_KEY_ID
# echo -n 'AWS_SECRET_ACCESS_KEY' > AWS_SECRET_ACCESS_KEY

$kubectl -n longhorn-system create secret generic longhorn-backup-secret --from-file=$SCRIPT_DIR/AWS_ACCESS_KEY_ID --from-file=$SCRIPT_DIR/AWS_SECRET_ACCESS_KEY