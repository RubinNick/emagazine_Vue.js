const snackAutoHide = 7000;

const state = {
  snackText: "",
  isShowed: false
};

const mutations = {
  showNotification(state, snackText) {
    state.snackText = snackText;
    state.isShowed = true;
  },
  hideNotification(state) {
    (state.snackText = ""), (state.isShowed = false);
  }
};

const actions = {
  showSnackbar({ commit, dispatch }, snackText) {
    commit("showNotification", snackText);

    setTimeout(() => {
      dispatch("hideSnackbar");
    }, snackAutoHide);
  },
  hideSnackbar({ commit }) {
    commit("hideNotification");
  }
};

export default {
  namespaced: false,
  state,
  actions,
  mutations
};
