# from .hardware.relay import Relay
# from .hardware.weight import Sensor
# from .hardware.pump import Pump
# from .ingredient import Ingredient
# import time

# weight_sensor = Sensor(5, 6)
# relay = Relay(2, 15)

# try:
#   ingredient = Ingredient("Water")
#   pump = Pump("pump1", relay, ingredient, 100)
#   weight_sensor.start()
#   # pump.prime(weight_sensor)
#   pump.pour(20)
#   time.sleep(5)
# finally:
#   relay.cleanup()
#   weight_sensor.stop()


from auto_bartender.server import app
from flask import Flask
import os
import sys
import json
from auto_bartender.hardware import controller


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=3001)



