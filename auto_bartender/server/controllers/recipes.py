from flask import Flask, request, jsonify

from auto_bartender.hardware import controller
from auto_bartender.core.recipe import Recipe
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
# Creates a recipe
@required_properties("name", "ingredients")
def recipes_post():
    content = request.json
    existing_recipe = recipe_service.find_recipe(content['name'])

    if existing_recipe is not None:
        return error({
            'message': "This recipe name already exists", 
            'data': [ content['name'] ]
        }, 409)

    recipe_service.create_recipe(content)

    return jsonify({}), 201



def ingredients_delete():
    content = request.json
    ingredient = find_ingredient(lambda i: i.name == content['name'])

    if ingredient is None:
        return error({
            'message': "The requested ingredient could not be found", 
            'data': [ content['name'] ]
        }, 404)

    remove_ingredient(ingredient)

    return jsonify({}), 200