import ApiClient from './base';

class Recipes {
    get() {
        return ApiClient.get('/recipes')
    }

    pour(recipe) {
        return ApiClient.post('/pour', { ingredients: recipe.ingredients })
    }
}

export default new Recipes();