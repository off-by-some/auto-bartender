import flask
from flask import request, jsonify

from .drinks import drinks_get
from .ingredients import ingredients_get
from .pumps import pumps_get, pumps_run


app = flask.Flask(__name__)
app.config["DEBUG"] = True


def create_route(fn, *args, **kwargs):
    return app.route(*args, **kwargs)(fn)

##########
# Drinks #
##########
create_route(drinks_get, '/drinks', methods=['GET'])

###############
# Ingredients #
###############
create_route(ingredients_get, '/ingredients', methods=['GET'])

###############
# Pumps #
###############
create_route(pumps_get, '/pumps', methods=['GET'])
create_route(pumps_run, '/pumps/run', methods=['POST'])

