#!/usr/bin/env bash

serve -s web-local/build &
node web-local/dist/server/server.js
#bash