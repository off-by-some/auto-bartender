########################################
#           UI Build Stage             #
#======================================#
# Builds a bundle at /workspace/ui/app #
########################################
FROM raspbian/stretch as ui

# Install system dependencies for UI 
RUN sudo apt-get update && \
    sudo apt-get install -y --no-install-recommends \
    apt-transport-https lsb-release \
    ca-certificates gcc g++ make curl git

# Install NVM and NodeJS#
ENV NODE_VERSION 14.16.1
ENV NVM_VERSION 0.38.0

ENV NVM_DIR /root/.nvm 
ENV NVM_VERSIONS_PATH = $NVM_DIR/versions/v$NODE_VERSION 
ENV NODE_PATH $NVM_VERSIONS_PATH/lib/node_modules
ENV PATH      $NVM_VERSIONS_PATH/bin:$PATH

RUN mkdir ~/.nvm && \
    curl https://raw.githubusercontent.com/creationix/nvm/v$NVM_VERSION/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION && \
    npm install --global yarn

# Copy over our package.json / yarn.lock
COPY ./ui/package.json /workspace/ui/
COPY ./ui/yarn.lock /workspace/ui/

WORKDIR /workspace/ui

# Install app dependencies
RUN . $NVM_DIR/nvm.sh && yarn install 

# Copy over the rest of the UI app
COPY ./ui /workspace/ui

# Build the app
RUN . $NVM_DIR/nvm.sh && yarn build


#########################################
#      API Image (final image)          #
#=======================================#
# Builds and runs the bartending server # 
# at port :3001                         #
#########################################
FROM raspbian/stretch as api

WORKDIR /workspace

RUN apt-get update && sudo apt-get install -y --no-install-recommends \
  python3 python3-dev python3-setuptools \
  python3-pip python3-numpy \
  apt-transport-https lsb-release \
  libnss3-dev git build-essential zlib1g-dev \
  libssl-dev libffi-dev curl

ENV PYTHON_VERSION 3.8.6
ENV PYTHONUNBUFFERED=1
ENV PYENV_ROOT="/root/.pyenv"
ENV PATH="$PYENV_ROOT/shims:$PYENV_ROOT/bin:$PYENV_ROOT/versions/$PYTHON_VERSION/bin:/root/.poetry/bin:$PATH"
ENV LC_ALL C.UTF-8 
ENV LANG C.UTF-8

# Install Python
RUN git clone --depth=1 https://github.com/pyenv/pyenv.git $PYENV_ROOT && \
    pyenv install $PYTHON_VERSION && \
    pyenv global $PYTHON_VERSION

# Install Poetry 
WORKDIR /workspace/auto_bartender
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python - && \
    poetry config virtualenvs.create false

# Copy in pyproject.toml and lockfile first to ensure dependencies are only fetched when they change
COPY ./poetry.lock /workspace/poetry.lock
COPY ./pyproject.toml /workspace/pyproject.toml
COPY ./hx711py /workspace/hx711py

# Install server dependencies
RUN poetry install --no-root

# Copy app into image
COPY ./auto_bartender /workspace/auto_bartender

# Copy UI build artifact into server's static directory
COPY --from=ui /workspace/ui/app /workspace/auto_bartender/server/static/app  

WORKDIR /workspace

ENV FLASK_ENV production
ENV MOCK_GPIO true


ENTRYPOINT [ "python", "-m", "auto_bartender.run" ]