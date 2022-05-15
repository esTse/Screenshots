#!/bin/bash
docker rm -f screenshots
docker build -t screenshots .
docker run --name=screenshots --rm -p1337:1337 -it screenshots
