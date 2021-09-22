from flask import Flask, request
from flask import jsonify
from auto_bartender.server.app import app
from auto_bartender.server.helpers import required_properties, error
from auto_bartender.core.ingredient import Ingredient
from auto_bartender.server.services.pour import pour_session_broker, ActivePourInProgress, RecipePourSession


@app.route('/pour_session/<uuid>', methods=['GET'])
def pour_get(uuid):
  pour_session = pour_session_broker.get_session(uuid)

  if pour_session is None:
    return error({"error": "Session not found"}, 404)

  return jsonify(pour_session.to_json())


@app.route('/pour', methods=['POST'])
@required_properties("ingredients")
def pour_post():
  content = request.json
  ingredients = construct_ingredients_from_payload(content)

  try:
    session = pour_session_broker.new(RecipePourSession, ingredients)
  except ActivePourInProgress:
    return construct_active_session_error()

  if len(session.missing_ingredients) > 0:
    return construct_missing_ingredients_error(session)

  session.start()

  return jsonify({ "session_id": session.id })


# {"name": "Coke","unit": { "amount": 118, "type": "ml" } }
def construct_ingredients_from_payload(payload):
  ingredients = []
  for ingredient in payload["ingredients"]:
    ingredients.append(
      Ingredient(ingredient["name"], 
                 amount=ingredient["unit"]["amount"], 
                 unit_type=ingredient["unit"]["type"])
    )
  
  return ingredients


def construct_active_session_error():
  active_session = pour_session_broker.active_pour_session
  return error(
    { "error": f"Session '{active_session.id}' is already in progress",
      "data": {
        "session_id": active_session.id
      }
    },
    503
  )


def construct_missing_ingredients_error(pour_session):
  missing_str = ", ".join(pour_session.missing_ingredients)
  return error(
    {"error": f"No pump configured with the following ingredients: {missing_str}",
     "data": {
       "missing_ingredients": pour_session.missing_ingredients,
     }},
    422
  )