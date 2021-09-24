from . import _recipes, _save_recipes
from auto_bartender.core.recipe import Recipe

def get_recipes():
    for i in _recipes:
        yield Recipe.from_json(i)

def find_recipe(f):
  for recipe in get_recipes():
    if f(recipe):
      return recipe

def add_recipe(recipe):
  clean = lambda name: name.lower().strip()
  existing_recipes = [x for x in get_recipes() if clean(x.name) == clean(recipe.name)]

  if len(existing_recipes) != 0:
    return

  _recipes.append(recipe.to_json())
  _save_recipes()
