from flask import Flask, request, jsonify

from auto_bartender.hardware import controller
from auto_bartender.server.app import app
from auto_bartender.server.helpers import required_properties, error 


# Generates recipes for a single shot of each available configured ingredient
def generateShotRecipesFromIngredients():
  for pump in controller.pumps:
    if not pump.ingredient:
      continue

    yield {
      "name": f"{pump.ingredient.name} (Shot)",
      "ingredients": [
        {"name": pump.ingredient.name, "unit": { "amount": 44, "type": "ml" }}
      ]
    }



###############
# GET /recipes #
# Available drinks that can be made with current ingredients
@app.route('/recipes/', methods=['GET', 'POST'])
def recipes():
    return jsonify(
      [
        *generateShotRecipesFromIngredients(),
        {
          "name": "Long Island Iced Tea",
          "ingredients": [
            {"name": "Vodka", "unit": { "amount": 44, "type": "ml" } },
            {"name": "White Rum",      "unit": { "amount": 44, "type": "ml" } },
            {"name": "Tequila",        "unit": { "amount": 44, "type": "ml" } },
            {"name": "Triple-Sec",     "unit": { "amount": 44, "type": "ml" } },
            {"name": "Sweet and Sour", "unit": { "amount": 22, "type": "ml" } },
            {"name": "Coke",           "unit": { "amount": 118, "type": "ml" } }
          ],
        },
        {
          "name": "Bourbon (Shot)",
          "ingredients": [
            { "name": "Bourbon",  "unit": { "amount": 88, "type": "ml" } }
          ]
        },
        {
          "name": "Vodka (Shot)",
          "ingredients": [
            { "name": "Vodka",  "unit": { "amount": 88, "type": "ml" } }
          ]
        },
      ]
    )
