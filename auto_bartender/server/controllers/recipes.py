from flask import Flask, request, jsonify

from auto_bartender.hardware import controller
from auto_bartender.server.app import app
from auto_bartender.server.helpers import required_properties, error 
from auto_bartender.server.services.recipe import recipe_service


@app.route('/recipes', methods=['GET', 'POST'])
def handle_recipes():
    if request.method == 'POST':
        return recipes_post()
    elif request.method == 'GET':
        return recipes_get()


###############
# GET /recipes #
# Available drinks that can be made with current ingredients
def recipes_get():
    recipes = recipe_service.get_recipes()
    return jsonify([ x.to_json() for x in recipes ])


#################
# POST /recipes #
#################
# TODO: Create a recipe
def recipes_post():
    recipes = recipe_service.get_recipes()
    return jsonify([ x.to_json() for x in recipes ])