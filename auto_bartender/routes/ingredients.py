from flask import request, jsonify

def ingredients_get():
  return jsonify([
    "Gin",
    "Lemon Juice",
    "Vodka",
    "Tequila",
  ])
