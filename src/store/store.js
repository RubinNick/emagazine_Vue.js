import Vue from "vue";
import Vuex from "vuex";

//modules import
import snackbarStore from "./modules/snackbarStore";
import loaderStore from "./modules/loaderStore";
import userStore from "./modules/userStore";
import productStore from "./modules/productStore";
import shoppingCartStore from "./modules/shoppingCartStore";
import orderStore from "./modules/orderStore";
import addressStore from "./modules/addressStore";
import intentStore from './modules/intentStore';

//plugins import
import loadingChangePlugin from './plugins/loadingChangePlugin';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userStore,
    productStore,
    snackbarStore,
    loaderStore,
    shoppingCartStore,
    orderStore,
    addressStore,
    intentStore
  },

  plugins: [loadingChangePlugin],

  state: {
    loading: false
  },
  
  mutations: {
    CHANGE_LOADING_STATE(state) {
      state.loading = !state.loading;
      loaderStore.state.loader = !loaderStore.state.loader;
    }
  }
});
