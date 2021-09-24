import ApiClient from './base';

class Recipes {
    get() {
        return ApiClient.get('/recipes')
    }

    async pour(recipe) {
        const response = await ApiClient.post('/pour', { ingredients: recipe.ingredients })

        return response.session_id;
    }
}

export default new Recipes();