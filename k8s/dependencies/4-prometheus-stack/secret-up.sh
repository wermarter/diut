#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

kubectl=/snap/bin/kubectl

# echo -n 'admin' > admin-user
# echo -n 'admin' > admin-password
$kubectl -n observability create secret generic grafana-credentials --from-file=$SCRIPT_DIR/admin-user --from-file=$SCRIPT_DIR/admin-password
