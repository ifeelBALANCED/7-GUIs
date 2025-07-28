import { appEnv } from '@/shared/lib/config'
import { createRouter, createWebHistory } from 'vue-router'
import { HomeView } from '@/views'

export const router = createRouter({
  history: createWebHistory(appEnv.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  ],
})
