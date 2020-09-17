import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/record',
    name: 'Record',
    component: () => import('../views/RecordPunches.vue')
  },
  {
    path: '/daily',
    name: 'Daily',
    component: () => import('../views/DailyPunches.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
