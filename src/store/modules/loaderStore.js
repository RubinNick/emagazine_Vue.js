const state = {
    loader: false
  };
  
  const mutations = {
      showLoader(state) {
          state.loader = true;
      },
      hideLoader(state) {
          state.loader = false
      }
  };
  
  const actions = {
      showDialog({ commit }) {
          commit("showLoader");
      },
      hideDialog({ commit }) {
          commit("hideLoader");
      }
  };
  
  export default {
    namespaced: false,
    state,
    actions,
    mutations
  };
  