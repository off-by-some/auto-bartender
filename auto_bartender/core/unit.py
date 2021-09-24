ML_IN_CUP = 236
ML_IN_SHOT = 44
PERMITTED_UNIT_TYPES = ["cup", "ml", "shot"] 

class Unit:
    def __init__(self, amount, unit_type):
        self.amount = amount
        self.type = unit_type

        if self.type not in PERMITTED_UNIT_TYPES:
            raise Exception(f"Found unit with an unknown type of {unit_type}") 

    def toMil(self):
        unit_conversion_map = {
            "cup": self.amount / ML_IN_CUP,
            "ml": self.amount,
            "shot": self.amount / ML_IN_SHOT,
        }

        return unit_conversion_map[self.type]

    def to_json(self):
        return {
            "amount": self.amount,
            "type": self.type,
        }