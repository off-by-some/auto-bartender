import ApiClient from './base';

class Ingredients {
    get() {
        return ApiClient.get('/ingredients')
    }

    create(ingredientName) {
        return ApiClient.post('/ingredients', { name: ingredientName })
    }

    delete(ingredientName) {
        return ApiClient.delete('/ingredients', { data: { name: ingredientName }})
    }
}

export default new Ingredients();