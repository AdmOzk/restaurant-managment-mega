import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WaiterScreen from '../components/WaiterScreen/WaiterScreen.vue';
import SeatPlan from '../components/SeatPlan/SeatPlan.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: WaiterScreen
  },
  { 
    path: '/SeatPlan', 
    component: SeatPlan 
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
