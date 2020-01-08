#!/bin/bash

docker-compose -f docker-compose.yml up -d
./frontend/node-modules/.bin/ng serve
