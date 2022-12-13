#!/bin/bash

docker image rm github-viewer-app -f
docker-compose up -d
npm run test:e2e:run
