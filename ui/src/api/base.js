import axios from 'axios'

class ApiClient {
    constructor() {
        this.baseURL = "http://localhost:3001";
        this.client = axios.create({
            baseURL: this.baseURL
        });;
    }

    async get(slug) {
        const response = await this.client.get(slug)
        return response.data;
    }

    async post(slug, data) {
        const response = await this.client.post(slug, data);
        return response.data;
    }

    async put(slug, data) {
        const response = await this.client.put(slug, data);
        return response.data;
    }
}

export default new ApiClient();