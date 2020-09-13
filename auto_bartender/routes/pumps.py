from flask import request, jsonify, Response

# Both the cleaning and "replace ingredient" flows need this 
def pumps_get():
  return jsonify([
    {
      "name": "Pump 1",
      "ingredient": "Triple Sec",
      "pump_flow_rate_ml": 100,
      "time_to_clean_sec": 60,
    }
  ])

def pumps_update():
    return jsonify({
        "name": request.json['name'],
        "ingredient": request.json["ingredient"],
        "pump_flow_rate_ml": request.json["pump_flow_rate_ml"]
        "time_to_clean_sec": request.json["time_to_clean_sec"]
    })


def pumps_run(pump_id):

    return Response(status=202)