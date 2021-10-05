import ApiClient from './base';

class CleanSession {
    run(pumpIds = []) {
        return ApiClient.post('/clean', { pump_ids: pumpIds });
    }
}

export default new CleanSession();