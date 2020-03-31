import OrderService from '../../services/orderServices/orderService';

const orderService = new OrderService();

const state = {
  orders: []
};

const getters = {
};

const mutations = {
    set_active_orders(state, orders) {
      state.orders = orders;
    },
    set_order_data(state, order) {
      debugger;
      const index = state.orders.findIndex(item => item.id === order.id);
      state.orders[index].orderedItems = order.orderedItems;
    },
    remove_canceled_order(state, id) {
      const index = state.orders.findIndex(item => item.id === id);
      state.orders.splice(index, 1);
    }
};

const actions = {
    addOrder({ commit }, order) {
        orderService.addOrderFromCart(order);
    },
    getOrders({commit}) {
      orderService.getActiveOrders()
      .then(response => {
        commit('set_active_orders', response.data);
      })
    },
    getOrderFullData({ commit }, id) {
      orderService.getOrder(id)
      .then(response => {
        commit('set_order_data', response.data);
      })
    },
    cancelOrder({ commit }, id) {
      orderService.cancelOrder(id)
      .then(response => {
        commit('remove_canceled_order', response.data)
      })
    }
    
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
