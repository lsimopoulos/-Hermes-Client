import { createStore } from "vuex";
import { auth } from './modules/auth';
import { user } from './modules/user';
import { chat } from './modules/chat';
import createPersistedState from "vuex-persistedstate"

const store = createStore({
  modules: {
    auth,
    user,
    chat
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    paths: ['auth'],
})]
});

export default store;