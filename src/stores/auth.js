import { computed, ref } from "vue"
import { defineStore } from 'pinia'

export const UseAuthStore = defineStore('auth',()=>{
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  const isLogin = computed(() => !!token.value)


  //return 
  return{user , token , isLogin}
})