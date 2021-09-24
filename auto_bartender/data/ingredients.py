from . import _ingredients, _save_ingredients
from auto_bartender.core.ingredient import Ingredient


def get_ingredients():
    for i in _ingredients:
        yield Ingredient(i["name"])

def find_ingredient(f):
  for i in _ingredients:
    ingredient = Ingredient(i["name"])

    if f(ingredient):
      return ingredient

def add_ingredient(ingredient):
  clean = lambda name: name.lower().strip()
  existing_ingredients = [x for x in get_ingredients() if clean(x.name) == clean(ingredient.name)]

  if len(existing_ingredients) != 0:
    return

  _ingredients.append(ingredient.to_json())
  _save_ingredients()
