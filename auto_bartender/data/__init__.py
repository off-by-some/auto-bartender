import os
import sys
import json

# TODO: Actual form of storage that can handle async
_ingredients = []
ingredients_config_path = os.path.join(
    os.path.dirname(__file__), 
    "ingredients.json"
)

_recipes = []
recipes_config_path = os.path.join(
    os.path.dirname(__file__), 
    "recipes.json"
)


with open(ingredients_config_path, "r") as f:
    _ingredients = json.loads(f.read())

with open(recipes_config_path, "r") as f:
    _recipes = json.loads(f.read())


def _save_ingredients():
  with open(ingredients_config_path, "w") as f:
    ingredients = json.dumps(_ingredients, indent=4, sort_keys=True)
    f.write(ingredients) 

def _save_recipes():
  with open(recipes_config_path, "w") as f:
    recipes = json.dumps(_recipes, indent=4, sort_keys=True)
    f.write(recipes) 