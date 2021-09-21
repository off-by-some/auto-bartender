import ApiClient from './base';

class Pumps {
    get() {
        return ApiClient.get('/pumps')
    }

    updateIngredient(pumpName, ingredientName) {
        const payload = { 
            name: pumpName, 
            ingredient: ingredientName 
        }
        
        return ApiClient.put('/pumps', payload)
    }
}

export default new Pumps();