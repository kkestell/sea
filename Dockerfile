FROM docker.io/ubuntu:22.04

ARG USERNAME=kyle
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
  wget \
  locales \
  cmake \
  llvm \
  lld \
  clang \
  build-essential \
  python-is-python3 \
  curl \
  git \
  lldb \
  libicu-dev \
  liblttng-ust-dev \
  libssl-dev \
  libnuma-dev \
  libkrb5-dev \
  zlib1g-dev \
  ninja-build \
  unzip \
  && rm -rf /var/lib/apt/lists/*

RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && locale-gen

ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8

RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME

USER $USERNAME

WORKDIR /sea
