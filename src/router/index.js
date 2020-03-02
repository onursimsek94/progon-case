import Vue from 'vue'
import VueRouter from 'vue-router'
import Customers from '@/views/Customers'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Customers',
    component: Customers,
  },
  {
    path: '/orders.json/:customerId',
    name: 'Orders',
    props: true,
    component: () => import('@/views/Orders'),
  },
  {
    path: '*',
    redirect: '/',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
