import AuthService from '../../services/auth.service';

export const auth = {
  namespaced: true,
  state: {
    status: { loggedIn: false },
    token : { access_token: '', refresh_token: ''}
  },
  actions: {
    attemptLogin({ commit }, { email, password }) {
      return new Promise((resolve, reject) => {
        AuthService.login({ email, password })
          .then(response => {
            commit('loginSuccess', response);
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
    attemptRegister({ commit }, { email, password }) {
      return new Promise((resolve, reject) => {
        AuthService.register({ email, password })
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
    loginSuccess(state, response_token) {
      state.status.loggedIn = true;
      state.response_token = response_token;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.response_token = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.response_token = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  },
  getters: {
    access_token: state => state.token.access_token,
    refresh_token: state => state.token.refresh_token
  }
};
