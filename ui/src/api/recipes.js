import ApiClient from './base';

class Recipes {
    get() {
        return ApiClient.get('/recipes')
    }

    all() {
        return ApiClient.get('/recipes/all')
    }

    delete(recipeName) {
        return ApiClient.delete('/recipes', { data: { name: recipeName }})
    }

    create(recipeName, ingredients) {
        return ApiClient.post('/recipes', { name: recipeName, ingredients })
    }

    async pour(recipe) {
        const response = await ApiClient.post('/pour', { ingredients: recipe.ingredients })

        return response.session_id;
    }
}

export default new Recipes();