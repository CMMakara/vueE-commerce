import { computed, ref } from "vue"
import { defineStore } from 'pinia'
import api from "@/api/http"

export const UseAuthStore = defineStore('auth',()=>{
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  const isLogin = computed(() => !!token.value)

   async function login(email , password) {
      try{
         const res = await api.post('/api/login' , {
            email,
            password
         })
         user.value = res.data.data.user;
         token.value = res.data.data.token
         localStorage.setItem('token' , token.value);
      }
      catch(error){
         throw error.response
      }
   }



  //return 
  return{user , token , isLogin , login}
})