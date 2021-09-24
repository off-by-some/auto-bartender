from flask import request, make_response, jsonify

def error(message, status_code): 
    return make_response(jsonify(message), status_code)

def required_properties(*args):
    def decorator(func):
        def wrapper():
            content = request.json
            if content is None:
                return error({"error": "a request body is required"}, 400)

            for property_name in args:
                value = content.get(property_name, None)

                if value is None:
                    return error({"error": "%s must be provided" % property_name }, 400)

            return func()

        wrapper.__name__ = func.__name__
        return wrapper
    return decorator

def jsonify_pump(pump):
    ret = {
        "name": pump.name,
        "ml_per_min": pump.ml_per_min,
        "ingredient": None
    }

    if (pump.ingredient):
        ret["ingredient"] = { "name": pump.ingredient.name }
    
    return ret