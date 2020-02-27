from .hardware.relay import Relay
from .hardware.weight import Sensor
from .hardware.pump import Pump
from .ingredient import Ingredient
import time

import gi

gi.require_version('Gtk', '3.0')

from gi.repository import Gtk, Gdk
import sys

# class MainWindow(Gtk.Window):
#   def __init__(self):
#     Gtk.Window.__init__(self, title="Auto Bartender")

#     self.set_size_request(800, 480)

#     self.add_header("Select Drink")

#     # grid = Gtk.Grid()
#     # self.add(grid)

#     # self.button = Gtk.Button(label="foo")
#     # self.button.connect("clicked", self.button_clicked)

#     # self.button2 = Gtk.Button(label="foo 2 ")
#     # self.button2.connect("clicked", self.button_clicked)


#     # grid.add(self.button)
#     # grid.attach(self.button2, 1, 0, 2, 1)
#     # grid.attach_next_to(self.button2, self.button, Gtk.PositionType.BOTTOM, 2, 2)

#   def add_header(self, main_text, secondary_text=None):

#     header_box = Gtk.VBox(False, spacing=10)
#     main_text = Gtk.Label(main_text)
#     # valign = Gtk.Alignment(0.5, 0.25, 0, 0)

#     # secondary_text = Gtk.Label(secondary_text)

#     self.add(header_box)
#     header_box.add(main_text)



#   def button_clicked(self, data):
#     print("Button clicked!", data)



# window = MainWindow()
# window.connect("delete-event", Gtk.main_quit)
# window.show_all()
# Gtk.main()

weight_sensor = Sensor(5, 6)
relay = Relay(2, 15)

try:
  ingredient = Ingredient("Water")
  pump = Pump("pump1", relay, ingredient, 100)
  weight_sensor.start()
  # pump.prime(weight_sensor)
  pump.pour(20)
  time.sleep(5)
finally:
  relay.cleanup()
  weight_sensor.stop()