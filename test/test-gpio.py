#!/usr/bin/env python

import RPi.GPIO as GPIO

from time import sleep

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

# OutputPins = [14, 15, 18, 23, 24, 25, 8, 7]
OutputPins = [7, 8, 25, 24, 23, 18, 15, 14]


for i in OutputPins:
    GPIO.setup(i, GPIO.OUT)
    GPIO.output(i, False)

try:
    while (True):
        for i in OutputPins:
            print("Firing pin #%s" % i)
            GPIO.output(i, True)
            sleep(5)
            print("Disabling pin #%s" % i)
            GPIO.output(i, False)
            sleep(5)

except KeyboardInterrupt:
    print("Cleaning up")
    for i in OutputPins:
        GPIO.output(i, False)