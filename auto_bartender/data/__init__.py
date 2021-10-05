import os
import sys
import json

# TODO: Actual form of storage that can handle async
ingredients_config_path = os.path.join(
    os.path.dirname(__file__), 
    "ingredients.json"
)

recipes_config_path = os.path.join(
    os.path.dirname(__file__), 
    "recipes.json"
)

def _read_ingredients():
    with open(ingredients_config_path, "r") as f:
        return json.loads(f.read())

def _save_ingredients(ingredients):
  with open(ingredients_config_path, "w") as f:
    ingredients = json.dumps(ingredients, indent=4, sort_keys=True)
    f.write(ingredients) 

def _read_recipes():
    with open(recipes_config_path, "r") as f:
        return json.loads(f.read())

def _save_recipes(recipes):
  with open(recipes_config_path, "w") as f:
    recipes = json.dumps(recipes, indent=4, sort_keys=True)
    f.write(recipes) 