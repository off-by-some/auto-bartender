import threading
from uuid import uuid4

class Session:
  def __init__(self, broker):
    self.broker = broker
    self.id = str(uuid4())
    self.errors = []
    self.progress = 0.0

  def to_json(self):
    return {
      "id": self.id,
      "percentage_complete": int(self.progress * 100),
      "errors": self.errors,
    }

  def _pour(self):
    # Wrap the pour function in something that updates our broker when it's done
    def wrapper():
      self.broker.register(self)
      try:
        ret = self.pour()
      except Exception as e:
        self.errors.append(e.message)
        raise e
      finally:
        self.broker.deregister(self)

    task = threading.Thread(target=wrapper)
    task.start()  

  def pour(self):
    raise NotImplementedError("Pour was not defined on a base class of Session, failed to start()")

  def start(self):
    return self._pour()