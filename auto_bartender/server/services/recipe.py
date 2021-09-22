from auto_bartender.data.recipes import get_recipes
from auto_bartender.core.recipe import Recipe
from auto_bartender.core.ingredient import Ingredient
from auto_bartender.hardware import controller

class RecipeService:
    def get_recipes(self):
        recipes = [
            *self.generateShotRecipesFromIngredients(),
            *self.get_usable_recipes()
        ]
        return recipes

    # Generates recipes for a single shot of each available configured ingredient
    def generateShotRecipesFromIngredients(self):
        for pump in controller.pumps:
            if not pump.ingredient:
                continue

            yield Recipe(
                f"{pump.ingredient.name} (Shot)",
                [ Ingredient(pump.ingredient.name, 44, "ml") ]
            )

    # Returns the recipes we can make given the ingredients that are currently present
    # in our pumps
    def get_usable_recipes(self):
        current_pump_ingredients = [ x.ingredient for x in controller.pumps ]
        pump_ingredient_names = set(x.name for x in current_pump_ingredients if x)

        usable_recipes = []
        for recipe in get_recipes():
            ingredients = recipe.ingredients
            ingredient_names = set(x.name for x in ingredients)
            
            # check if this recipe has any ingredients our pumps do not have
            missing_ingredients = ingredient_names - pump_ingredient_names


            if (len(missing_ingredients) == 0):
                usable_recipes.append(recipe)

        return usable_recipes



recipe_service = RecipeService()