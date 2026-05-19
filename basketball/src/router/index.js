import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/login.vue'
import menu from '@/views/menu.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/menu',
      name: 'menu',
      component: menu
    },
  ],
})

export default router
