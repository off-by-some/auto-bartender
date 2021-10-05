from . import _read_ingredients, _save_ingredients
from auto_bartender.core.ingredient import Ingredient

def get_ingredients():
    for i in _read_ingredients():
        yield Ingredient(i["name"])

def find_ingredient(f):
  for ingredient in get_ingredients():
    if f(ingredient):
      return ingredient

def add_ingredient(ingredient):
  clean = lambda name: name.lower().strip()
  existing_ingredients = [x for x in get_ingredients() if clean(x.name) == clean(ingredient.name)]

  if len(existing_ingredients) != 0:
    return

  ingredients = _read_ingredients()
  ingredients.append(ingredient)
  _save_ingredients([x.to_json() for x in ingredients])

def remove_ingredient(ingredient):
  new_ingredients = [ x for x in get_ingredients() if x.name != ingredient.name]
  _save_ingredients([ x.to_json() for x in new_ingredients ])