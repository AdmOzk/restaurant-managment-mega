import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WaiterScreen from '../components/WaiterScreen/WaiterScreen.vue';
import SeatPlan from '../components/SeatPlan/SeatPlan.vue'
import OrderManagment from '../components/OrderManagment/OrderManagment.vue';
import Menu from '../components/Menu/Menu.vue'

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
  { 
    path: '/Menu', 
    component: Menu 
  },
  {
    path: '/OrderManagment/:tableId', // Dinamik parametreli rota
    name: 'OrderManagment',
    component: OrderManagment,
    props: true, // Bu, route parametresini prop olarak bileşene geçirir
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
