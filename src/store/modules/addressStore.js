import AddressService from '../../services/addressServices/addressService';

const addressService = new AddressService();

const state = {
  addresses: []
};

const getters = {};

const mutations = {
    get_addresses(state, addresses) {
        state.addresses = addresses;
    }
};

const actions = {
    getAddresses({ commit }) {
        addressService.getAddresses()
        .then(response => {
            commit('get_addresses', response.data);
        },
        errorResponse => {
          const message = errorResponse.response.data;
          alert(message);
        }
        )
    },
    addAddress({ commit }, address) {
        addressService.addAddress(address)
        .then(response => {
        },
        errorResponse => {
          const message = errorResponse.response.data;
          alert(message);
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
