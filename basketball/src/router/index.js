import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/login.vue'
import menu from '@/views/menu.vue'
import team from '@/views/team.vue'
import roll from '@/views/roll.vue'

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
    {
      path: '/team',
      name: 'team',
      component: team
    },
    {
      path: '/roll',
      name: 'roll',
      component: roll
    },
  ],
})

export default router
