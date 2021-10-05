import axios from 'axios'

let baseURL = "http://localhost:3001/api";
if (process.env.NODE_ENV === "production") {
    baseURL = "/api";
} 

class ApiClient {
    constructor() {
        this.baseURL = baseURL;
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

    async delete(slug, data) {
        const response = await this.client.delete(slug, data);
        return response.data;
    }
}

export default new ApiClient();