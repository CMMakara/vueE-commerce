import { UseAuthStore } from '@/stores/auth'
import LoginView from '@/views/auth/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
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
      path : '/',
      name : 'home',
      component : HomeView,
      meta : {requiresAuth : true}
    },
    {
      path : '/profile',
      name : 'profile',
      component : ProfileView,
      meta : {requiresAuth : true}
    },
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
