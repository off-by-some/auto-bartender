import time
from .relay import Relay
from auto_bartender.ingredient import Ingredient
from .weight import Sensor


class Pump:


  def __init__(self, name, relay: Relay, ingredient: Ingredient, ml_per_min=100, ):
    self.name = name
    self.ml_per_min = ml_per_min
    self.relay = relay
    self.ingredient = ingredient

  def run(self):
    self.relay.enable()

  def stop(self):
    self.relay.disable()

  def time_needed_to_run(self, desired_ml: int):
    ml_per_sec = self.ml_per_min / 60

    return float(desired_ml) / float(ml_per_sec)

  def prime(self, weight_sensor: Sensor):
    if not weight_sensor.is_running:
      raise Exception(
        "Error attempting to prime pump `%s`, Weight sensor was not started with `sensor.start()`" %
        pump.name
      )

    self.pour(self.ingredient.PRIME_VOLUME)
    time.sleep(1)
    self.ingredient.weight = weight_sensor.value

  def pour(self, desired_ml: int):
    pour_time = self.time_needed_to_run(desired_ml)
    print("Pouring ingredient \"%s\" (%i ml for %i seconds)" % (
      self.ingredient.display_name, desired_ml, pour_time)
    )

    self.run()
    time.sleep(pour_time)
    self.stop()