from .controller import HardwareController
import os
import sys
import json

controller = None 
hardware_config_path = os.path.join(
    os.path.dirname(__file__), 
    '..', 
    "hardware.config.json"
)

with open(hardware_config_path, "r") as f:
    controller = HardwareController(json.loads(f.read()))


