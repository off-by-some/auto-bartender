from . import _read_recipes, _save_recipes
from auto_bartender.core.recipe import Recipe

def get_recipes():
    for i in _read_recipes():
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

  recipes = list(get_recipes())
  recipes.append(recipe)
  _save_recipes([ x.to_json() for x in recipes ])

def remove_recipe(recipe):
  new_recipe = [ x for x in get_recipes() if x.name != recipe.name]
  _save_recipes([ x.to_json() for x in new_recipe ])