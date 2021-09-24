import ApiClient from './base';

class PourSession {
    get(id) {
        return ApiClient.get(`/pour_session/${id}`);
    }
}

export default new PourSession();