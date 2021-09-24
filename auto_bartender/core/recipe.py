from .ingredient import Ingredient

class Recipe:
  @classmethod
  def from_json(kls, payload):
    name = payload["name"]
    ingredients = [
        Ingredient.from_json(x) for x in payload["ingredients"]
    ]

    return kls(name, ingredients)

  def __init__(self, name, ingredients):
    self.name = name
    self.ingredients = ingredients

  def to_json(self):
      return {
          "name": self.name,
          "ingredients": [ x.to_json() for x in self.ingredients ]
      }

