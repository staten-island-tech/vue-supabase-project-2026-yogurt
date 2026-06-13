import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/supabase.js';
import login from '@/views/login.vue'
import menu from '@/views/menu.vue'
import roll from '@/views/roll.vue'
import play from '@/views/play.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/menu',
      name: 'menu',
      component: menu,
      meta: { requiresAuth: true }
    },
    {
      path: '/roll',
      name: 'roll',
      component: roll,
      meta: { requiresAuth: true }
    },
    {
      path: '/play',
      name: 'play',
      component: play,
      meta:{ requiresAuth: true}
    }
  ],
})

router.beforeEach(async (to) => {
  const { data: { session } } = await supabase.auth.getSession()

  if (to.meta.requiresAuth && !session) {
    return { name: 'login' }
  } else if (to.name === 'login' && session) {
    return { name: 'menu' }
  }
})

export default router