import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { chatService } from './services/chat.service'

import {
  faHome,
  faInfo,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faLock,
  faEnvelope,
  faKey
} from "@fortawesome/free-solid-svg-icons";


library.add(faHome,faInfo, faUserPlus, faSignInAlt, faSignOutAlt,faLock,faEnvelope,faKey);

const app = createApp(App)
app.provide('$chatService', chatService);
app.use(router)
.use(store)
.component("font-awesome-icon", FontAwesomeIcon)
.mount('#app')
