import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'loggedin', { headers: authHeader() });
    }

    getOpsBoard() {
        return axios.get(API_URL + 'ops', { headers: authHeader() });
    }

    getDevOpsBoard() {
        return axios.get(API_URL + 'devops', { headers: authHeader() });
    }

    getInfBoard() {
        return axios.get(API_URL + 'inf', { headers: authHeader() });
    }

    getAllVms() {
        return axios.get(API_URL + 'vms', { headers: authHeader() });
    }
}

export default new UserService();