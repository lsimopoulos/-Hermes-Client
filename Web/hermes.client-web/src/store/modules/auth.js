import AuthService from '../../services/auth.service';

export const auth = {
  namespaced: true,
  state: {
    status: { loggedIn: false, aliasname: null },
  },
  actions: {
    attemptLogin({ commit }, { email, password }) {
      return new Promise((resolve, reject) => {
        AuthService.login({ email, password })
          .then(response => {
            commit('loginSuccess', {response, email});
            resolve(response);
          }).catch((err) => {
            console.log(err);
            commit('loginFailure');
            reject(err);
          })
      });
    },

    logout({ commit }) {
      commit('logout');
    },

    attemptRegister({ commit }, { email, password, name }) {
      return new Promise((resolve, reject) => {
        AuthService.register({ email, password, name })
          .then(response => {
            commit('registerSuccess');
            resolve(response.data);
          }).catch((error) => {
            commit('registerFailure');
            reject(error);
          })
      });
    }
  },
  mutations: {
    loginSuccess(state, {response, email}) {
      state.status.loggedIn = true;
      state.response_token = response;
      state.status.aliasname = email;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.response_token = null;
      state.status.aliasname = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.response_token = null;
      state.status.aliasname = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  },
  getters: {
    access_token: state => state.response_token.access_token,
    refresh_token: state => state.response_token.refresh_token,
    user_aliasname: state => state.status.aliasname
  }
};
