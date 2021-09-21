from .session import Session

class CleanPourSession(Session):
  def __init__(self, broker, pumps):
    self.pumps = pumps
    super().__init__(broker)

  def pour(self):
    for idx, pump in enumerate(self.pumps):
      print(f"Cleaning {pump.name} with {pump.ml_required_to_clean} ml ({pump.time_needed_to_clean()} seconds)")
      pump.clean()
      self.progress = (idx + 1) / len(self.pumps)
