from flask import jsonify


# The main listing page needs to be able to get a list of ingredients 
def drinks_get():
    return jsonify([
      {
        "name": "Long Island Iced Tea",
        "image": "https://placekitten.com/200/300",
        "ingredients": [
          {
            "name": "Rum",
            "quantity": 1,
            "unit": "oz"
          },
          {
            "name": "Triple Sec",
            "quantity": 0.5,
            "unit": "oz"
          },
          {
            "name": "Tequila",
            "quantity": 1,
            "unit": "oz"
          },
          {
            "name": "Vodka",
            "quantity": 1,
            "unit": "oz"
          },
          {
            "name": "Lemon Juice",
            "quantity": 1,
            "unit": "oz"
          },
          {
            "name": "Gin",
            "quantity": 1,
            "unit": "oz"
          },
        ]
      }
    ])

