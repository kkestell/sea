#!/usr/bin/env bash

docker build --tag=sea .
docker run \
    -it \
    --rm \
    --mount type=bind,source="$(pwd)",target=/sea \
    sea \
    bash -c "echo \"export PS1='🐳 \[\033[1;34m\]\w\[\033[0;35m\] \[\033[1;36m\]# \[\033[0m\]'\" >> ~/.bashrc && bash"
 