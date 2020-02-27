FROM raspbian/stretch

WORKDIR /workspace

RUN apt-get update

COPY ./auto_bartender /workspace/auto_bartender
COPY ./hx711py /workspace/hx711py
COPY ./docker /workspace/docker

RUN ./docker/API/bootstrap

ENTRYPOINT [ "python3", "-m", "auto_bartender.run" ]