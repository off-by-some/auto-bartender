from auto_bartender.hardware import controller
from auto_bartender.core.ingredient import Ingredient
from auto_bartender.data.ingredients import get_ingredients, add_ingredient, find_ingredient, remove_ingredient
from auto_bartender.server.app import app
from auto_bartender.server.helpers import required_properties, error

from flask import Flask, request, make_response
from flask import jsonify
    
@app.route('/api/ingredients', methods=['GET', 'POST', 'DELETE'])
def handle_ingredients():
    if request.method == 'POST':
        return ingredients_post()
    elif request.method == 'GET':
        return ingredients_get()
    elif request.method == 'DELETE':
        return ingredients_delete()

####################
# GET /ingredients #
# Returns the list of ingredients we currently have saved
def ingredients_get():
    return jsonify([x.to_json() for x in get_ingredients()])

####################
# PUT /ingredients #
# Adds a new ingredient
@required_properties("name")
def ingredients_post():
    content = request.json
    new_ingredient = Ingredient(content['name'])
    add_ingredient(new_ingredient)

    return jsonify({ "name": new_ingredient.name }), 201

####################
# DELETE /ingredients #
# Adds a new ingredient
@required_properties("name")
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