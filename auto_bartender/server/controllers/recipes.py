from flask import Flask, request, jsonify

from auto_bartender.hardware import controller
from auto_bartender.server.app import app
from auto_bartender.server.helpers import required_properties, error 
from auto_bartender.server.services.recipe import recipe_service


@app.route('/api/recipes', methods=['GET', 'POST', 'DELETE'])
def handle_recipes():
    if request.method == 'POST':
        return recipes_post()
    elif request.method == 'GET':
        return recipes_get()
    elif request.method == 'DELETE':
        return recipes_delete()


###############
# GET /recipes #
# Available drinks that can be made with current ingredients
def recipes_get():
    recipes = recipe_service.get_recipes()
    return jsonify([ x.to_json() for x in recipes ])

###############
# GET /recipes/all #
# Returns all recipes
@app.route('/api/recipes/all', methods=['GET'])
def recipes_all():
    recipes = recipe_service.get_all_recipes()
    return jsonify([ x.to_json() for x in recipes ])

###############
# DELETE /recipes #
# Deletes a recipe
@required_properties("name")
def recipes_delete():
    content = request.json
    recipes = recipe_service.get_all_recipes()

    found_recipe = next((x for x in recipes if x.name == content["name"]), None)

    if (found_recipe is None):
        return error({ 
            "message": "Requested recipe could not be found", 
            "data": [content["name"]]
        }, 404)

    recipe_service.delete_recipe(found_recipe)

    return jsonify({}), 200

#################
# POST /recipes #
#################
# TODO: Create a recipe
def recipes_post():
    recipes = recipe_service.get_recipes()
    return jsonify([ x.to_json() for x in recipes ])