import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Sign from "../components/Sign.vue";

const router = createRouter({
   history: createWebHistory(),
  routes: [ {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/sign',
    component: Sign
  }
  ],
})

export default router;