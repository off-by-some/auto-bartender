class ActivePourInProgress(Exception):
  """Raised when a pour is already in progress"""
  pass

# TODO: Rethink this, Technically speaking this is asking for a race condition 
# but it should suit our purposes with a single client. 
class SessionBroker:
  def __init__(self):
    self.active_pour_session = None
    self.inactive_pour_sessions = []

  @property
  def sessions(self):
    sessions_lst = [*self.inactive_pour_sessions]

    if (self.active_pour_session):
      sessions_lst.append(self.active_pour_session)
    
    return sessions_lst

  def register(self, pour_session):
    self._raise_if_active_session()
    self.active_pour_session = pour_session

  def deregister(self, pour_session):
    self.active_pour_session = None
    self.inactive_pour_sessions.append(pour_session)

  def get_session(self, id):
    for pour_session in self.sessions:
      if pour_session.id == id:
        return pour_session

  def new(self, session_kls, *args, **kwargs):
    self._raise_if_active_session()
    return session_kls(self, *args, **kwargs)

  def _raise_if_active_session(self):
    if self.active_pour_session:
        raise ActivePourInProgress("Pour is already in progress")

  def get(self):
    if self.active_pour_session:
        return self.active_pour_session
    elif len(self.inactive_pour_sessions > 0):
        return self.inactive_pour_sessions[-1]
    return None