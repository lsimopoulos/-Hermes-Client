import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/Home.vue"
import AboutView from "../views/AboutView.vue";
import SignComponent from "../components/Sign.vue";

const router = createRouter({
   history: createWebHistory(),
  routes: [ {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    component: AboutView
  },
  {
    path: '/sign',
    component: SignComponent
  }
  ],
})

export default router;