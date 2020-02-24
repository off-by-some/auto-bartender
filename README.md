# auto-bartender

A bartending bot powered by the Raspberry Pi

## Running on the Raspberry Pi

Install dependencies by running the install script
```bash
$ ./install
```

Run the program with:
```bash
$ ./run
```


## Setting up on MacOS with Docker

You'll need to install and set up a few dependencies:

1) Install [XQuartz](https://www.xquartz.org/)
2) Install socat with brew:
```bash
$ brew install socat
```
3) Open XQuartz preferences and allow connections from network clients
![xquaerz preferences example](./xquartz_preferences.png)
3) Log out and in again


## Running the application on MacOS
1) In another terminal run the following:
```bash
$ socat TCP-LISTEN:6000,reuseaddr,fork UNIX-CLIENT:\"$DISPLAY\"
```
2) With the socat process running, start the docker container
```bash
$ ./docker/run
```
