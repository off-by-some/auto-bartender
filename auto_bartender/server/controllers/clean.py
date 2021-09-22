from auto_bartender.hardware import controller
from auto_bartender.server.app import app
from auto_bartender.server.helpers import required_properties, error
from auto_bartender.server.services.pour import pour_session_broker, ActivePourInProgress, CleanPourSession

from flask import request, jsonify
from .pour import construct_active_session_error


#####################
# POST /pumps/clean #
#####################
# Runs the cleaning cycle on the pumps provided via `pump_ids`. Creates a pour session
@app.route('/clean', methods=['POST'])
@required_properties("pump_ids")
def handle_clean():
    content = request.json
    pump_names = set(content["pump_ids"])
    found_pumps = list(controller.find_pumps(lambda x: x.name in pump_names))
    found_pump_names = set(x.name for x in found_pumps)
    missing_pumps = list(pump_names - found_pump_names)

    if (len(missing_pumps) > 0):
        return error({
            "error": "Could not find requested pumps to clean",
            "data": {
                "missing_pumps": missing_pumps
            }
        }, 422)

    if len(found_pumps) == 0:
        return error({
            "error": "Could not find requested pumps to clean",
            "data": {
                "missing_pumps": pump_names
            }
        }, 404)

    try:
        clean_session = pour_session_broker.new(CleanPourSession, found_pumps)
    except ActivePourInProgress:
        return construct_active_session_error()

    clean_session.start()
    
    return jsonify({
        "session_id": clean_session.id
    })