

class Ingredient:
    # How much liquid to pour in ml when we prime and weigh the ingredients
  PRIME_VOLUME = 10

  def __init__(self, display_name):
    self.display_name = display_name

    # Weight in grams
    self.prime_weight = 0.0

  @property
  def weight_per_ml(self):
    if self.prime_weight == 0: return 0

    return self.prime_weight / self.PRIME_VOLUME
