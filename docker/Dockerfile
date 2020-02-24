FROM raspbian/stretch

WORKDIR /workspace

RUN apt-get update

RUN apt-get install -y python3 python3-dev python3-setuptools python3-pip python3-numpy

COPY . /workspace

RUN ./install

ENTRYPOINT [ "./run" ]