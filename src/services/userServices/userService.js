import { api } from '../apiService';

export default class UserService {

    login(loginData) {
        return api.post('/Users/Login', loginData)
    };

    register(registerData) {
        return api.post('/Users/Register', registerData)
    };

    getUsers(page) {
        return api.get(`/Users/GetAll/${page}`)
    };

    getUser(id) {
        return api.get(`/Users/Get/${id}`)
    };

    updateUser(user) {
        return api.put(`/Users/Update`, user)
    };

    deactivateUser(id) {
        return api.put(`/Users/Deactivate/${id}`)
    };

    activateUser(id) {
        return api.put(`/Users/Activate/${id}`);
    }

    deleteUser(id) {
        return api.delete(`/Users/Delete/${id}`)
    };
}