import PaymentService from "../../services/paymentServices/paymentService";

const paymentService = new PaymentService();

const state = {
  intent: {},
  isProcessing: false
};

const getters = {};

const mutations = {
  set_intent(state, intent) {
    state.addresses = intent;
  }
};

const actions = {
  newIntent({ commit, dispatch }, { amount, card, cardholderName }) {
    paymentService.intentRequest(amount).then(response => {
      const responseData = response.data;
      const secret = responseData.clientSecret;

      commit("set_intent", response);

      /// PASS SECRET HERE
      dispatch("checkout", { secret, card, cardholderName });
    });
  },

  checkout({ commit }, { secret, card, name }) {
    paymentService.processCheckout(secret, card, name).then(
      response => {
        const status = response.paymentIntent.status;
        debugger;
      },
      errorResponse => {
        debugger;
      }
    );
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
