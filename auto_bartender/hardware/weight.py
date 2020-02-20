import time
import sys
from .gpio import GPIO
# import logging
import collections
from .hx711 import HX711
from threading import Thread

# logging.basicConfig(
#   format="%(asctime)s: %(message)s",
#   level=logging.INFO,
#   datefmt="%H:%M:%S"
# )

class Sensor:
  # HOW TO CALCULATE THE REFFERENCE UNIT
  # Set this reference unit to 1. Put 1kg on your sensor or anything you have and know exactly how much it weights.
  # In this case, 92 is 1 gram because, with 1 as a reference unit I got numbers near 0 without any weight
  # and I got numbers around 184000 when I added 2kg. So, according to the rule of thirds:
  # If 2000 grams is 184000 then 1000 grams is 184000 / 2000 = 92.
  REFERENCE_UNIT = 414

  # I've found out that, for some reason, the order of the bytes is not always the same between versions of python, numpy and the hx711 itself.
  # Still need to figure out why does it change.
  # If you're experiencing super random values, change these values to MSB or LSB until to get more stable values.
  # There is some code below to debug and log the order of the bits and the bytes.
  # The first parameter is the order in which the bytes are used to build the "long" value.
  # The second paramter is the order of the bits inside each byte.
  # According to the HX711 Datasheet, the second parameter is MSB so you shouldn't need to modify it.
  READING_FORMAT = ("MSB", "MSB")

  # How often we should be checking for a new value
  LOOP_TIME = 0.1

  # Takes which GPIO pins dout and pd_sck are assigned to
  def __init__(self, dout_pin_number: int, sck_pin_number: int):
    # The value of the current sensor
    self.value = 0.0
    self._powered_on = False
    self._thread = None
    # self._history
    self._scale = HX711(dout_pin_number, sck_pin_number)
    self._scale.set_reading_format(*self.READING_FORMAT)
    self._scale.set_reference_unit(self.REFERENCE_UNIT)

  @property
  def is_running(self):
    return self._powered_on

  def start(self):
    # Noop if we've already been started
    if (self._thread is not None): return None

    # Start the sensor
    self._thread = Thread(target=self._start)
    self._thread.start()

    # Wait for tare completion before returning
    while not self._powered_on:
      time.sleep(0.2)

  def stop(self):
    self._powered_on = False
    self._thread.join()
    self._thread = None
    self.value = 0


  def _initialize(self):
    print("Initializing tare...")
    self._scale.reset()
    self._scale.tare()
    print("Tare complete. You may now add weight to the scale.")
    self._powered_on = True

  def _start(self):
    self._initialize()

    while self._powered_on:
      # These three lines are usefull to debug wether to use MSB or LSB in the reading formats
      # for the first parameter of "hx.set_reading_format("LSB", "MSB")".
      # Comment the two lines "val = hx.get_weight(5)" and "print val" and uncomment these three lines to see what it prints.

      # np_arr8_string = hx.get_np_arr8_string()
      # binary_string = hx.get_binary_string()
      # print binary_string + " " + np_arr8_string

      self.value = self._scale.get_weight(5)
      print("Scale Reads: %s grams" % self.value)

      # To get weight from both channels (if you have load cells hooked up
      # to both channel A and B), do something like this
      #val_A = hx.get_weight_A(5)
      #val_B = hx.get_weight_B(5)
      #print "A: %s  B: %s" % ( val_A, val_B )

      self._scale.power_down()
      self._scale.power_up()
      time.sleep(self.LOOP_TIME)