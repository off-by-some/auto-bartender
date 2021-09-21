from auto_bartender.hardware import controller
from .session import Session

class RecipePourSession(Session):
  def __init__(self, broker, ingredients):
    self.ingredients = ingredients
    self.missing_ingredients = []
    self.find_missing_ingredients()
    super().__init__(broker)

  def find_missing_ingredients(self):
    self.missing_ingredients = []
    ingredient_names = set(x.name for x in self.ingredients)
    ingredients_in_pumps = set(x.ingredient.name for x in controller.pumps if x.ingredient)
    self.missing_ingredients = list(ingredient_names - ingredients_in_pumps)

  def find_pump_for_ingredient(self, ingredient):
    for pump in controller.pumps:
      if pump.ingredient is None:
        continue

      if pump.ingredient.name == ingredient.name:
        return pump

  def pour(self):
    for idx, ingredient in enumerate(self.ingredients):
      pump = self.find_pump_for_ingredient(ingredient)

      if pump is None:
        raise Exception(f"Aborting pour; Ingredient {ingredient.name} is not configured on a pump")

      print(f"Starting pump {pump.name}")
      pump.pour(ingredient.unit.toMil())
      self.progress = (idx + 1) / len(self.ingredients)


