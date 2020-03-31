import router from '../../router/index';

import UserService from '../../services/userServices/userService';
import TokenService from '../../services/tokenService';

const userService = new UserService();
const tokenService = new TokenService();

const state = {
  users: []
};

const getters = {};

const mutations = {
  set_login_data(state, user) {
    debugger;
    state.users = user;
  },

  set_register_data(state, response) {
    state.user = response.message;
  },

  set_users_data(state, users) {
    state.users = users;
  },

  set_user_data(state, user) {
    debugger;
    const index = state.users.users.findIndex(item => item.id === user.id);
    state.users.users[index].fullInfo = user;
  },

  set_user_updated_data(state, user) {
    debugger;
  },

  deactivate_user_result(state, user) {
    debugger;
  },

  activate_user_result(state, user) {
    debugger;
  }
};

const actions = {
  login({ commit }, loginData) {
    userService.login(loginData).then(response => {
      const user = response.data;
    
        tokenService.setUser(user);

      commit("set_login_data", user);

      router.push({ name: "HomePage" });
    });
  },

  logout({ commit }) {
    tokenService.removeUser();
  },

  register({ commit }, registerData) {
    userService.register(registerData).then(
      response => {
        commit("set_register_data", response.data);
      }
    );
  },

  getUsers({ commit }, page = 0) {
    userService.getUsers(page).then(
      response => {
        commit("set_users_data", response.data);
      }
    )
  },

  getUserData({ commit }, id) {
    userService.getUser(id).then(
      response => {
        commit("set_user_data", response.data);
      }
    )
  },

  updateUser({ commit }, user) {
    userService.updateUser(user).then(
      response => {
        commit("set_user_updated_data", response.data);
      }
    )
  },

  deactivateUser({ commit }, id) {
    userService.deactivateUser(id).then(
      response => {
        commit("deactivate_user", response.data)
      }
    )
  },

  activateUser({ commit }, id) {
    userService.activateUser(id).then(
      response => {
        commit("activate_user_result", response.data);
      }
    )
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
