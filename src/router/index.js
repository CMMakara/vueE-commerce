import Navbar from '@/components/layout/navbar.vue'
import { UseAuthStore } from '@/stores/auth'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import CartView from '@/views/cart/CartView.vue'
import CheckoutView from '@/views/cart/CheckoutView.vue'
import HomeView from '@/views/HomeView.vue'
import PaymentsView from '@/views/payments/PaymentsView.vue'
import ProductView from '@/views/products/ProductView.vue'
import ProfileView from '@/views/profile/ProfileView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : '/login',
      name : 'login',
      component : LoginView
    },
    {
      path : '/register',
      name : 'register',
      component : RegisterView
    },
    {
      path : '/',
      name : 'home',
      component : HomeView,
      // meta : {requiresAuth : true}
    },
    {
      path : '/profile',
      name : 'profile',
      component : ProfileView,
      // meta : {requiresAuth : true}
    },
    {
      path : '/navbar',
      name : 'navbar',
      component : Navbar,
    },
    {
      path : '/cart',
      name : 'cart',
      component : CartView,
    },
    {
      path : '/payment',
      name : 'payment',
      component : PaymentsView,
    },
    {
      path : '/product',
      name : 'product',
      component : ProductView,
    },
    {
      path: '/checkout',
      name:'checkout',
      component: CheckoutView
    }

  ],
})

router.beforeEach((to, from)=>{
  const auth = UseAuthStore()
  if(!auth.isLogin && to.meta.requiresAuth){
    return {name : 'login'}
  }
  return true
})

export default router
