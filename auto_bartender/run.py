from .hardware.relay import Relay
from .hardware.weight import Sensor
from .hardware.pump import Pump
from .ingredient import Ingredient
import time

weight_sensor = Sensor(5, 6)
relay = Relay(2, 15)

try:
  ingredient = Ingredient("Water")
  pump = Pump("pump1", relay, ingredient, 100)
  weight_sensor.start()
  # pump.prime(weight_sensor)
  pump.pour(20)
  time.sleep(5)
finally:
  relay.cleanup()
  weight_sensor.stop()