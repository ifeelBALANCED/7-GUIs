import { appEnv } from '@/shared/lib/config'
import { createRouter, createWebHistory } from 'vue-router'
import { HomeView } from '@/views'
import { ROUTES } from '@/shared/types/routes'

export const router = createRouter({
  history: createWebHistory(appEnv.BASE_URL),
  routes: [
    {
      path: ROUTES.HOME,
      name: 'home',
      component: HomeView,
    },
    {
      path: ROUTES.COUNTER,
      name: 'counter',
      component: () => import('@/views/tasks/CounterView.vue'),
    },
    {
      path: ROUTES.TEMPERATURE_CONVERTER,
      name: 'temperature-converter',
      component: () => import('@/views/tasks/TemperatureConverterView.vue'),
    },
    {
      path: ROUTES.FLIGHT_BOOKER,
      name: 'flight-booker',
      component: () => import('@/views/tasks/FlightBookerView.vue'),
    },
    {
      path: ROUTES.TIMER,
      name: 'timer',
      component: () => import('@/views/tasks/TimerView.vue'),
    },
    {
      path: ROUTES.CRUD,
      name: 'crud',
      component: () => import('@/views/tasks/CrudView.vue'),
    },
    {
      path: ROUTES.CIRCLE_DRAWER,
      name: 'circle-drawer',
      component: () => import('@/views/tasks/CircleDrawerView.vue'),
    },
    {
      path: ROUTES.CELLS,
      name: 'cells',
      component: () => import('@/views/tasks/CellsView.vue'),
    },
  ],
})
