import { api } from '../apiService';

export default class OrderService {

    addOrderFromCart(order) {
        return api.post(`/Orders/Add`, order)
    };

    createOrder(order) {
        return api.post(`/Orders/Create`, order)
    };

    getOrders() {
        return api.get(`/Orders/GetAll`)
    };

    getActiveOrders() {
        return api.get(`/Orders/GetAllActive`)
    };

    getOrder(id) {
        return api.get(`/Orders/Get/${id}`)
    };

    cancelOrder(id) {
        return api.get(`/Orders/Cancel/${id}`);
    };

    payForOrder(id) {
        return api.get(id);
    };
}