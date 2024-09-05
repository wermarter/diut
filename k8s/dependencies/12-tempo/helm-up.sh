#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

helm upgrade --install -n observability tempo $SCRIPT_DIR --render-subchart-notes
