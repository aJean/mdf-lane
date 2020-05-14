#!/bin/bash
echo '{"auth": "'$FEWEB_AUTH'", "port": '$FEWEB_PORT'}' > /feweb/www/env.json
nginx -g "daemon off;"