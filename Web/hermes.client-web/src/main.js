import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { chatService } from './services/chat.service'
import VueDOMPurifyHTML from 'vue-dompurify-html';
import './styles/app.css';

import {
  faHome,
  faInfo,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faLock,
  faPaperPlane,
  faEnvelope,
  faAddressBook,
  faPlus,
  faKey,
  faAngleDoubleDown,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons";


library.add(faHome, faInfo, faUserPlus, faSignInAlt, faSignOutAlt, faLock, faEnvelope, faKey, faAddressBook, faPlus, faPaperPlane, faAngleDoubleDown,faUserGroup);

let app = createApp(App)

app.config.errorHandler = function (err, instance, info) {
  console.log(`Error: ${err.toString()}\n Info: ${info}`);
}
app.provide('$chatService', chatService)
  .use(router)
  .use(store)
  .use(VueDOMPurifyHTML)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount('#app')
