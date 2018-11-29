#!/usr/bin/env bash

export PYTHON_PATH="/usr/bin/python"
export SCRIPT_PATH="/opt/server/scripts"
export UPLOAD_PATH="/opt/uploads"
export DOWNLOAD_PATH="/opt/downloads"

pm2 start /opt/server/server.js -i max

exec env "$@"
