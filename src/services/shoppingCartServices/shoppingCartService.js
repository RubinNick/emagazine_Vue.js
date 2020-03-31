import { api } from '../apiService';

export default class ShoppingCartService {

    addToCart(cartItem) {
        return api.post(`/ShoppingCart/Add`, cartItem)
    };

    getCartItems() {
        return api.get(`/ShoppingCart/GetAll`)
    };

    updateCartItem(cartItem) {
        return api.put(`/ShoppingCart/Update`, cartItem)
    };

    deleteCartItem(id) {
        return api.delete(`/ShoppingCart/Delete/${id}`)
    };
}