#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

$SCRIPT_DIR/docker-compose/monitoring/up.sh && $SCRIPT_DIR/docker-compose/infrastructure/up.sh
