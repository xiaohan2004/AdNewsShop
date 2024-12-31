import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/Home.vue'
import ProductsPage from '../views/Products.vue'
import CartPage from '../views/Cart.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/products',
    name: 'ProductsPage',
    component: ProductsPage
  },
  {
    path: '/products/:category',
    name: 'ProductsByCategory',
    component: ProductsPage
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

