from .unit import Unit

import os
import sys
import json


class Ingredient:
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


















# TODO: Actual form of storage that can handle async. Rest of the file needs to be abstracted and replaced
ingredients_config_path = os.path.join(
    os.path.dirname(__file__), 
    "ingredients.json"
)

_ingredients = []

with open(ingredients_config_path, "r") as f:
    _ingredients = json.loads(f.read())



def get_ingredients():
    for i in _ingredients:
        yield Ingredient(i["name"])

def find_ingredient(f):
  for i in _ingredients:
    ingredient = Ingredient(i["name"])

    if f(ingredient):
      return ingredient


def _save_ingredients():
  with open(ingredients_config_path, "w") as f:
    ingredients = json.dumps(_ingredients, indent=4, sort_keys=True)
    f.write(ingredients) 


def add_ingredient(ingredient):
  existing_ingredients = [x for x in get_ingredients() if x.name == ingredient.name]

  if len(existing_ingredients) < 0:
    return

  _ingredients.append({"name": ingredient.name })
  _save_ingredients()
