from .unit import Unit


class Ingredient:
  @classmethod
  def from_json(kls, payload):
    amount, unit_type = None, None

    if (payload.get("unit", None)):
      amount = payload["unit"].get("amount", None)
      unit_type = payload["unit"].get("type", None)

    return kls(payload["name"], amount, unit_type)

  # How much liquid to pour in ml when we prime and weigh the ingredients
  PRIME_VOLUME = 10

  def __init__(self, name, amount=None, unit_type=None):
    self.name = name

    # Weight in grams
    self.prime_weight = 0.0

    # A unit will be provided when an ingredient is used in a Recipe
    if amount:
      self.unit = Unit(amount, unit_type)
    else:
      self.unit = None

  @property
  def weight_per_ml(self):
    if self.prime_weight == 0: return 0

    return self.prime_weight / self.PRIME_VOLUME

  def to_json(self):
    ret = {
      "name": self.name,
      "unit": None,
    }

    if self.unit is not None:
      ret["unit"] = self.unit.to_json()
    
    return ret
