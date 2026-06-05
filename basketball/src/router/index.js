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
      component: login,
    },
    {
      path: '/menu',
      name: 'menu',
      component: menu,
      meta: { requiresAuth: true }
    },
    {
      path: '/team',
      name: 'team',
      component: team,
      meta: { requiresAuth: true }
    },
    {
      path: '/roll',
      name: 'roll',
      component: roll,
      meta: { requiresAuth: true }
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const { data: { session } } = await supabase.auth.getSession()

  if (to.meta.requiresAuth && !session) {
    next({ name: 'login' })
  } else if (to.name === 'login' && session) {
    next({ name: 'menu' })
  } else {
    next()
  }
})

export default router