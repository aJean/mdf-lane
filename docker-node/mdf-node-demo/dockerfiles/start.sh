#!/usr/bin/dumb-init /bin/sh
set -e

exec node server/app.js &
exec nginx -g 'daemon off;'
