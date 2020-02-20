from .gpio import GPIO

GPIO.setmode(GPIO.BCM)

class Relay:
  def __init__(self, relay_number: int, pin_number: int):
    self.pin_number = pin_number
    self.relay_number = relay_number
    self.enabled = False

    # Initialize the pin on the GPIO
    GPIO.setup(self.pin_number, GPIO.OUT)
    GPIO.output(self.pin_number, False)

  def enable(self):
    if self.enabled: return
    self.enabled = True
    GPIO.output(self.pin_number, True)

  def disable(self):
    if not self.enabled: return
    self.enabled = False
    GPIO.output(self.pin_number, False)

  def cleanup(self):
    self.disable()