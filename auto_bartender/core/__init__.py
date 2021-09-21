from .ingredient import Ingredient
import os
import sys
import json

controller = None 
ingredients_config_path = os.path.join(
    os.path.dirname(__file__), 
    "ingredients.json"
)

_ingredients = []

with open(ingredients_config_path, "r") as f:
    ingredients = json.loads(f.read())

def get_ingredients():
    for i in ingredients:
        yield Ingredient(i["name"])

