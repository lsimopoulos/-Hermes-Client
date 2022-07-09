import { createStore } from "vuex";
import { auth } from './modules/auth';
import { user } from './modules/user';
import { chat } from './modules/chat';

const store = createStore({
  modules: {
    auth,
    user,
    chat
  },
});

export default store;