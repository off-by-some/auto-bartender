import os

class MockGPIO:
  BCM = None
  OUT = None

  def setmode(mode):
    return None

  def setup(pin_number: int, type):
    return None

  def output(pin_number: int, value: bool):
    return None

  def cleanup():
    return None

  def input():
    return 0


GPIO = None
should_mock = os.environ.get("MOCK_GPIO", True)

if should_mock:
  GPIO = MockGPIO
else:
  import RPi
  GPIO = RPi.GPIO


