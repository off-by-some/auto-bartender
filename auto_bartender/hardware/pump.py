import time
from .relay import Relay
from auto_bartender.core.ingredient import Ingredient
from .weight import Sensor


class Pump:
  def __init__(self, name, relay: Relay, ingredient: Ingredient, ml_per_min=100, ):
    self.name = name
    self.ml_per_min = ml_per_min
    self.relay = relay
    self.ingredient = ingredient
    self.ml_required_to_clean = 30

  def run(self):
    self.relay.enable()

  def stop(self):
    self.relay.disable()

  def time_needed_to_run(self, desired_ml: int):
    ml_per_sec = self.ml_per_min / 60

    return float(desired_ml) / float(ml_per_sec)

  def time_needed_to_clean(self):
    return self.time_needed_to_run(self.ml_required_to_clean)

  def clean(self):
    self._pour(self.ml_required_to_clean)

  def prime(self, weight_sensor: Sensor):
    if not weight_sensor.is_running:
      raise Exception(
        "Error attempting to prime pump `%s`, Weight sensor was not started with `sensor.start()`" %
        self.name
      )

    self.pour(self.ingredient.PRIME_VOLUME)
    time.sleep(1)
    self.ingredient.weight = weight_sensor.value

  def pour(self, desired_ml: int):
    pour_time = self.time_needed_to_run(desired_ml)
    if not self.ingredient:
      raise Exception(
        "Error attempting to pour() `%s`, no ingredient has been configured" %
        self.name
      )

    print("Pouring ingredient \"%s\" (%i ml for %i seconds)" % (
      self.ingredient.name, desired_ml, pour_time)
    )

    self._pour(desired_ml)

  def jsonify(self):
    ret = {
      "name": self.name,
      "ml_per_min": self.ml_per_min,
      "seconds_needed_to_clean": self.time_needed_to_clean(),
      "ingredient": None
    }

    if (self.ingredient):
        ret["ingredient"] = self.ingredient.to_json()

    return ret

  def _pour(self, desired_ml: int):
    pour_time = self.time_needed_to_run(desired_ml)
    self.run()
    time.sleep(pour_time)
    self.stop()