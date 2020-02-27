FROM raspbian/stretch

WORKDIR /workspace

COPY ./ui /workspace/ui
COPY ./docker /workspace/docker

RUN ./docker/UI/bootstrap

WORKDIR /workspace/ui

ENTRYPOINT [ "npm", "start" ]