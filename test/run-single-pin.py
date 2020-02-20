#!/usr/bin/env python

import RPi.GPIO as GPIO

from time import sleep
import os

sleep_time = int(os.environ.get("SLEEP_TIME", 10))
output_pin = int(os.environ.get("OUTPUT_PIN_NUMBER", 14))

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

try:
  GPIO.setup(output_pin, GPIO.OUT)
  GPIO.output(output_pin, False)
  sleep(1)
  print("Running pump....")
  GPIO.output(output_pin, True)
  sleep(sleep_time)
  print("Stopping pump...")
  GPIO.output(output_pin, False)
except:
  GPIO.output(output_pin, False)
