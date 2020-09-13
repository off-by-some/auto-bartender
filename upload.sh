#!/usr/bin/env bash

CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" > /dev/null && pwd )"
rm -rf $CURRENT_DIR/ui/node_modules
rm -rf $CURRENT_DIR/test/node_modules
scp -r $CURRENT_DIR pi@192.168.132.106:/home/pi/

