FROM raspbian/stretch

WORKDIR /workspace

RUN apt-get update

###################################
# Install G++ for HX711 lib #
###################################
RUN sudo apt-get install -y \
  python3 python3-dev python3-setuptools \
  python3-pip python3-numpy python3-gpiozero git \
  g++-4.8

#######################################################
# Download and install missing kernel kernel binaries #
#######################################################
RUN sudo apt-get install -y \
    linux-image-rpi

###################
# Install systemd #
###################
RUN sudo apt-get install -y \
    systemd-sysv


RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo bash - 
RUN apt-get install -y nodejs

# COPY ./auto_bartender /workspace/auto_bartender
# COPY ./hx711py /workspace/hx711py
# COPY ./docker /workspace/docker

# RUN ./docker/API/bootstrap

COPY ./test /workspace/test

RUN cd test 



# ENTRYPOINT [ "python3", "-m", "auto_bartender.run" ]