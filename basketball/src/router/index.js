import { createRouter, createWebHistory } from 'vue-router'
import base from '@/views/base.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'base',
      component: base
    }
  ],
})

export default router
