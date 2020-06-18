#!/bin/bash
echo '{"auth": "'$FEWEB_AUTH'", "port": "'$FEWEB_PORT'"}' > /feweb/www/env.json
service ssh start
nginx -g "daemon off;"
