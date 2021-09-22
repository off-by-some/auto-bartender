from auto_bartender.hardware import controller
from auto_bartender.data.ingredients import find_ingredient
from auto_bartender.server.app import app
from auto_bartender.server.helpers import required_properties, error

from flask import jsonify, request, make_response

@app.route('/pumps', methods=['GET', 'PUT'])
def handle_pumps():
    if request.method == 'PUT':
        return pumps_put()
    elif request.method == 'GET':
        return pumps_get()


###############
# GET /pumps #
# Returns the pumps and their configured ingredients
def pumps_get():
    return jsonify([ x.jsonify() for x in controller.pumps ])

###############
# PUT /pumps #
# Updates the pump's configured ingredient
@required_properties("name", "ingredient")
def pumps_put():
    content = request.json
    pump_name = content["name"]
    new_ingredient = find_ingredient(lambda x: x.name == content["ingredient"])
    pump = controller.find_pump_by_name(pump_name)

    if pump is None:
        return error({"error": "Pump was not found"}, 404)

    if new_ingredient is None:
        return error({"error": "Ingredient was not found"}, 404)

    pump.ingredient = new_ingredient

    return jsonify(pump.jsonify()), 201




