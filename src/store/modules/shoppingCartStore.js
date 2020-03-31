import ShoppingService from '../../services/shoppingCartServices/shoppingCartService';

const shoppingCartService = new ShoppingService();

const state = {
  shoppingCart: []
};

const getters = {};

const mutations = {
    GET_SHOPPING_CART(state, shoppingCart) {
        state.shoppingCart = shoppingCart;
    },
    remove_shopping_cart_item(state, id) {
        const index = state.shoppingCart.findIndex(cartItem => cartItem.id === id);
        state.shoppingCart.splice(index, 1);
             
    }
};

const actions = {
    getShoppingCart({ commit }) {
        shoppingCartService.getCartItems()
        .then(response => {
            commit('GET_SHOPPING_CART', response.data);
        });
    },
    removeCartItem({ commit }, id) {
        shoppingCartService.deleteCartItem(id)
        .then(response => {
            commit('remove_shopping_cart_item', id);
        });
    }
    
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
