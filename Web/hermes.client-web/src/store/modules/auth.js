import AuthService from '../../services/auth.service';

 export const auth = {
   namespaced: true,
  state:  {
    status: { loggedIn: false }
  },
  actions: {
    attemptLogin({ commit }, {email,password}) {
      return AuthService.login({email,password})
      .then(
        response => {
          commit('loginSuccess', response);

          return Promise.resolve(response);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      commit('logout');
    },
    attemptRegister({ commit }, {email,password}) {
      return AuthService.register(email,password).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
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
  getters : {
    access_token: state => state.token.access_token,
    refresh_token : state => state.token.refresh_token
  }

};
