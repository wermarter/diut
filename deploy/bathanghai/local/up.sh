#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PARENT_DIR=$( dirname $SCRIPT_DIR )

docker compose -f $PARENT_DIR/docker-compose.base.yml -f $SCRIPT_DIR/docker-compose.yml up --build -d