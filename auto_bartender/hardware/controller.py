from .weight import Sensor
from .pump import Pump
from .relay import Relay

class HardwareController:
    def __init__(self, config):
        self._config = config
        self.pumps = []
        self.relays = []
        self.weight_sensor = None
        self._configure_pumps(config)
        self._configure_weight_sensor(config)

    def find_pumps(self, fn):
        return filter(fn, self.pumps)

    def find_pump_by_name(self, name):
        return next(self.find_pumps(lambda x: x.name == name))

    def _configure_weight_sensor(self, config):
        dout_pin_number = config["weight_sensor"]["dout_pin_number"]
        sck_pin_number = config["weight_sensor"]["sck_pin_number"]
        self.weight_sensor = Sensor(dout_pin_number, sck_pin_number)

    def _configure_pumps(self, config):
        for relay_idx, pump_config in enumerate(config["pumps"]):
            name = pump_config["name"]
            pin_number = pump_config["pin_number"]
            relay = Relay(relay_idx, pin_number)
            ml_per_min = pump_config["ml_per_min"]
        
            self.relays.append(relay)
            self.pumps.append(
                Pump(name, relay, None, ml_per_min)
            )


    # Mostly for debugging
    def _export_config(self):
        return {
            "weight_sensor": {
                "dout_pin_number": self.weight_sensor.dout_pin_number,
                "sck_pin_number": self.weight_sensor.sck_pin_number
            },
            "pumps": [
                {
                    "name": x.name,
                    "ml_per_min": x.ml_per_min,
                    "pin_number": x.relay.pin_number
                } for x in self.pumps
            ]
        }
    
    def __exit__(self):
        self.weight_sensor.stop()
        for relay in self.relays:
            relay.cleanup()