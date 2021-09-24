import ApiClient from './base';

class Ingredients {
    get() {
        return ApiClient.get('/ingredients')
    }

    create(ingredientName) {
        return ApiClient.post('/ingredients', { name: ingredientName })
    }
}

export default new Ingredients();