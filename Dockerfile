# syntax = docker/dockerfile:1.1-experimental
FROM ubuntu:focal
EXPOSE 8080/tcp
EXPOSE 8080/udp
EXPOSE 3000/tcp
EXPOSE 3000/udp

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
COPY web-local/package.json web-local/tsconfig.json web-local/tsconfig.node.json \
    web-local/svelte.config.js web-local/vite.config.ts \
    web-local/tailwind.config.cjs web-local/postcss.config.cjs web-local/.babelrc web-local/

COPY build-tools build-tools/
COPY web-local/build-tools web-local/build-tools/
COPY web-local/src web-local/src/

RUN apt-get update && apt-get install -y curl unzip make g++

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

RUN npm install duckdb@0.4.0
RUN npm install -g serve


RUN echo "Installing npm dependencies..." && \
    npm install -d -ws

COPY web-local/static web-local/static/
RUN echo "Compiling the code..." && \
    npm run build

RUN echo "CommonJS voodoo" && \
    /app/build-tools/replace_package_type.sh module commonjs

RUN echo "CommonJS voodoo" && cd web-local && \
    /app/build-tools/replace_package_type.sh module commonjs

RUN echo '#!/bin/bash\nnode dist/cli/data-modeler-cli.js "$@"' > /usr/bin/rill && \
    chmod +x /usr/bin/rill

COPY scripts/entrypoint.sh /entrypoint.sh
ENTRYPOINT /entrypoint.sh
